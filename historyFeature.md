## Multi-board + History Feature

### Overview
Adds per-board storage, a Boards (history) sidebar to switch between boards, a Create Board modal, and toolbar wiring. Each board persists its own `{ cards, connections }` state.

### Storage Schema (IndexedDB via localForage)
- **Index**: `boards_index` → Array of `{ id, name, createdAt, updatedAt }`
- **Active**: `active_board_id` → string
- **Per board**: `board:<id>` → `{ cards: [], connections: [] }`
- Legacy key migrated: `current_board`

### Utilities (`src/utils/storage.js`)
- Initialization & migration:
  - `ensureInitialized()` → migrates legacy `current_board` into a new board or creates “My First Board”.
- Active board helpers:
  - `getActiveBoardId()`, `setActiveBoardId(id)`
- CRUD:
  - `createBoard(name)` → creates empty board, adds to index, sets active
  - `listBoards()` → returns boards sorted by `updatedAt` desc
  - `renameBoard(boardId, name)` → updates name and `updatedAt`
  - `deleteBoard(boardId)` → removes board and selects next recent (or recreates default)
  - `loadBoardById(boardId)`, `saveBoardById(boardId, state)`
- Back-compat (operate on active board):
  - `loadBoardState()`, `saveBoardState(state)`, `clearBoardState()`
  - `exportBoardData()`, `importBoardData(json)`

### Components
- `src/components/history.jsx` (Boards Sidebar)
  - Props: `isOpen`, `onClose`, `boards`, `onSelect`, `onRename`, `onDelete`
  - Lists boards with actions: Open, Rename, Delete

- `src/components/createBoardForm.jsx` (Create Board Modal)
  - Props: `isOpen`, `onClose`, `onCreate(name)`
  - Simple modal with name input and Create/Cancel

- `src/components/toolbar.jsx`
  - Buttons: Boards (toggle sidebar), New Board (opens form), Import, Export, Clear, Tool selectors
  - Uses callbacks: `onToggleHistory`, `onCreateBoard`, `onImport`, `onExport`, `onClear`, `onToolChange`

### App Wiring (`src/App.jsx`)
- State: `isHistoryOpen`, `boards`, `isCreateFormOpen`, plus existing board state
- Lifecycle:
  - On mount: `ensureInitialized()` → `loadBoardState()` → `listBoards()`
  - Auto-save debounced via `saveBoardState({ cards, connections })`
- Handlers:
  - Board creation: opens `CreateBoardForm`; `handleCreateBoard(name)` → `createBoard(name)` → refresh list → load new board
  - Switch board: `handleSelectBoard(boardId)` → `setActiveBoardId` → load selected board
  - Rename: `handleRenameBoard(boardId)` → `renameBoard` → refresh list
  - Delete: `handleDeleteBoard(boardId)` → `deleteBoard` → refresh list → reload active board state
  - Import/Export: operate on active board via utilities
- UI:
  - Renders `HistorySidebar` and `CreateBoardForm`
  - `Toolbar` wired to open sidebar/form and drive import/export/clear
  - Forwards `onItemToggle` to `CanvasBoard`

### User Flows
- Create board: Toolbar → New Board → modal → Create → empty canvas, autosave enabled
- Switch board: Toolbar → Boards → select a board → loads its data
- Rename board: Toolbar → Boards → Rename → list updates
- Delete board: Toolbar → Boards → Delete → switches to most recent remaining or creates default
- Import/Export: Toolbar → Import/Export (active board only)

### Migration Notes
- If legacy `current_board` exists, it is migrated once to `boards_index` + a new `board:<id>` and set active; legacy key removed.
- If no legacy data is found, initializes a default empty board.

### Extensibility Hooks (future)
- Add thumbnails to index entries (preview image)
- Per-board export/import UI from History
- Inline rename input in `history.jsx` instead of prompt
- Board duplication API and UI action
- Workspace-level export/import (all boards)


