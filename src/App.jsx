import { useState } from 'react'
import Toolbar from "./components/toolbar";
import Sidebar from "./components/sidebar";
import BudgetCard from "./components/budgetCard";

export default function App() {
  const [currentTool, setCurrentTool] = useState("select");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cards, setCards] = useState([]);

  // Create new card from Sidebar form
  const handleCreateCard = (form) => {
    const newCard = {
      id: Date.now().toString(),
      ...form,
      x: 100 + cards.length * 40, // offset new cards so they don’t overlap
      y: 100 + cards.length * 40,
    };
    setCards([...cards, newCard]);
    setIsSidebarOpen(false);
  };

  // Delete a card
  const handleDeleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  // Clear all cards
  const handleClear = () => {
    if (window.confirm("Clear all cards?")) {
      setCards([]);
    }
  };

  // Export current state as JSON
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
      {/* Toolbar */}
      <Toolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onClear={handleClear}
        onExport={handleExport}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateCard={handleCreateCard}
      />

      {/* Floating button to open Sidebar */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl z-40 hover:bg-blue-700"
      >
        +
      </button>

      {/* Canvas Area */}
      <div className="w-full h-full relative">
        {cards.map((card) => (
          <BudgetCard
            key={card.id}
            {...card}
            onDelete={() => handleDeleteCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
