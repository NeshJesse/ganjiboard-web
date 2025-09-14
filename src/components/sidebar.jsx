import { useState } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose, onCreateCard }) {
  const [form, setForm] = useState({
    cardType: "budget",
    type: "income",
    title: "",
    amount: "",
    totalCost: "", // NEW: Added totalCost field
    items: [{ name: "", checked: false }],
    category: "salary",
    frequency: "monthly",
    notes: "",
    body: "",
    priority: "medium"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { name: "", checked: false }] });
  };

  const removeItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty items for shopping/wishlist cards
    const submitForm = { ...form };
    if (form.cardType !== "budget") {
      submitForm.items = form.items.filter(item => item.name.trim() !== "");
    }
    
    onCreateCard(submitForm);
    setForm({
      cardType: "budget",
      type: "income",
      title: "",
      amount: "",
      totalCost: "", // NEW: Reset totalCost
      items: [{ name: "", checked: false }],
      category: "salary",
      frequency: "monthly",
      notes: "",
      body: "",
      priority: "medium"
    });
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-40 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Add New Card</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
        
        {/* Card Type Selection */}
        <div>
          <label className="block text-sm font-semibold">Card Type</label>
          <select id="cardType" value={form.cardType} onChange={handleChange} className="w-full border rounded p-2">
            <option value="budget">💰 Cash Card</option>
            <option value="shopping">🛒 Shopping List</option>
            <option value="wishlist">⭐ Wishlist</option>
            <option value="notes">📝 Notes</option>
          </select>
        </div>

        {/* Common Fields */}
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input id="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        {/* Budget Card Specific Fields */}
        {form.cardType === "budget" && (
          <>
            <div>
              <label className="block text-sm font-semibold">CashFlow Type</label>
              <select id="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2">
                <option value="income">💰 Income</option>
                <option value="expense">💸 Expense</option>
                <option value="savings">🎯 Savings</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Amount</label>
              <input id="amount" type="number" value={form.amount} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </>
        )}

        {/* Shopping List Specific Fields */}
        {form.cardType === "shopping" && (
          <div>
            <label className="block text-sm font-semibold">Total Estimated Cost</label>
            <input
              id="totalCost"
              type="number"
              value={form.totalCost}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border rounded p-2"
              step="0.01"
              min="0"
            />
          </div>
        )}

        {/* Shopping List & Wishlist Items */}
        {(form.cardType === "shopping" || form.cardType === "wishlist") && (
          <div>
            <label className="block text-sm font-semibold">Items</label>
            <div className="space-y-2">
              {form.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="Item name"
                    className="flex-1 border rounded p-2"
                  />
                  {form.cardType === "wishlist" && (
                    <select
                      value={item.priority || "medium"}
                      onChange={(e) => handleItemChange(index, 'priority', e.target.value)}
                      className="w-24 border rounded p-2"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:text-blue-800">
                + Add Item
              </button>
            </div>
          </div>
        )}

        {/* Notes Specific Fields */}
        {form.cardType === "notes" && (
          <div>
            <label className="block text-sm font-semibold">Body</label>
            <textarea id="body" value={form.body} onChange={handleChange} className="w-full border rounded p-2 h-32" placeholder="Write your notes here..." />
          </div>
        )}

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          <FaPlusCircle /> Create Card
        </button>
      </form>
    </div>
  );
}