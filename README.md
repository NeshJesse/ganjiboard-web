# React + Vite
chat--- Redeers light account

# 🧾 GanjiBoard - Technical Documentation

## 📋 Project Overview

**GanjiBoard** is a web-based infinite canvas application for visual financial planning and collaborative budgeting. It combines the flexibility of a digital whiteboard with structured financial tracking capabilities.

**Current Version**: MVP v1.2
**Status**: V1 completed and deployed to vercel

---

## 🎯 Core Value Proposition

Visual, collaborative financial planning that bridges the gap between spreadsheet precision and whiteboard flexibility.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Canvas Rendering**: React-Konva (Canvas-based)
- **Styling**: TailwindCSS
- **Icons**: React Icons (Fa*)
- **State Management**: React Hooks (useState, useEffect)

### Data Persistence
- **Primary Storage**: IndexedDB via localForage
- **Fallback**: localStorage (legacy)
- **File Operations**: JSON import/export

### Deployment
- **Platform**: Vercel/Netlify compatible
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

---

## 🧩 Core Features Implemented

### 1. Infinite Canvas System
- **Konva-based Stage**: Infinite drag-and-drop canvas
- **Grid Background**: 40px grid with alignment guides
- **Responsive Design**: Adapts to window size

### 2. Multi-Type Card System
#### Budget Cards
- **Types**: Income (green), Expense (red), Savings (blue)
- **Properties**: Title, amount, category, frequency, notes
- **Visual**: Color-coded with type badges

#### Shopping List Cards
- **Properties**: Title, items array, total cost field
- **Interactivity**: Checkable items, strikethrough completion
- **Visual**: Purple theme with item checklist

#### Wishlist Cards
- **Properties**: Title, items with priorities (high/medium/low)
- **Visual**: Orange theme with priority indicators

### 3. Connection System
- **Arrow Connections**: Visual links between cards
- **Connection Tool**: Click-to-connect workflow
- **Data Model**: { id, fromId, toId } structure
- **Persistence**: Saved and restored with board state

### 4. Data Persistence
- **Auto-save**: Debounced 500ms save on state changes
- **IndexedDB Storage**: localForage wrapper for robust storage
- **Import/Export**: Full JSON board state backup/restore
- **Clear Functionality**: Complete board reset

### 5. Tool System
- **Toolbar**: Select, Connect, Draw, Text tools (UI ready)
- **Sidebar**: Card creation form with type-specific fields
- **Interaction Modes**: Drag, connect, create workflows

---

## 📊 Data Models

### Card Object
```typescript
interface BaseCard {
  id: string;
  cardType: 'budget' | 'shopping' | 'wishlist';
  title: string;
  x: number;
  y: number;
}

interface BudgetCard extends BaseCard {
  cardType: 'budget';
  type: 'income' | 'expense' | 'savings';
  amount: number | string;
  category: string;
  frequency: string;
  notes: string;
}

interface ShoppingCard extends BaseCard {
  cardType: 'shopping';
  items: Array<{ name: string; checked: boolean }>;
  totalCost?: string;
}

interface WishlistCard extends BaseCard {
  cardType: 'wishlist';
  items: Array<{ name: string; priority: 'high' | 'medium' | 'low' }>;
}
```

### Board State
```typescript
interface BoardState {
  cards: Array<BudgetCard | ShoppingCard | WishlistCard>;
  connections: Array<{
    id: string;
    fromId: string;
    toId: string;
  }>;
}
```

---

## 🚀 User Workflows

### 1. Board Creation
1. User opens app → Loads last state from IndexedDB
2. Starts with empty canvas or previous work

### 2. Card Management
1. Click "+" button → Opens sidebar
2. Select card type → Shows type-specific form
3. Fill details → Card appears on canvas
4. Drag to position → Auto-saves position

### 3. Connection Creation
1. Select "Connect" tool → Click first card → Click second card
2. Arrow created → Returns to Select tool
3. Auto-saves connection

