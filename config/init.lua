vim.opt.compatible                = false -- Disable compatibility to old-time vi
vim.opt.autoread                  = true  -- Automatically load changed files
vim.opt.swapfile                  = false -- Disable swap files
vim.opt.number                    = true  -- Enable line number
vim.opt.mouse                     = 'a'   -- Enable mouse support fal all mode
vim.opt.showcmd                   = true  -- Show when leader key is pressed
vim.opt.wildmenu                  = true  -- Add command completion
vim.opt.wrap                      = false
vim.opt.tabstop                   = 4
vim.opt.laststatus                = 3 -- Global status line

-- Better search --
vim.opt.hlsearch                  = false
vim.opt.incsearch                 = true
vim.opt.ignorecase                = true
vim.opt.smartcase                 = true

-- Gruvbox Material Theme --
vim.opt.termguicolors             = true
vim.opt.background                = "dark"
vim.g.gruvbox_material_background = "hard"

-- DIsable netrw
vim.g.loaded_netrw                = 1
vim.g.loaded_netrwPlugin          = 1

if vim.g.vscode then
	local function map(lhs, cmd)
		local options = { noremap = true, silent = true }
		vim.keymap.set('n', lhs, ':call VSCodeNotify(\'' .. cmd .. '\')<CR>', options)
	end


	-- Editor Navigation
	map('<C-h>', 'workbench.action.navigateLeft')
	map('<C-j>', 'workbench.action.navigateDown')
	map('<C-k>', 'workbench.action.navigateUp')
	map('<C-l>', 'workbench.action.navigateRight')

	-- Editor Group Movement
	map('<C-A-h>', 'workbench.action.moveActiveEditorGroupLeft')
	map('<C-A-j>', 'workbench.action.moveActiveEditorGroupDown')
	map('<C-A-k>', 'workbench.action.moveActiveEditorGroupUp')
	map('<C-A-l>', 'workbench.action.moveActiveEditorGroupRight')

	-- Go to and peek
	map('gd', 'editor.action.peekDefinition')
	map('gD', 'editor.action.revealDefinition')
	map('gt', 'editor.action.peekTypeDefinition')
	map('gT', 'editor.action.goToTypeDefinition')
	map('gi', 'editor.action.peekImplementation')
	map('gI', 'editor.action.goToImplementation')
	map('gr', 'editor.action.goToReferences')
	map('gR', 'editor.action.goToReferences')
	map('gc', 'editor.action.dirtydiff.next')

	-- Connect wich key extension
	map('<Space>', 'whichkey.show')
