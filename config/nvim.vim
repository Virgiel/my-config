set nocompatible " Disable compatibility to old-time vi
set autoread     " Automatically load changed files
set noswapfile   " Disable swapfile
set number       " Display line number
set number       " Add line number
set mouse=a      " Mouse support
set cc=80        " Set a 80 columb border for good coding style
set showcmd      " Show when leader key is pressed
set wildmenu     " Add command completion 
set clipboard+=unnamedplus " Always us the system clipboad

" ----- Better search ----- "
set hlsearch     " Highlight all search match
set incsearch    " Show incremental search progression
set ignorecase   " Ignore case in search pattern
set smartcase    " Override 'ignorecase' when case are used
set gdefault     " Search globally by default

" ----- Better identation ----- "
set copyindent   " TODO
set smarttab     " TODO
set autoindent   " TODO
set smartindent  " TODO

" ----- Common shortcut ----- "
nnoremap H ^     " Move to the start of line
nnoremap L $     " Move to the end of line 
nnoremap K H     " Move to first line of screen 
nnoremap U <C-r> " Redo

if has('win32')
  set shell=cmd.exe "Prevent weird path handling bugs
endif

if exists('g:vscode')
  " Editor Navigation
  nnoremap <silent> <C-j> :call VSCodeNotify('workbench.action.navigateDown')<CR>
  xnoremap <silent> <C-j> :call VSCodeNotify('workbench.action.navigateDown')<CR>
  nnoremap <silent> <C-k> :call VSCodeNotify('workbench.action.navigateUp')<CR> 
  xnoremap <silent> <C-k> :call VSCodeNotify('workbench.action.navigateUp')<CR> 
  nnoremap <silent> <C-h> :call VSCodeNotify('workbench.action.navigateLeft')<CR>
  xnoremap <silent> <C-h> :call VSCodeNotify('workbench.action.navigateLeft')<CR>
  nnoremap <silent> <C-l> :call VSCodeNotify('workbench.action.navigateRight')<CR>
  
  " Go to and peek
  nnoremap <silent> gd :call VSCodeNotify('editor.action.peekDefinition')<CR>
  xnoremap <silent> gd :call VSCodeNotify('editor.action.peekDefinition')<CR>
  nnoremap <silent> gD :call VSCodeNotify('editor.action.revealDefinition')<CR>
  xnoremap <silent> gD :call VSCodeNotify('editor.action.revealDefinition')<CR>
  nnoremap <silent> gt :call VSCodeNotify('editor.action.peekTypeDefinition')<CR>
  xnoremap <silent> gt :call VSCodeNotify('editor.action.peekTypeDefinition')<CR>
  nnoremap <silent> gT :call VSCodeNotify('editor.action.goToTypeDefinition')<CR>
  xnoremap <silent> gT :call VSCodeNotify('editor.action.goToTypeDefinition')<CR>
  nnoremap <silent> gi :call VSCodeNotify('editor.action.peekImplementation')<CR>
  xnoremap <silent> gi :call VSCodeNotify('editor.action.peekImplementation')<CR>
  nnoremap <silent> gI :call VSCodeNotify('editor.action.goToImplementation')<CR>
  xnoremap <silent> gI :call VSCodeNotify('editor.action.goToImplementation')<CR>
  nnoremap <silent> gr :call VSCodeNotify('editor.action.goToReferences')<CR>
  xnoremap <silent> gr :call VSCodeNotify('editor.action.goToReferences')<CR>
      
  " Connect which key extension
  nnoremap <silent> <Space> :call VSCodeNotify('whichkey.show')<CR>
  xnoremap <silent> <Space> :call VSCodeNotify('whichkey.show')<CR>
