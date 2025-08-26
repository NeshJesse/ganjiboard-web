export default function CreateBoardForm({ isOpen = false, onClose = () => {}, onCreate = () => {} }) {
  if (!isOpen) return null;
  let inputRef = null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = inputRef ? inputRef.value.trim() : '';
    if (!name) return;
    onCreate(name);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Create New Board</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Board name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Family Budget"
              ref={(el) => (inputRef = el)}
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}


