
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
