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
