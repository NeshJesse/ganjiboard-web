import Toolbar from "../components/toolbar";
import Sidebar from "../components/sidebar";
import BudgetCard from "../components/budgetCard";
import CanvasBoard from "../components/canvasBoard";
import Namebar from '../components/namebar';
import HistorySidebar from '../components/history';
import CreateBoardForm from '../components/createBoardForm';
import InlineEditor from '../components/InlineEditor';
import { useState, useEffect } from "react";
import { ensureInitialized, saveBoardState, loadBoardState, clearBoardState, exportBoardData, importBoardData, createBoard, listBoards, setActiveBoardId, loadBoardById, renameBoard, deleteBoard } from "../utils/storage";


export default function Home() {
  const [currentTool, setCurrentTool] = useState("select");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [editorState, setEditorState] = useState({ open: false, cardId: null, fields: [], initialValues: {}, position: { x: 100, y: 100 } });

  // Load from IndexedDB on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        await ensureInitialized();
        const savedState = await loadBoardState();
        setCards(savedState.cards || []);
        setConnections(savedState.connections || []);
        const b = await listBoards();
        setBoards(b);
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

  const handleEditCard = (cardId, updates) => {
    setCards(cards.map((c) => (c.id === cardId ? { ...c, ...updates } : c)));
  };

  const handleStartEdit = ({ id, type, position, fields, initialValues }) => {
    setEditorState({ open: true, cardId: id, fields, initialValues, position });
  };
  const handleImport = async (jsonData) => {
    try {
      await importBoardData(jsonData);
      const state = await loadBoardState();
      setCards(state.cards || []);
      setConnections(state.connections || []);
    } catch (error) {
      console.error("Import failed:", error);
    }
  };

  const refreshBoards = async () => {
    const b = await listBoards();
    setBoards(b);
  };

  const handleCreateBoard = async (name) => {
    const entry = await createBoard(name.trim() || 'Untitled Board');
    await refreshBoards();
    const state = await loadBoardById(entry.id);
    setCards(state.cards || []);
    setConnections(state.connections || []);
    setIsCreateFormOpen(false);
  };

  const handleSelectBoard = async (boardId) => {
    await setActiveBoardId(boardId);
    const state = await loadBoardById(boardId);
    setCards(state.cards || []);
    setConnections(state.connections || []);
    setIsHistoryOpen(false);
  };

  const handleRenameBoard = async (boardId) => {
    const name = prompt('New name?');
    if (name === null) return;
    await renameBoard(boardId, name.trim() || 'Untitled Board');
    await refreshBoards();
  };

  const handleDeleteBoard = async (boardId) => {
    if (!confirm('Delete this board? This cannot be undone.')) return;
    await deleteBoard(boardId);
    await refreshBoards();
    // Ensure UI reflects possibly changed active board
    const state = await loadBoardState();
    setCards(state.cards || []);
    setConnections(state.connections || []);
  };
const handleCreateCard = (form) => {
  let newCard;
  
  switch (form.cardType) {
    case "notes":
      newCard = {
        id: Date.now().toString(),
        cardType: "notes",
        title: form.title,
        body: form.body || "",
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      };
      break;
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
    
    default: // budget card- rename to cash card
      newCard = {
        id: Date.now().toString(),
        cardType: "cash",
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
    <div className="w-460 h-screen relative overflow-y-auto overflow-x-auto">
      {/* ... rest of your JSX ... */}
       <Namebar />
      <Toolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onClear={handleClear}
        onExport={handleExport}
        onImport={handleImport}
        onCreateBoard={() => setIsCreateFormOpen(true)}
        onToggleHistory={() => setIsHistoryOpen((v) => !v)}
      />
      <CreateBoardForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onCreate={handleCreateBoard}
      />
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        boards={boards}
        onSelect={handleSelectBoard}
        onDelete={async (id) => { await handleDeleteBoard(id); }}
        onRename={async (id) => { await handleRenameBoard(id); }}
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
        onItemToggle={handleItemToggle}
        onEditCard={handleEditCard}
        onStartEdit={handleStartEdit}
      />
      <InlineEditor
        isOpen={editorState.open}
        position={editorState.position}
        fields={editorState.fields}
        initialValues={editorState.initialValues}
        onSave={(values) => { if (editorState.cardId) handleEditCard(editorState.cardId, values); setEditorState({ open: false, cardId: null, fields: [], initialValues: {}, position: { x: 0, y: 0 } }); }}
        onCancel={() => setEditorState({ open: false, cardId: null, fields: [], initialValues: {}, position: { x: 0, y: 0 } })}
      />
      {/* ... rest of your JSX ... */}
    </div>
  );
}