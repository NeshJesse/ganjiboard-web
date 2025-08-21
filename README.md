# React + Vite

Perfect timing 🚀 — having a **technical specification document** will help you (and later collaborators) clarify scope, architecture, and tech choices. Based on your budget canvas prototypes (`page.html` + `index.html`) and our discussion about **hand-drawn arrows, draggable cards, infinite canvas, and local storage**, here’s a solid draft:

---

# 📝 Technical Specification: GanjiBoard (Budget Canvas App)

## 1. Project Overview

GanjiBoard is a **web-based financial planning tool** that allows users to visually organize their income, expenses, and savings goals on an infinite canvas. Users can drag and arrange “budget cards,” connect them with hand-drawn arrows, and annotate freely. All data is persisted in the browser using local storage, ensuring offline availability without a backend.

---

## 2. Core Features

### 2.1 Canvas System

* **Infinite Canvas**: Scrollable & pannable grid-based canvas.
* **Grid System**: Subtle dotted/grid background for alignment.
* **Panning**: Drag the background to reposition the view.
* **Zoom**: Disabled (fixed-scale canvas for simplicity in V1).

### 2.2 Budget Cards

* **Types**:

  * Income (green)
  * Expense (red)
  * Savings Goal (blue with progress bar)
* **Properties**:

  * Title
  * Amount / Target amount (for savings)
  * Category (salary, rent, food, etc.)
  * Frequency (monthly, yearly, etc.)
  * Notes
  * Position (x,y) on the canvas
* **Interactions**:

  * Draggable across canvas.
  * Editable (inline or via sidebar form).
  * Deletable.

### 2.3 Connections (Arrows)

* **Hand-drawn style arrows** (using Rough.js).
* **Connection system**:

  * Click + drag from a card’s anchor point to another card.
  * Arrows automatically update position when cards are moved.
  * Curved/quadratic path for natural flow.
* **Arrow properties**:

  * Source card ID
  * Target card ID
  * Path data (calculated dynamically)
  * Color (based on type of relationship: income → expense, income → savings).

### 2.4 Annotation Tools

* **Freehand Drawing Tool** (Fabric.js/Konva.js line tool).
* **Text Tool**: Add sticky-note style text annotations on the canvas.

### 2.5 Tool System

* **Select Tool**: Move cards.
* **Connection Tool**: Create arrows between cards.
* **Draw Tool**: Freehand sketches.
* **Text Tool**: Add notes.

### 2.6 Sidebar (Inspector & Form)

* Add new budget cards via form input.
* Edit properties of selected card.
* Show **Quick Stats** (Total Income, Total Expenses, Available Balance).

### 2.7 Persistence

* **LocalForage (IndexedDB)** for storing:

  * Cards (id, type, props, position).
  * Connections (source, target).
  * Annotations.
* **Auto-save** every 30s + manual export/import (JSON).

---

## 3. Tech Stack

### Frontend

* **Framework**: Vanilla JS (initial), migrate to React if scaling.
* **Canvas/Rendering**:

  * **Konva.js** (for cards, draggable shapes, annotations).
  * **Rough.js** (for sketch-style arrows).
* **UI/Styling**: TailwindCSS + FontAwesome.

### Data Storage

* **LocalForage** → unified wrapper for localStorage + IndexedDB.
* JSON export/import for backup & portability.

---

## 4. Data Model

### Card Object

```json
{
  "id": "card_123",
  "type": "income", 
  "title": "Salary",
  "amount": 85000,
  "targetAmount": null,
  "category": "salary",
  "frequency": "monthly",
  "notes": "Tech job",
  "position": { "x": 100, "y": 150 }
}
```

### Connection Object

```json
{
  "id": "conn_456",
  "from": "card_123",
  "to": "card_789",
  "color": "#10b981"
}
```

### Annotation Object

```json
{
  "id": "note_001",
  "text": "💡 Track weekly spending",
  "position": { "x": 400, "y": 300 }
}
```

---

## 5. Architecture

* **Canvas Layer** (Konva Stage):

  * Manages rendering of cards, arrows, drawings, and notes.
* **UI Layer**: Toolbar, Sidebar, Stats Panel (Tailwind + DOM).
* **State Manager**: JS object representing all cards/connections, synced to LocalForage.
* **Persistence**: Save/load state automatically.

---

## 6. Roadmap (MVP → Future)

### MVP (Version 1)

* Infinite canvas with grid.
* Draggable budget cards.
* Hand-drawn arrows between cards.
* Sidebar form for card creation.
* LocalForage persistence.
* JSON export/import.

### Future Enhancements

* Undo/Redo system.
* Collaboration (multi-user with WebRTC/Firebase).
* Zoom/minimap navigation.
* Advanced stats & visualizations.
* Theming (dark mode, custom colors).


Absolutely 👍 — let’s list out the **React components** we’ll build for GanjiBoard (based on your spec + the HTML prototypes).

---

# 🧩 Component Breakdown

### 1. **App.jsx**

* Root component.
* Manages layout (Toolbar, Sidebar, Canvas).
* Provides global context for state (cards, connections, tools).

---

### 2. **CanvasBoard.jsx**

* Wraps **Konva Stage + Layers**.
* Responsible for:

  * Infinite canvas background (grid).
  * Rendering all **BudgetCards**.
  * Rendering **ConnectionLayer** (arrows).
  * Handling panning/dragging events.

---

### 3. **BudgetCard.jsx**

* A draggable card (Income, Expense, Savings).
* Properties:

  * Title
  * Amount / Target amount
  * Category / Frequency
  * Notes
  * Position (x,y)
* Visual differences (green/red/blue theme).
* Emits drag events → updates position in state.

---

### 4. **ConnectionLayer.jsx**

* Uses **Rough.js + SVG** or Konva Line to render **hand-drawn arrows**.
* Takes a list of connections (`from → to`).
* Automatically repositions arrows when cards move.

---

### 5. **Toolbar.jsx**

* Tool switching (Select, Connect, Draw, Text).
* Clear / Export buttons.
* Highlights the active tool.

---

### 6. **Sidebar.jsx**

* Slide-out panel.
* Contains form to create/edit BudgetCards.
* Shows quick stats (Total Income, Expenses, Available Balance).

---

### 7. **Annotation.jsx** (optional for MVP)

* Sticky-note style text annotations.
* Draggable + editable.

---

### 8. **utils/storage.js**

* Wrapper around **LocalForage** for persistence.
* Methods: `saveState()`, `loadState()`, `clearState()`.

---

# 🔑 Flow of Data

* `App.jsx` → holds global state (`cards`, `connections`, `annotations`).
* Passes state + update functions to:

  * `CanvasBoard` (for visual layout)
  * `Sidebar` (for adding cards)
  * `Toolbar` (for tool switching)
* LocalForage auto-saves this global state every few seconds.

---

👉 This gives us a **modular, extensible structure** that mirrors your HTML demo but in React.

Do you want me to **generate the base skeleton of these components (empty stubs with JSX + Tailwind)** so you can start wiring them up, or should I jump straight into a **working `CanvasBoard.jsx` with 2 draggable cards and one arrow**?
