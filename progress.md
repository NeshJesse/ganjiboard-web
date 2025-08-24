### App.jsx
import Toolbar from "./components/toolbar";
import Sidebar from "./components/sidebar";
import BudgetCard from "./components/budgetCard";
import CanvasBoard from "./components/canvasBoard";
import Namebar from './components/namebar';
import { useState, useEffect } from "react";

export default function App() {
  const [currentTool, setCurrentTool] = useState("select");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pendingConnection, setPendingConnection] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ganjiboard");
    if (saved) {
      const { cards, connections } = JSON.parse(saved);
      setCards(cards || []);
      setConnections(connections || []);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("ganjiboard", JSON.stringify({ cards, connections }));
  }, [cards, connections]);

  const handleCreateCard = (form) => {
    const newCard = {
      id: Date.now().toString(),
      ...form,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
    };
    setCards([...cards, newCard]);
    setIsSidebarOpen(false);
  };

  const handleUpdateCard = (id, newX, newY) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, x: newX, y: newY } : c)));
  };

  const handleCardClick = (id) => {
    if (currentTool !== "connect") return;

    if (!pendingConnection) {
      setPendingConnection(id);
    } else {
      if (pendingConnection !== id) {
        setConnections([
          ...connections,
          { id: Date.now().toString(), fromId: pendingConnection, toId: id },
        ]);
      }
      setPendingConnection(null);
      setCurrentTool("select");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100">
      <Namebar />
      <Toolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onClear={() => {
          setCards([]);
          setConnections([]);
          localStorage.removeItem("ganjiboard"); // also clear storage
        }}
        onExport={() => {
          const blob = new Blob([JSON.stringify({ cards, connections }, null, 2)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `ganjiboard_${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }}
      />
     


      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateCard={handleCreateCard}
      />

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl z-40 hover:bg-blue-700"
      >
        +
      </button>

      <CanvasBoard
        cards={cards}
        connections={connections}
        currentTool={currentTool}
        onUpdateCard={handleUpdateCard}
        onCardClick={handleCardClick}
      />
    </div>
  );
}

## toolbar.jsx
import { useState } from "react";
import { FaMousePointer, FaPen, FaArrowRight, FaFont, FaTrash, FaDownload } from "react-icons/fa";

export default function Toolbar({ currentTool, onToolChange, onClear, onExport }) {
  const tools = [
    { id: "select", icon: <FaMousePointer />, label: "Select" },
    { id: "draw", icon: <FaPen />, label: "Draw" },
    { id: "connect", icon: <FaArrowRight />, label: "Connect" },
    { id: "text", icon: <FaFont />, label: "Text" },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full flex items-center gap-2 px-4 py-2 z-50">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition 
            ${currentTool === tool.id ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-700"}`}
        >
          {tool.icon}
          <span className="hidden sm:inline">{tool.label}</span>
        </button>
      ))}
      <div className="border-l h-6 mx-2 border-gray-300"></div>
      <button onClick={onClear} className="px-3 py-1 hover:bg-gray-200 rounded-full text-gray-700">
        <FaTrash /> <span className="hidden sm:inline ml-1">Clear</span>
      </button>
      <button onClick={onExport} className="px-3 py-1 hover:bg-gray-200 rounded-full text-gray-700">
        <FaDownload /> <span className="hidden sm:inline ml-1">Export</span>
      </button>
    </div>
  );
}

