import React, { useState } from "react";
import { toast } from "react-toastify";

const Todo = ({ addTask }) => {

  const [data, setData] = useState({
    title: "",
    description: ""
  });

  

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value
    });
    
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!data.title.trim()) {
      toast.error("Title field is required");
      return;
    }
     if (!data.description.trim()) {
      toast.error("Please write description also");
      return;
    }

    addTask(data); 

    setData({
      title: "",
      description: ""
    });
    
  };

  return (
  <div >
    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center tracking-tight">
      Add New Task
    </h2>
    <div>
  <form
    onSubmit={handleAdd}
    
  >
    <div className="flex flex-col sm:flex-row gap-3 items-center">

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={data.title}
        onChange={handleInput}
        className="flex-1 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50 text-sm"
      />

      {/* Description (auto expand) */}
      <textarea
        name="description"
        placeholder="Description"
        value={data.description}
        onChange={(e) => {
          handleInput(e);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        rows="1"
        className="flex-1 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50 text-sm resize-none overflow-hidden"
      />

      <button
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium text-sm whitespace-nowrap shadow-md hover:shadow-lg"
      >
        Add Task
      </button>
    </div>
  </form>
    </div>
</div>
  );
};

export default Todo;