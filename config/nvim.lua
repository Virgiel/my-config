vim.opt.compatible   = false -- Disable compatibility to old-time vi
vim.opt.autoread     = true  -- Automatically load changed files
vim.opt.swapfile     = false -- Disable swap files
vim.opt.number       = true  -- Enable line number
vim.opt.mouse        = 'a'   -- Enable mouse support fal all mode
vim.opt.showcmd      = true  -- Show when leader key is pressed
vim.opt.wildmenu     = true  -- Add command completion
vim.opt.wrap         = false -- Don't write long lines
vim.opt.tabstop      = 4     -- Write tab as 4 spaces
vim.opt.shiftwidth   = 4     -- Write tab as 4 spaces
vim.opt.laststatus   = 3     -- Global status line
vim.opt.autowriteall = true  -- Write automatically
--vim.opt.shell      = "nu"

vim.api.nvim_set_option("clipboard", "unnamed")

-- Better search --
vim.opt.hlsearch   = false
vim.opt.incsearch  = true
vim.opt.ignorecase = true
vim.opt.smartcase  = true

vim.keymap.set('n', 'U', '<C-r>')

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
	-- Gruvbox Material Theme --
	vim.opt.termguicolors                     = true
	vim.opt.background                        = "dark"
	vim.g.gruvbox_material_background         = "hard"
	vim.g.gruvbox_material_ui_contrast        = "high"
	vim.g.gruvbox_material_better_performance = 1

	-- Disable netrw
	vim.g.loaded_netrw                        = 1
	vim.g.loaded_netrwPlugin                  = 1

	-- Space leader
	vim.keymap.set('n', '<Space>', '')
	vim.g.mapleader = ' '
	vim.keymap.set('n', '<Leader>F', ":NvimTreeFocus<CR>")
	vim.keymap.set('n', '<Leader>f', ":Telescope find_files<CR>")
	vim.keymap.set('n', '<Leader>s', ":Telescope lsp_document_symbols<CR>")
	vim.keymap.set('n', '<Leader>S', ":Telescope lsp_dynamic_workspace_symbols<CR>")
	vim.keymap.set('n', '<Leader>d', ":Trouble document_diagnostics<CR>")
	vim.keymap.set('n', '<Leader>D', ":Trouble workspace_diagnostics<CR>")
	vim.keymap.set('n', '<Leader>G', ":Neogit<CR>")

	-- LSP
	vim.keymap.set('n', "gh", vim.lsp.buf.hover)
	vim.keymap.set('n', "gd", ':Trouble lsp_definitions<CR>')
	vim.keymap.set('n', "gD", vim.lsp.buf.declaration)
	vim.keymap.set('n', "gt", ':Trouble lsp_type_definitions<CR>')
	vim.keymap.set('n', "gi", ':Trouble lsp_implementations<CR>')
	vim.keymap.set('n', "gr", ':Trouble lsp_references<CR>')
	vim.keymap.set('n', "<A-r>", vim.lsp.buf.rename)
	vim.keymap.set('n', "<A-Enter>", vim.lsp.buf.code_action)
	vim.keymap.set('n', "<A-f>", function() vim.lsp.buf.format({ async = false }) end)

	-- Window creation and navigation
	vim.opt.splitright = true
	vim.opt.splitbelow = true
	vim.keymap.set('n', '<Leader>h', ":split<CR>")
	vim.keymap.set('n', '<Leader>v', ":vsplit<CR>")
	vim.keymap.set('n', '<C-h>', ":wincmd h<CR>")
	vim.keymap.set('n', '<C-j>', ":wincmd j<CR>")
	vim.keymap.set('n', '<C-k>', ":wincmd k<CR>")
	vim.keymap.set('n', '<C-l>', ":wincmd l<CR>")

	-- Code Navigation
	vim.keymap.set('n', '<Leader>b', ":SymbolsOutline<CR>")

	-- Terminal
	vim.keymap.set('n', '<Leader>$', ":ToggleTerm<CR>")
	vim.keymap.set('t', '<Esc>', '<C-\\><C-n>')

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
		vim.keymap.set('n', '<Tab>', api.node.navigate.sibling.next, opts("Next sibling"))
		vim.keymap.set('n', '<S-Tab>', api.node.navigate.sibling.prev, opts("Prev sibling"))
	end

	-- Neovide
	if vim.g.neovide then
		vim.g.neovide_cursor_animation_length = 0
		vim.o.guifont = "FiraCode Nerd Font:h13"
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
		install = {
			colorscheme = { "gruvbox-material" }
		},
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
					component_separators = '',
					theme = 'gruvbox-material'
				}
			},
		},
		{
			"ggandor/leap.nvim",
			config = function()
				require('leap').add_default_mappings()
			end
		},
		{
			"sindrets/diffview.nvim",
			cmd = { "DiffviewOpen", "DiffviewClose", "DiffviewToggleFiles", "DiffviewFocusFiles" },
		},
		{
			"lewis6991/gitsigns.nvim",
			event = "BufReadPre",
			opts = {}
		},
		{
			"nvim-tree/nvim-tree.lua",
			dependencies = {
				"nvim-tree/nvim-web-devicons"
			},
			opts = {
				on_attach = tree_attach,
				sync_root_with_cwd = true,
				hijack_cursor = true,
				git = {
					ignore = false,
				},
				diagnostics = {
					enable = true,
				},
				view = {
					width = {
						padding = 0
					}
				},
				renderer = {
					group_empty = true,
					highlight_git = true,
					icons = {
						show = {
							folder_arrow = false,
						},
						git_placement = "signcolumn",
						modified_placement = "signcolumn",
						glyphs = {
							git = {
								unstaged = "M",
								staged = "M",
								unmerged = "M",
								renamed = "R",
								untracked = "U",
								deleted = "D",
								ignored = "",
							}
						}
					}
				}
			},
		},
		{
			"folke/which-key.nvim",
			event = "VeryLazy",
			init = function()
				vim.o.timeout = true
				vim.o.timeoutlen = 500
			end,
			opts = {}
		},

		{

			"williamboman/mason.nvim",
			opts = {}
		},
		{
			'williamboman/mason-lspconfig.nvim',
			dependencies = {
				"williamboman/mason.nvim",
			},
			opts = {
				automatic_installation = true
			},
		},
		{
			"neovim/nvim-lspconfig",
			dependencies = {
				'williamboman/mason-lspconfig.nvim',
			},
			config = function()
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
				lspconfig.pyright.setup {}
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
				lspconfig.ltex.setup {}
			end
		},
		{
			"jose-elias-alvarez/null-ls.nvim",
			config = function()
				local null_ls = require("null-ls")
				null_ls.setup({
					sources = {
						null_ls.builtins.formatting.black,
						null_ls.builtins.code_action.gitsigns
					}
				})
			end
		},
		{
			'jay-babu/mason-null-ls.nvim',
			event = { "BufReadPre", "BufNewFile" },
			dependencies = {
				"williamboman/mason.nvim",
			},
			opts = {
				automatic_installation = true,
				handlers = {

				}
			}
		},
		{
			"onsails/lspkind.nvim"
		},
		{
			"L3MON4D3/LuaSnip"
		},
		{
			"akinsho/toggleterm.nvim",
			opts = {

			}
		},
		{
			"tmillr/sos.nvim",
			opts = {
				timeout = 1000
			}
		},
		{
			'nvim-telescope/telescope.nvim',
			dependencies = {
				"nvim-lua/plenary.nvim",
				"nvim-treesitter/nvim-treesitter"
			}
		},
		{
			"NeogitOrg/neogit",
			dependencies = {
				"nvim-lua/plenary.nvim",
			},
			cmd = "Neogit",
			opts = {
				integrations = {
					diffview = true
				}
			}
		},
		{
			"windwp/nvim-autopairs",
			event = "InsertEnter",
			opts = {}
		},
		{
			"simrat39/symbols-outline.nvim",
			opts = {
				auto_close = true,
				auto_jump = true,
				width = 30
			}
		},
		{
			"folke/trouble.nvim",
			dependencies = { "nvim-tree/nvim-web-devicons" },
			opts = {

			}
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
end