else 
  " ----- Start of plugin managment ----- "
  call plug#begin() 
  Plug 'sainnhe/gruvbox-material' " My favorite theme
  Plug 'itchyny/lightline.vim'    " Light status line
  Plug 'roman/golden-ratio'       " Automatic resizing based on the golden ratio
  Plug 'voldikss/vim-floaterm'    " Needed for lf.vim to work
  Plug 'ptzz/lf.vim'              " Use lf as a file manager
  Plug 'junegunn/goyo.vim'        " Zen mode
  Plug 'junegunn/fzf'             " Add fzf
  Plug 'junegunn/fzf.vim'         " Add default fzf commands
  Plug 'neovim/nvim-lspconfig'    " LSP support
  Plug 'hrsh7th/nvim-compe'       " Autocompletion
  call plug#end()

  " ----- Gruvbox Material Theme ----- "
  if has ('termguicolors')
    set termguicolors
  endif
  set background=dark                                                    
  let g:gruvbox_material_background = 'hard' 
  let g:airline_theme = 'gruvbox_material'                                        
  colorscheme gruvbox-material 

  " ----- Lighline Status Line ----- "
  let g:lightline = {}
  let g:lightline.colorscheme = 'gruvbox_material'
  set noshowmode

  " ----- Lf File Manager ----- "
  let g:lf_map_keys = 0      " Do not set a key shorcut
  let g:lf_replace_netrw = 1 " Open lf when vim open in a directory

  " ----- Goyo Zen Mode ----- "
  " Don't work for WTF reasons
  let g:goyo_height = '95%'
  let g:goyo_width = '120'
  
  " ----- Nvim LSP client ----- "
  
lua << EOF
  require'lspconfig'.rust_analyzer.setup{}
EOF
  nnoremap <silent> gh :lua vim.lsp.buf.hover()<CR>
  nnoremap <silent> <M-r> :lua vim.lsp.buf.rename()<CR> 
  nnoremap <silent> gD :lua vim.lsp.buf.declaration()<CR>
  nnoremap <silent> gd :lua vim.lsp.buf.definition()<CR>
  nnoremap <silent> gt :lua vim.lsp.buf.type_definition()<CR>
  nnoremap <silent> gi :lua vim.lsp.buf.implementation()<CR>
  nnoremap <silent> gr :lua vim.lsp.buf.references()<CR>

  " ----- Compe ----- "
  let g:compe = {}
  let g:compe.enabled = v:true
  let g:compe.autocomplete = v:true
  let g:compe.debug = v:false
  let g:compe.min_length = 1
  let g:compe.preselect = 'enable'
  let g:compe.throttle_time = 80
  let g:compe.source_timeout = 200
  let g:compe.incomplete_delay = 400
  let g:compe.max_abbr_width = 100
  let g:compe.max_kind_width = 100
  let g:compe.max_menu_width = 100
  let g:compe.documentation = v:true

  let g:compe.source = {}
  let g:compe.source.path = v:true
  let g:compe.source.buffer = v:true
  let g:compe.source.calc = v:true
  let g:compe.source.vsnip = v:true
  let g:compe.source.nvim_lsp = v:true
  let g:compe.source.nvim_lua = v:true
  let g:compe.source.spell = v:true
  let g:compe.source.tags = v:true
  let g:compe.source.snippets_nvim = v:true
  let g:compe.source.treesitter = v:true
  let g:compe.source.omni = v:true

  inoremap <silent><expr> <C-Space> compe#complete()
  inoremap <silent><expr> <CR>      compe#confirm('<CR>')
  inoremap <silent><expr> <C-e>     compe#close('<C-e>')
  inoremap <silent><expr> <C-f>     compe#scroll({ 'delta': +4 })
  inoremap <silent><expr> <C-d>     compe#scroll({ 'delta': -4 })
  " ----- Custom Shortcut -----"
  let mapleader = ","

  " Window and tab creation
  nnoremap <silent> <Space>t :tabedit<CR>
  nnoremap <silent> <Space>h :split<CR>
  nnoremap <silent> <Space>v :vsplit<CR>
  nnoremap <silent> <Space>x :q<CR>
  set splitright
  set splitbelow

  " Set custom shortcut for file navigation
  nnoremap <silent> <Space>e :Lf<CR>

  " Fuzzy file search
  nnoremap <silent> <Space>f :Files<CR>
  nnoremap <silent> <Space><S-e> :Files!<CR>

  " Toogle zen mode
  nnoremap <silent> <Space>z :Goyo<CR>

  " Clear and redraw the string
  nnoremap <silent> <Space>r :mod<CR>

  " Navigate throw windows whith Ctrl+[key]
  nnoremap <silent> <C-l> :wincmd l<CR>
  nnoremap <silent> <C-h> :wincmd h<CR>
  nnoremap <silent> <C-j> :wincmd j<CR>
  nnoremap <silent> <C-k> :wincmd k<CR>

  " Exit terminal mode with Esc
  tmap <Esc> <C-><C-n>
endif
