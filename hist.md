Excellent! Adding multi-board support is a crucial evolution for GanjiBoard. Let's plan this systematically:

## 🧠 Core Concept: Workspace > Boards > Cards

```
User Account
└── Workspace (can have multiple boards)
    ├── Board 1: "Family Budget 2024"
    │   ├── Cards
    │   └── Connections
    ├── Board 2: "Wedding Planning" 
    │   ├── Cards
    │   └── Connections
    └── Board 3: "Home Renovation"
        ├── Cards
        └── Connections
```

## 📋 User Experience Flow

### 1. **Board Creation**
- **New Board Button**: Prominent "Create New Board" action
- **Template Selection**: Option to start from templates (Budget, Shopping, Wishlist, Blank)
- **Board Naming**: Required title + optional description
- **Initial Setup**: Pre-populate with example cards based on template

### 2. **Board Switching & Navigation**
- **Board Switcher**: Dropdown or sidebar to switch between boards
- **Recent Boards**: Quick access to recently opened boards
- **Search/Filter**: Find boards by name or content
- **Visual Thumbnails**: Mini preview of each board's content

### 3. **Board Management**
- **Rename/Delete**: Edit board metadata
- **Duplicate**: Create copy of existing board
- **Archive**: Hide without deleting
- **Export/Import**: Individual board data handling

## 🗄️ Data Architecture Changes

### Current (Single Board):
```javascript
// localStorage/IndexedDB key: 'ganjiboard'
{
  cards: [...],
  connections: [...]
}
```

### New (Multi-Board):
```javascript
// New structure: 'ganjiboard_workspace'
{
  user: {
    id: "user_123",
    name: "User Name",
    preferences: {...}
  },
  boards: {
    "board_abc123": {
      id: "board_abc123",
      name: "Family Budget",
      createdAt: "2024-01-15T10:30:00Z",
      lastModified: "2024-01-20T14:25:00Z",
      template: "budget",
      thumbnail: "base64_encoded_image", // or description of content
      data: {
        cards: [...],
        connections: [...]
      }
    },
    "board_def456": {
      id: "board_def456",
      name: "Grocery List",
      createdAt: "2024-01-18T09:15:00Z",
      lastModified: "2024-01-19T16:40:00Z", 
      template: "shopping",
      data: {
        cards: [...],
        connections: [...]
      }
    }
  },
  recentBoards: ["board_abc123", "board_def456"],
  settings: {
    defaultTemplate: "blank",
    autoSave: true,
    // ... other user preferences
  }
}
```

## 🎨 UI/UX Considerations

### A. **Board Selection Interface**
- **Dashboard View**: Grid of board cards with preview thumbnails
- **List View**: Simple list for many boards
- **Search & Filter**: By name, date, template type
- **Sorting Options**: Recent, alphabetical, manual ordering

### B. **Board Creation Modal**
```
[Icon] Create New Board
───────────────────────────
Board Name:   [____________]
 
Template:    [▽ Select Template]
   ○ Blank Canvas
   ○ Monthly Budget  
   ○ Shopping List
   ○ Wishlist
   ○ Project Planning

[Cancel] [Create Board]
```

### C. **Navigation Components**
- **Sidebar Board List**: Always-visible board access
- **Board Switcher Dropdown**: In header for quick changes
- **Breadcrumb Navigation**: "Workspace > Budget Planning"

## 🔧 Technical Implementation Plan

### Phase 1: Basic Multi-Board Support
1. **Data Migration**: Convert single board to multi-board structure
2. **Board Management API**: Create, read, update, delete boards
3. **UI Components**: Board switcher and creation interface
4. **Storage Upgrade**: Handle multiple board data efficiently

### Phase 2: Enhanced Board Features  
1. **Templates System**: Pre-built board structures
2. **Thumbnail Generation**: Visual previews of boards
3. **Import/Export per Board**: Individual board data handling
4. **Board Organization**: Folders, tags, or categories

### Phase 3: Advanced Management
1. **Board Search**: Full-text search across boards
2. **Collaboration per Board**: Share individual boards
3. **Version History**: Per-board change history
4. **Automated Backups**: Cloud sync and recovery

## 🗂️ Storage Strategy

### IndexedDB Structure:
```
ganjiboard_workspace (main database)
├── user_metadata (user preferences, recent boards)
├── boards (indexed by boardId)
│   ├── board_abc123 (board metadata + data)
│   ├── board_def456 (board metadata + data)
│   └── ... 
└── templates (pre-built board templates)
```

### Optimization Techniques:
- **Lazy Loading**: Only load board data when selected
- **Data Compression**: Minimize storage footprint
- **Incremental Saves**: Only save changed boards
- **Cache Management**: Smart data caching策略

## 📊 Migration Plan from Single Board

1. **Detect Old Format**: Check for existing single-board data
2. **Convert to New Format**: 
   - Create "Default Board" with existing data
   - Preserve creation/modification dates
   - Set appropriate template type based on content
