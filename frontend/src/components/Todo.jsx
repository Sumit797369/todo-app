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
  <div className="mt-3">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      Add New Task
    </h2>
    <div className="flex justify-center">
  <form
    onSubmit={handleAdd}
    className="bg-white shadow-md rounded-xl px-4 py-3 w-full max-w-3xl"
  >
    <div className="flex flex-col sm:flex-row gap-3 items-center">

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={data.title}
        onChange={handleInput}
        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
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
        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none overflow-hidden"
      />

      {/* Button */}
      <button
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition text-sm whitespace-nowrap"
      >
        Add
      </button>
    </div>
  </form>
    </div>
</div>
  );
};

export default Todo;