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
   <div className="flex justify-center mt-6">
  <form
    onSubmit={handleAdd}
    className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
  >
    {/* Heading */}
    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      Add New Task
    </h2>

    {/* Title */}
    <div className="mb-4">
      <label className="text-sm text-gray-600">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={data.title}
        onChange={handleInput}
        className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
      />
    </div>

    {/* Description */}
    <div className="mb-2">
      <label className="text-sm text-gray-600">Description</label>
      <textarea
        name="description"
        placeholder="Enter description"
        value={data.description}
        onChange={handleInput}
        className="w-full mt-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
        rows="3"
      />
    </div>

    {/* Button */}
    <button
      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-200 shadow-md hover:shadow-lg active:scale-95"
    >
      Add Task
    </button>
  </form>
</div>
  );
};

export default Todo;