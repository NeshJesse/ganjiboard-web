import { useState } from "react";

export default function Namebar() {
 

  return (
<div className="fixed top-5 left-6 w-50 h-16 bg-white shadow-md z-50 flex items-center  rounded-full justify-between px-6">
        <img src='./app_icon.png' alt="GanjiBoard Logo" className="h-10" />
        <h1 className="text-xl font-bold">GanjiBoard</h1>
        
      </div>
  );
}
