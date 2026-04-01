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
        className="w-full border border-gray-200 p-3 mb-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50 font-semibold text-gray-800"
      />

      <textarea
        name="description"
        value={editData.description}
        onChange={handleChange}
        rows="2"
        className="w-full border border-gray-200 p-3 mb-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50 resize-none text-gray-600"
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
        className={`text-xs px-4 py-2 rounded-lg transition duration-200 font-medium whitespace-nowrap shadow-sm ${
          task.completed
            ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow"
        }`}
      >
        {task.completed ? "Completed" : "Mark Done"}
      </button>

      {/* Right side */}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-xs px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-sm transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-200 font-medium transition"
          >
            Edit
          </button>
        )}

      <button
        onClick={() => onDelete(task._id)}
        className="text-xs px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-200 font-medium transition"
      >
        Delete
      </button>
    </div>

  </div>
</div>
  );
};

export default TodoCards;
