import Toolbar from "./components/toolbar";
import Sidebar from "./components/sidebar";
import BudgetCard from "./components/budgetCard";
import CanvasBoard from "./components/canvasBoard";
import Namebar from './components/namebar';
import { useState, useEffect } from "react";
import { saveBoardState, loadBoardState, clearBoardState, exportBoardData } from "./utils/storage";


export default function App() {
  const [currentTool, setCurrentTool] = useState("select");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from IndexedDB on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const savedState = await loadBoardState();
        setCards(savedState.cards || []);
        setConnections(savedState.connections || []);
      } catch (error) {
        console.error("Failed to load board data:", error);
        setCards([]);
        setConnections([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Save to IndexedDB whenever state changes (with debouncing)
  useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        try {
          await saveBoardState({ cards, connections });
        } catch (error) {
          console.error("Failed to save board data:", error);
        }
      };

      // Debounce saves to prevent too frequent writes
      const timeoutId = setTimeout(saveData, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [cards, connections, isLoading]);

 

  const handleUpdateCard = (id, newX, newY) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, x: newX, y: newY } : c)));
  };

  const handleCardClick = (id) => {
    if (currentTool !== "connect") return;

    if (!pendingConnection) {
      setPendingConnection(id);
    } else {
      if (pendingConnection !== id) {
        const newConnection = {
          id: Date.now().toString(),
          fromId: pendingConnection,
          toId: id
        };
        setConnections([...connections, newConnection]);
      }
      setPendingConnection(null);
      setCurrentTool("select");
    }
  };

  const handleClear = async () => {
    setCards([]);
    setConnections([]);
    setPendingConnection(null);
    await clearBoardState();
  };

  const handleExport = async () => {
    try {
      const jsonData = await exportBoardData();
      if (jsonData) {
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ganjiboard_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };
const handleCreateCard = (form) => {
  let newCard;
  
  switch (form.cardType) {
    case "shopping":
      newCard = {
        id: Date.now().toString(),
        cardType: "shopping",
        title: form.title,
        totalCost: form.totalCost, // NEW: Include total cost
        items: form.items.filter(item => item.name.trim() !== ""),
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      };
      break;
    
    case "wishlist":
      newCard = {
        id: Date.now().toString(),
        cardType: "wishlist",
        title: form.title,
        items: form.items.filter(item => item.name.trim() !== ""),
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      };
      break;
    
    default: // budget card
      newCard = {
        id: Date.now().toString(),
        cardType: "budget",
        type: form.type,
        title: form.title,
        amount: form.amount,
        category: form.category,
        frequency: form.frequency,
        notes: form.notes,
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      };
  }
  
  setCards([...cards, newCard]);
  setIsSidebarOpen(false);
};

// Add function to handle item toggling for shopping lists
const handleItemToggle = (cardId, itemIndex) => {
  setCards(cards.map(card => {
    if (card.id === cardId && card.cardType === "shopping") {
      const updatedItems = [...card.items];
      updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
      return { ...card, items: updatedItems };
    }
    return card;
  }));
};
  // Add loading state UI
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100">
      {/* ... rest of your JSX ... */}
       <Namebar />
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

      <CanvasBoard
        cards={cards}
        connections={connections}
        currentTool={currentTool}
        onUpdateCard={handleUpdateCard}
        onCardClick={handleCardClick}
      />
      {/* ... rest of your JSX ... */}
    </div>
  );
}