else
	-- Space leader
	vim.keymap.set('n', '<Space>', '')
	vim.g.mapleader = ' '
	vim.keymap.set('n', '<Leader>F', ":NvimTreeFocus<CR>")

	-- LSP
	vim.keymap.set('n', "gh", ':lua vim.lsp.buf.hover()<CR>')

	-- Window creation and navigation
	vim.opt.splitright = true
	vim.opt.splitbelow = true
	vim.keymap.set('n', '<Leader>h', ":split<CR>")
	vim.keymap.set('n', '<Leader>v', ":vsplit<CR>")
	vim.keymap.set('n', '<C-h>', ":wincmd h<CR>")
	vim.keymap.set('n', '<C-j>', ":wincmd j<CR>")
	vim.keymap.set('n', '<C-k>', ":wincmd k<CR>")
	vim.keymap.set('n', '<C-l>', ":wincmd l<CR>")

	-- File tree
	local function tree_attach(bufnr)
		local api = require "nvim-tree.api"
		local function opts(desc)
			return {
				desc = 'nvim-tree: ' .. desc,
				buffer = bufnr,
			}
		end

		api.config.mappings.default_on_attach(bufnr)

		vim.keymap.set('n', 'l', api.node.open.preview, opts("Open preview"))
		--vim.keymap.set('n', '<CR>', api.node.open, opts("Open"))
		vim.keymap.set('n', 'h', api.node.navigate.parent, opts("Parent"))
		vim.keymap.set('n', 'q', api.tree.close, opts("Close"))
	end

	-- Install lazy plugin manager --
	local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
	if not vim.loop.fs_stat(lazypath) then
		vim.fn.system({
			"git",
			"clone",
			"--filter=blob:none",
			"https://github.com/folke/lazy.nvim.git",
			"--branch=stable", -- latest stable release
			lazypath,
		})
	end
	vim.opt.rtp:prepend(lazypath)


	require("lazy").setup({
		{
			"sainnhe/gruvbox-material",
			lazy = false,
			priority = 1000,
			config = function()
				vim.cmd([[colorscheme gruvbox-material]])
			end
		},
		{
			"nvim-lualine/lualine.nvim",
			opts = {
				options = {
					section_separators = '',
					component_separators = ''
				}
			},
		},
		{
			"nvim-tree/nvim-tree.lua",
			dependencies = {
				"nvim-tree/nvim-web-devicons"
			},
			opts = {
				on_attach = tree_attach,
			},
		},
		{
			"folke/which-key.nvim",
			event = "VeryLazy",
			init = function()
				vim.o.timeout = true
				vim.o.timeoutlen = 300
			end,
			opts = {}
		},
		{
			"neovim/nvim-lspconfig"
		},
		{
			"onsails/lspkind.nvim"
		},
		{
			"L3MON4D3/LuaSnip"
		},
		{
			"windwp/nvim-autopairs",
			event = "InsertEnter",
			opts = {}
		},
		{
			"hrsh7th/nvim-cmp",
			event = "InsertEnter",
			dependencies = {
				"hrsh7th/cmp-nvim-lsp",
				"hrsh7th/cmp-buffer",
				"hrsh7th/cmp-path",
				"hrsh7th/cmp-cmdline",
				"saadparwaiz1/cmp_luasnip"
			},
			config = function()
				local cmp = require("cmp")
				local lspkind = require("lspkind")
				local cmp_autopairs = require('nvim-autopairs.completion.cmp')

				cmp.setup({
					snippet = {
						expand = function(args)
							require("luasnip").lsp_expand(args.body)
						end
					},
					sources = cmp.config.sources({
						{ name = "nvim_lsp" }, { name = "luasnip" } }, {
						{ name = "buffer" }
					}),
					mapping = {
						["<Tab>"] = cmp.mapping(function(fallback)
							if cmp.visible() then
								cmp.select_next_item()
							else
								fallback()
							end
						end, { "i", "s" }),
						["<S-Tab>"] = cmp.mapping(function(fallback)
							if cmp.visible() then
								cmp.select_prev_item()
							else
								fallback()
							end
						end, { "i", "s" }),
						['<CR>'] = cmp.mapping.confirm({ select = false })
					},
					formatting = {
						format = lspkind.cmp_format({
							mode = 'symbol',
							maxwidth = 50
						})
					}
				})
				cmp.event:on(
					"confirm_done", cmp_autopairs.on_confirm_done())
			end
		}
	})

	-- Setup language servers
	local lspconfig = require('lspconfig')
	lspconfig.rust_analyzer.setup {
		settings = {
			['rust-analyzer'] = {
				diagnostics = {
					enable = false,
				}
			}
		}
	}
	lspconfig.lua_ls.setup {
		settings = {
			Lua = {
				runtime = {
					version = "LuaJIT"
				},
				diagnostics = {
					globals = { 'vim' }
				},
				--workspace = {library = vim.api.nvim_get_runtime("", true)},
				telemetry = {
					enable = false
				}
			}
		}
	}

	-- Format on save
	vim.cmd [[autocmd BufWritePre * lua vim.lsp.buf.format()]]

	-- Neovide
	if vim.g.neovide then
		vim.g.neovide_cursor_animation_length = 0
	end
end
