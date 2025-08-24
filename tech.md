Perfect 👍 let’s add a **Future Work** section to the doc, so you have a roadmap beyond the MVP we’ve built.

---

# 📝 Technical Specification – GanjiBoard (MVP v1)

## 1. Overview

GanjiBoard is a **web-based infinite canvas app** for budgeting and planning.
It allows users to create **budget cards**, drag them around on a canvas with a **grid system**, and connect them with **arrows**.
The system automatically **persists all data locally** so user progress is never lost on reload.

---

## 2. Core Components & Architecture

### 2.1 Canvas System

* **Framework**: React + Vite + TailwindCSS + React-Konva.
* **Infinite Canvas (Stage)**:

  * Implemented with `react-konva`’s `<Stage>` and `<Layer>`.
  * Supports drag-and-drop of budget cards.
* **Grid System**:

  * Rendered using `<Line>` elements inside a background `Layer`.
  * Provides alignment guides for cards.

---

### 2.2 Budget Card Elements

* **Component**: `BudgetCardKonva.jsx`.
* **Properties**:

  * `id` (unique identifier).
  * `type` (income, expense, savings).
  * `title` (user-defined label).
  * `amount` (financial data).
  * `x, y` (position on canvas).
* **UI**:

  * Styled rectangles with background color by type:

    * Income = green
    * Expense = red
    * Savings = blue
  * Contains a **title** and an **amount**.
* **Draggability**:

  * Always draggable (`draggable` prop enabled).
  * Updates card position in state on drag end.

---

### 2.3 Connection System (Arrows)

* **Component**: `ConnectionLayer.jsx`.
* **Implementation**:

  * Uses `<Arrow>` from `react-konva`.
  * Draws arrows between **center points of two cards**.
* **Connection Data Model**:

  ```js
  {
    id: string,        // unique connection id
    fromId: string,    // source card id
    toId: string       // target card id
  }
  ```
* **Interaction**:

  * Toolbar includes **Select Tool** and **Connect Tool**.
  * When `Connect Tool` is active:

    * Click first card → sets `pendingConnection`.
    * Click second card → finalizes arrow and saves to state.
    * Auto-resets back to Select Tool.

---

### 2.4 Tool System

* **Toolbar**:

  * Tool switching (`Select`, `Connect`).
  * **Clear** → resets board & storage.
  * **Export** → downloads board JSON snapshot.
* **Sidebar**:

  * Appears on the right.
  * Used for **card creation** (title, type, amount).
  * New card spawns at a randomized offset.

---

## 3. Data Persistence

### 3.1 Storage Approach

* **Local Storage** (`localStorage` API).
* Stores full board state: `{ cards, connections }`.

### 3.2 Save & Load

* On **App Load**:

  * Loads `ganjiboard` key from `localStorage`.
  * Restores saved `cards` and `connections`.
* On **State Change**:

  * Every update to `cards` or `connections` triggers a `localStorage.setItem`.
* On **Clear**:

  * Empties state and removes storage key.
* On **Export**:

  * Allows JSON download of `{ cards, connections }`.

### 3.3 Example Saved State

```json
{
  "cards": [
    {
      "id": "1692718820001",
      "type": "income",
      "title": "Salary",
      "amount": 1000,
      "x": 150,
      "y": 200
    },
    {
      "id": "1692718821002",
      "type": "expense",
      "title": "Rent",
      "amount": 400,
      "x": 400,
      "y": 220
    }
  ],
  "connections": [
    {
      "id": "1692718822003",
      "fromId": "1692718820001",
      "toId": "1692718821002"
    }
  ]
}
```

---

## 4. Current User Flow

1. User opens app → Board restores from last saved state.
2. User clicks `+` button → Sidebar opens → Creates card.
3. Card appears on canvas (randomized position).
4. User can drag cards freely across grid.
5. Switch to **Connect Tool** → click card A → click card B → arrow drawn.
6. Board autosaves at each step.
7. User can clear/reset or export JSON.

---

## 5. Tech Stack

* **Frontend Framework**: React (Vite setup).
* **Styling**: TailwindCSS.
* **Canvas Rendering**: React-Konva.
* **State Management**: React hooks (`useState`, `useEffect`).
* **Persistence**: Browser `localStorage`.

---

## 6. Future Work (Planned Features)

* **Snapshot History**

  * Save multiple versions of the board (snapshots).
  * List snapshots in a History sidebar.
  * Load or delete past snapshots.
  * Allow naming snapshots for better organization.

* **Import**

  * Restore board state from a JSON file.
  * Complements existing Export feature.

* **Arrow Enhancements**

  * Draw arrows from **nearest card edge** instead of center.
  * Add labels to arrows (e.g. “50% goes here”).
  * Optional “hand-drawn” sketchy arrows using Rough.js.

* **Better Card UI**

  * Editable inline text for titles/amounts.
  * Resizable cards (not fixed size).
  * Add icons or progress bars (e.g. for savings goals).

* **Canvas Navigation**

  * Add pan & zoom controls for large boards.
  * Minimap preview.

* **Storage Upgrade**

  * Switch from `localStorage` to `localforage` (IndexedDB) for larger and more robust storage.

---

✅ This doc now fully covers **what’s built today** and a **roadmap for what’s next**.

Do you want me to also turn this into a **README.md**-style document (with simpler developer-facing instructions), or keep it as a technical design doc for now?