### 4. Collaboration Preparation
1. Export board → Downloads JSON file
2. Share file → Others import into their GanjiBoard
3. Manual collaboration via file sharing

---

## 🔧 Technical Implementation Details

### Storage Service (`src/utils/storage.js`)
- **localForage Integration**: Async IndexedDB operations
- **Error Handling**: Graceful fallbacks and user feedback
- **Data Validation**: JSON schema validation on import
- **Performance**: Debounced saves to prevent UI blocking

### Component Structure
```
src/
├── components/
│   ├── App.jsx                 # Main application wrapper
│   ├── CanvasBoard.jsx         # Konva stage and layers
│   ├── toolbar.jsx             # Tool selection UI
│   ├── sidebar.jsx             # Card creation form
│   ├── namebar.jsx             # Branding header
│   ├── budgetCard.jsx          # Budget card renderer
│   ├── shoplist.jsx            # Shopping list card renderer
│   ├── wishlist.jsx            # Wishlist card renderer
│   └── connLayer.jsx           # Connection arrows renderer
├── utils/
│   └── storage.js              # Persistence layer
└── firebase.js                 # Future Firebase integration
```

### Performance Considerations
- **Konva Optimization**: Separate layers for grid/cards/connections
- **Render Efficiency**: Virtualized rendering for large boards
- **Memory Management**: Efficient card object handling
- **Debounced Operations**: Prevents excessive re-renders

---

## 🌟 Future Roadmap

### Phase 2: Collaboration Features
- **Real-time Sync**: WebSocket-based live collaboration
- **User Presence**: Avatar indicators and cursor sharing
- **Comments & Annotations**: Card-specific discussion threads
- **Version History**: Board snapshot and restore points

### Phase 3: Business Features
- **Export Formats**: Excel, CSV, PDF reporting
- **Accounting Integration**: QuickBooks/Xero connectivity
- **Advanced Analytics**: Financial insights and projections
- **Template System**: Pre-built board templates

### Phase 4: Platform Expansion
- **Mobile App**: React Native implementation
- **API Access**: Developer platform and integrations
- **Marketplace**: Community templates and extensions
- **Enterprise Features**: SSO, audit logs, compliance

---

## 🛡️ Security & Privacy

### Current Implementation
- **Client-side Only**: All data stays on user's device
- **No Tracking**: Zero analytics or data collection
- **Export Control**: User controls what they share

### Future Considerations
- **E2E Encryption**: For cloud-synced boards
- **Permission System**: View/edit/comment permissions
- **Data Residency**: Region-specific storage options
- **GDPR Compliance**: Data export and deletion tools

---

## 📈 Scalability Considerations

### Current Architecture
- **Client-side Processing**: Minimal server requirements
- **Static Hosting**: CDN-friendly build output
- **Progressive Enhancement**: Works offline-first

### Future Scaling
- **Microservices**: Separate auth, storage, real-time services
- **CDN Optimization**: Asset delivery optimization
- **Database Sharding**: User-based data partitioning
- **Caching Strategy**: Intelligent client-side caching

---

## 🔍 Development Status

### ✅ Completed
- [x] Infinite canvas with grid
- [x] Multi-type card system
- [x] Drag-and-drop functionality
- [x] Connection system with arrows
- [x] IndexedDB persistence
- [x] Import/export functionality
- [x] Responsive design

### 🚧 In Progress
- [ ] Real-time collaboration
- [ ] Advanced card interactions
- [ ] Mobile optimization
- [ ] Template system

### 📋 Backlog
- [ ] User authentication
- [ ] Cloud synchronization
- [ ] Advanced reporting
- [ ] Integration ecosystem

---

## 🎨 Design Philosophy

**GanjiBoard** follows a "visual first" approach:
- **Intuitive**: No training required for basic usage
- **Flexible**: Adapts to various financial scenarios
- **Collaborative**: Designed for shared financial planning
- **Extensible**: Modular architecture for future features

