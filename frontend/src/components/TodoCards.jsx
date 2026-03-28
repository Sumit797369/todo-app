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
   <div className="bg-white p-4 rounded shadow mb-3">

      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full border p-1 mb-2"
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="w-full border p-1 mb-2"
          />
        </>
      ) : (
        <>
          <h3 className={`font-semibold ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </h3>

          <p className="text-sm text-gray-600">
            {task.description}
          </p>
        </>
      )}

      <div className="mt-3 flex flex-wrap gap-2">

        <button
          onClick={() => onComplete(task._id, task.completed)}
          className="bg-black text-white px-2 py-1 rounded"
        >
          Done
        </button>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TodoCards;
