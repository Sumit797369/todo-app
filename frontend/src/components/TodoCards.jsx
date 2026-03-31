import React, { useState } from "react";

const TodoCards = ({ task, onDelete, onComplete,onEdit }) => {
 const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onEdit(task._id, editData);
    setIsEditing(false);
  };

  return (
 <div >

  {isEditing ? (
    <>
      <input
        type="text"
        name="title"
        value={editData.title}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 mb-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      <textarea
        name="description"
        value={editData.description}
        onChange={handleChange}
        rows="2"
        className="w-full border border-gray-300 p-2 mb-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
      />
    </>
  ) : (
    <>
      <h3
        className={`font-semibold text-sm mb-1 ${
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {task.title}
      </h3>

      <p className="text-xs text-gray-500 line-clamp-2">
        {task.description}
      </p>
    </>
  )}

  {/* Actions */}
  <div className="mt-3 flex justify-between items-center">

    {/* Left side */}
    <button
      onClick={() => onComplete(task._id, task.completed)}
      className={`text-xs px-3 py-1 rounded-lg transition ${
        task.completed
          ? "bg-green-500 text-white"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {task.completed ? "Completed" : "Done"}
    </button>

    {/* Right side */}
    <div className="flex gap-2">
      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-xs px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Edit
        </button>
      )}

      <button
        onClick={() => onDelete(task._id)}
        className="text-xs px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>

  </div>
</div>
  );
};

export default TodoCards;
