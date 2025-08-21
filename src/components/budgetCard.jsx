import React, { useState } from 'react';

export default function BudgetCard({ type, title, amount, notes, x, y, onDelete }) {
  const typeStyles = {
    income: "border-l-4 border-green-500 bg-green-50",
    expense: "border-l-4 border-red-500 bg-red-50",
    savings: "border-l-4 border-blue-500 bg-blue-50",
  };

  return (
    <div
      className={`absolute w-56 p-4 rounded-lg shadow-md cursor-move ${typeStyles[type]}`}
      style={{ top: y, left: x }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold">{title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{type}</span>
      </div>
      <p className={`font-bold mt-2 ${type === "income" ? "text-green-600" : type === "expense" ? "text-red-600" : "text-blue-600"}`}>
        KES {amount}
      </p>
      {notes && <p className="text-xs text-gray-600 mt-1">{notes}</p>}
      <div className="mt-2 flex gap-2">
        <button className="text-blue-500 text-sm">Edit</button>
        <button onClick={onDelete} className="text-red-500 text-sm">Delete</button>
      </div>
    </div>
  );
}
