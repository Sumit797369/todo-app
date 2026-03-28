import React, { useState } from "react";
import { toast } from "react-toastify";

const Todo = ({ addTask }) => {

  const [data, setData] = useState({
    title: "",
    description: ""
  });

  // const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value
    });
    setError("");
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

    addTask(data); // ✅ backend call

    setData({
      title: "",
      description: ""
    });
    setError("");
  };

  return (
    <div className="flex justify-center mt-6">

      <form onSubmit={handleAdd} className="bg-white p-5 rounded shadow w-300">

      

        <h3>Title</h3>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={data.title}
          onChange={handleInput}
          className="w-full border p-2 mb-3 rounded"
        />
        <h3>description</h3>
        <textarea
          name="description"
          placeholder="Enter description"
          value={data.description}
          onChange={handleInput}
          className="w-full border p-2 mb-3 rounded"
        />

        <button className="w-50 bg-black text-white py-2 rounded">
          Add Task
        </button>

      </form>

    </div>
  );
};

export default Todo;