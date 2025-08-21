import { useState } from "react";
import { FaMousePointer, FaPen, FaArrowRight, FaFont, FaTrash, FaDownload } from "react-icons/fa";

export default function Toolbar({ currentTool, onToolChange, onClear, onExport }) {
  const tools = [
    { id: "select", icon: <FaMousePointer />, label: "Select" },
    { id: "draw", icon: <FaPen />, label: "Draw" },
    { id: "connect", icon: <FaArrowRight />, label: "Connect" },
    { id: "text", icon: <FaFont />, label: "Text" },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full flex items-center gap-2 px-4 py-2 z-50">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolChange(tool.id)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition 
            ${currentTool === tool.id ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-700"}`}
        >
          {tool.icon}
          <span className="hidden sm:inline">{tool.label}</span>
        </button>
      ))}
      <div className="border-l h-6 mx-2 border-gray-300"></div>
      <button onClick={onClear} className="px-3 py-1 hover:bg-gray-200 rounded-full text-gray-700">
        <FaTrash /> <span className="hidden sm:inline ml-1">Clear</span>
      </button>
      <button onClick={onExport} className="px-3 py-1 hover:bg-gray-200 rounded-full text-gray-700">
        <FaDownload /> <span className="hidden sm:inline ml-1">Export</span>
      </button>
    </div>
  );
}
