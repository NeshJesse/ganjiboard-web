import { useState } from 'react'
import Toolbar from "./components/toolbar";
import Sidebar from "./components/sidebar";
import BudgetCard from "./components/budgetCard";
import CanvasBoard from "./components/canvasBoard";



export default function App() {
  const [currentTool, setCurrentTool] = useState("select");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const handleCreateCard = (form) => {
    const newCard = {
      id: Date.now().toString(),
      ...form,
      x: 100 + cards.length * 40,
      y: 100 + cards.length * 40,
    };
    setCards([...cards, newCard]);
    setIsSidebarOpen(false);
  };

  const handleUpdateCard = (id, newX, newY) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, x: newX, y: newY } : c)));
  };

  const handleClear = () => {
    if (window.confirm("Clear all cards?")) {
      setCards([]);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(cards, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ganjiboard_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100">
      <Toolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onClear={handleClear}
        onExport={handleExport}
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

      <CanvasBoard cards={cards} onUpdateCard={handleUpdateCard} />
    </div>
  );
}
