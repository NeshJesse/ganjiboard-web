
export default function HistorySidebar({
  isOpen = false,
  onClose = () => {},
  boards = [],
  onSelect = () => {},
  onDelete = () => {},
  onRename = () => {},
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
        <h2 className="text-lg font-semibold text-gray-800">Boards</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-xl leading-none"
          aria-label="Close history"
        >
          ×
        </button>
      </div>

      {/* Boards List */}
      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
        {boards.length === 0 ? (
          <p className="text-sm text-gray-500">No boards yet.</p>
        ) : (
          boards.map((b) => {
            const name = b?.name || "Untitled Board";
            const ts =
              b?.updatedAt
                ? new Date(b.updatedAt).toLocaleString()
                : "—";
            return (
              <div
                key={b.id}
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
                    onClick={() => onSelect(b.id)}
                    className="flex-1 bg-blue-600 text-white text-sm px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => onRename(b.id)}
                    className="flex-1 bg-gray-600 text-white text-sm px-2 py-1 rounded hover:bg-gray-700"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => onDelete(b.id)}
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
