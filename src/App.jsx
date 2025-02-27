import React from "react";
import BasicEditor from "./BasicEditor";

const App = () => {
  return (
<div className="flex items-center justify-center w-full h-screen bg-gray-800">
  <div className="bg-slate-900 w-full h-full p-6 rounded-none shadow-lg text-white">
    <h2 className="text-center text-2xl font-bold mb-4">Notepad</h2>
    <BasicEditor />
  </div>
</div>

  );
};

export default App;