### Sidebar.jsx
import { useState } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose, onCreateCard }) {
  const [form, setForm] = useState({
    type: "income",
    title: "",
    amount: "",
    category: "salary",
    frequency: "monthly",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCard(form);
    setForm({ type: "income", title: "", amount: "", category: "salary", frequency: "monthly", notes: "" });
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Add New Card</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Card Type</label>
          <select id="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2">
            <option value="income">💰 Income</option>
            <option value="expense">💸 Expense</option>
            <option value="savings">🎯 Savings</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input id="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Amount</label>
          <input id="amount" type="number" value={form.amount} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Category</label>
          <select id="category" value={form.category} onChange={handleChange} className="w-full border rounded p-2">
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="rent">Rent</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Frequency</label>
          <select id="frequency" value={form.frequency} onChange={handleChange} className="w-full border rounded p-2">
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Notes</label>
          <textarea id="notes" value={form.notes} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          <FaPlusCircle /> Create Card
        </button>
      </form>
    </div>
  );
}

### Namebar
import { useState } from "react";

export default function Namebar() {
 

  return (
<div className="fixed top-5 left-6 w-50 h-16 bg-white shadow-md z-50 flex items-center  rounded-full justify-between px-6">
        <img src='./app_icon.png' alt="GanjiBoard Logo" className="h-10" />
        <h1 className="text-xl font-bold">GanjiBoard</h1>
        
      </div>
  );
}

### History
export default function HistorySidebar({
  isOpen = false,
  onClose = () => {},
  snapshots = [],
  onLoad = () => {},
  onDelete = () => {},
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      role="dialog"
      aria-label="History"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">History</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-xl leading-none"
          aria-label="Close history"
        >
          ×
        </button>
      </div>

      {/* Snapshot List */}
      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
        {snapshots.length === 0 ? (
          <p className="text-sm text-gray-500">No snapshots saved yet.</p>
        ) : (
          snapshots.map((snap) => {
            const name = snap?.name || "Untitled Snapshot";
            const ts =
              snap?.createdAt
                ? new Date(snap.createdAt).toLocaleString()
                : "—";
            return (
              <div
                key={snap.id}
                className="p-3 border rounded-lg shadow-sm bg-gray-50 flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-800">
                    {name}
                  </h3>
                  <span className="text-xs text-gray-500">{ts}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onLoad(snap.id)}
                    className="flex-1 bg-blue-600 text-white text-sm px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => onDelete(snap.id)}
                    className="flex-1 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


### connection Layer
import { Arrow } from "react-konva";

export default function ConnectionLayer({ cards, connections }) {
  // Find center of a card
  const getCardCenter = (card) => ({
    x: card.x + 110, // half of cardWidth (220/2)
    y: card.y + 60,  // half of cardHeight (120/2)
  });

  return (
    <>
      {connections.map((conn) => {
        const fromCard = cards.find((c) => c.id === conn.fromId);
        const toCard = cards.find((c) => c.id === conn.toId);

        if (!fromCard || !toCard) return null;

        const from = getCardCenter(fromCard);
        const to = getCardCenter(toCard);

        return (
          <Arrow
            key={conn.id}
            points={[from.x, from.y, to.x, to.y]}
            stroke="#374151"
            fill="#374151"
            strokeWidth={2}
            pointerLength={10}
            pointerWidth={10}
          />
        );
      })}
    </>
  );
}


### CanvasBoard

import { Stage, Layer, Line } from "react-konva";
import BudgetCardKonva from "./budgetCard";
import ConnectionLayer from "./connLayer";

export default function CanvasBoard({ cards, connections, currentTool, onUpdateCard, onCardClick }) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const gridSize = 40;
  const gridLines = [];
  for (let i = 0; i < width / gridSize; i++) {
    gridLines.push(
      <Line key={`v-${i}`} points={[i * gridSize, 0, i * gridSize, height]} stroke="#f3f4f6" />
    );
  }
  for (let j = 0; j < height / gridSize; j++) {
    gridLines.push(
      <Line key={`h-${j}`} points={[0, j * gridSize, width, j * gridSize]} stroke="#f3f4f6" />
    );
  }

  return (
    <Stage width={width} height={height}>
      <Layer>{gridLines}</Layer>

      <Layer>
        <ConnectionLayer cards={cards} connections={connections} />
      </Layer>

      <Layer>
        {cards.map((card) => (
          <BudgetCardKonva
            key={card.id}
            {...card}
            currentTool={currentTool}
            onDragEnd={onUpdateCard}
            onCardClick={onCardClick}
          />
        ))}
      </Layer>
    </Stage>
  );
}

### BudgetCard
import { Group, Rect, Text } from "react-konva";

export default function BudgetCardKonva({
  id,
  type,
  title,
  amount,
  notes,
  x,
  y,
  currentTool,
  onDragEnd,
  onCardClick,
}) {
  const colors = {
    income: "#10b981",
    expense: "#ef4444",
    savings: "#3b82f6",
  };

  const cardWidth = 220;
  const cardHeight = 120;

  return (
    <Group
  x={x}
  y={y}
  draggable
  onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
  onClick={() => {
    if (currentTool === "connect") onCardClick(id);
  }}
>

      <Rect
        width={cardWidth}
        height={cardHeight}
        fill="white"
        stroke={colors[type]}
        strokeWidth={3}
        cornerRadius={12}
        shadowBlur={6}
        shadowColor="rgba(0,0,0,0.15)"
      />
      <Text
        text={title}
        fontSize={16}
        fontStyle="bold"
        fill="#111827"
        x={12}
        y={12}
        width={cardWidth - 70}
        ellipsis
      />
      <Group x={cardWidth - 60} y={10}>
        <Rect width={50} height={20} fill={colors[type]} cornerRadius={10} />
        <Text
          text={type.charAt(0).toUpperCase() + type.slice(1)}
          fontSize={11}
          fill="white"
          width={50}
          height={20}
          align="center"
          verticalAlign="middle"
        />
      </Group>
      
      <Text
        text={`KES ${amount}`}
        fontSize={18}
        fill={colors[type]}
        fontStyle="bold"
        x={12}
        y={44}
      />
      {notes && (
        <Text
          text={notes}
          fontSize={12}
          fill="#6b7280"
          x={12}
          y={72}
          width={cardWidth - 24}
          ellipsis
        />
      )}
    </Group>
  );
}