3. **Backward Compatibility**: Option to revert during testing
4. **User Notification**: Explain what changed and why

## 🎯 User Benefits

### For Family Users:
- Separate boards for different purposes (vacation, monthly budget, gifts)
- Easy to compare different time periods
- Share specific boards with specific family members

### For Business Users:
- Client-specific boards
- Project-based organization
- Fiscal year separation
- Departmental budgeting boards

## ⚠️ Potential Challenges & Solutions

### Challenge: Data Bloat
**Solution**: Implement data cleanup, archiving, and compression

### Challenge: Performance with Many Boards
**Solution**: Lazy loading, efficient indexing, pagination

### Challenge: User Confusion
**Solution**: Clear navigation, onboarding, and helpful empty states

### Challenge: Migration Complexity
**Solution**: Robust data migration tools with backup options

## 🚀 Implementation Priority Order

1. **Basic Multi-Board Storage** (back-end)
2. **Board Creation UI** (front-end) 
3. **Board Switching Mechanism**
4. **Dashboard/Overview Page**
5. **Board Management** (rename, delete, duplicate)
6. **Templates System**
7. **Advanced Features** (search, organize, share)

This multi-board architecture will transform GanjiBoard from a single-canvas tool into a comprehensive visual workspace for all types of planning and budgeting needs!

###plan

### Plan: Multi-board + History (Board Switcher) Feature

- **Storage schema**
  - Add per-board storage with metadata.
  - Keys in IndexedDB (localForage instance `ganjiboard`):
    - `boards_index`: array of { id, name, createdAt, updatedAt }
    - `active_board_id`: string
    - `board:<id>`: { cards: [], connections: [] }
  - Keep `export/import` per active board; add workspace-level export/import later if needed.

- **Storage utilities (`src/utils/storage.js`)**
  - New functions:
    - `createBoard(name)`: returns { id, name }, writes empty board, updates index, sets active.
    - `loadBoardById(boardId)`: returns board state.
    - `saveBoardById(boardId, state)`: debounced save; updates `updatedAt` in index.
    - `listBoards()`: returns boards_index sorted by updatedAt desc.
    - `setActiveBoard(boardId)`, `getActiveBoard()`.
    - `renameBoard(boardId, name)`, `deleteBoard(boardId)` (soft delete optional).
  - Migration on init:
    - If `current_board` exists and `boards_index` is empty, create `Default Board` with that data, set as active, remove `current_board`.

- **App state changes (`src/App.jsx`)**
  - Add `activeBoardId`, `boards` (optional, can fetch on-demand).
  - On mount:
    - Ensure migration ran.
    - Read `active_board_id`, load its board state to `cards`/`connections`.
  - On state changes:
    - Save via `saveBoardById(activeBoardId, { cards, connections })` with existing debounce.
  - Add handlers:
    - `handleCreateNewBoard(name)`: calls `createBoard`, loads it.
    - `handleSwitchBoard(boardId)`: sets active, loads board state.
    - Optional: `handleRenameBoard`, `handleDeleteBoard`.

- **Toolbar integration (`src/components/toolbar.jsx`)**
  - Wire “New Board” button:
    - Open a simple prompt/modal for name → call `onCreateBoard(name)` prop.
  - Import/Export:
    - Move import logic out of Toolbar (since it currently references `setCards`/`setConnections` which don’t exist there).
    - Toolbar triggers `onImport()` and `onExport()` callbacks; App handles read/write for the active board.

- **History panel (`src/components/history.jsx`)**
  - Toggleable side panel/drawer listing boards from `listBoards()`.
  - Each row: name, last updated, optional actions (open, rename, delete, duplicate).
  - Clicking a board calls `onSelect(boardId)` to switch and load.
  - Provide a search/filter input for future scalability.

- **Wiring**
  - App renders `History` with:
    - `isOpen`, `onClose`, `boards` (or `loadBoards()` inside History), `onSelect`, `onRename`, `onDelete`.
  - App passes to `Toolbar`:
    - `onCreateBoard`, `onExportActiveBoard`, `onImportToActiveBoard`, `onToggleHistory`.

- **UX details**
  - After creating a board, auto-navigate to it and show an empty canvas.
  - Show a toast on board switching, creation, rename, delete.
  - Confirm before delete; if deleting active board, switch to the most recent remaining board.

- **Edge cases**
  - No boards: auto-create “My First Board”.
  - Failed migrations: fallback to empty default board.
  - Import validation: ensure shape contains `cards`/`connections` before saving.

- **Testing checklist**
  - Create multiple boards; verify each persists independent data.
  - Switch boards; ensure the right data loads and saves.
  - Rename/delete boards; index updates correctly.
  - Import/Export works for active board only.
  - Migration from legacy `current_board` runs once and cleans up.

Say the word and I’ll implement it end-to-end, starting with storage utilities and App wiring, then the History UI, and finally Toolbar integration.