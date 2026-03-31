import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import TodoCards from "../components/TodoCards";
import { useEffect } from "react";

const Dashboard = ({ setIsLogin }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);
  const [currentPage, setCurrentPage] = useState(1);
const tasksPerPage = 3;

const indexOfLastTask = currentPage * tasksPerPage;
const indexOfFirstTask = indexOfLastTask - tasksPerPage;

const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);


   const token = localStorage.getItem("token");
  // console.log(token);
  

  useEffect(() => {
    const getTasks = async () => {
      try {
       

        const res = await fetch("https://todo-app-1-k0d4.onrender.com/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`

          },
        });

        const data = await res.json();
console.log("GET TASKS:", data);
        setTasks(data.tasks || []);
      } catch (err) {
        console.log(err);
      }
    };

    getTasks();
  }, []);

  // add task
const addTask = async (task) => {

  try {

    const res = await fetch("https://todo-app-1-k0d4.onrender.com/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // token: token
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    console.log("ADD RESPONSE:", data); // 🔥 check karo

    if (data.success && data.task) {
      setTasks((prev) => [...prev, data.task]);
    } else {
      alert("Task not added");
    }

  } catch (err) {
    console.log(err);
  }

};

  // delete task
  const handleDelete = async (id) => {
    try {
      await fetch(`https://todo-app-1-k0d4.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          // token: token,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  // complete task
  const handleComplete = async (id, currentStatus) => {
    try {
      await fetch(`https://todo-app-1-k0d4.onrender.com/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      const updated = tasks.map((task) =>
        task._id === id ? { ...task, completed: !currentStatus } : task,
      );

      setTasks(updated);
    } catch (err) {
      console.log(err);
    }
  };


const handleEdit = async (id, updatedData) => {

  try {

    const res = await fetch(
      `https://todo-app-1-k0d4.onrender.com/api/tasks/updateTask/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // token: token
        },
        body: JSON.stringify(updatedData)
      }
    );

    const data = await res.json();

    if (data.success) {

      const updatedTasks = tasks.map(task =>
        task._id === id ? data.task : task
      );

      setTasks(updatedTasks);
    }

  } catch (err) {
    console.log(err);
  }

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
  <Navbar setIsLogin={setIsLogin} setSearch={setSearch} />

  {/* Page Container */}
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

    {/* Top Section */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>
      
      {/* Stats Card (optional look upgrade) */}
      <div className="bg-white shadow-md rounded-xl px-4 py-2 text-sm text-gray-600">
        Total: {tasks.length}
      </div>
    </div>

    {/* Add Task Card */}
    <div className="bg-white shadow-lg rounded-xl p-5 mb-6">
      <Todo addTask={addTask} />
    </div>

    {/* Tasks Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.isArray(tasks) &&
        currentTasks.map((task) =>
          task ? (
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 p-4">
              <TodoCards
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onComplete={handleComplete}
                onEdit={handleEdit}
              />
            </div>
          ) : null
        )}
    </div>

    {/* Empty State */}
    {tasks.length === 0 && (
      <p className="text-center text-gray-500 mt-10">
        No tasks yet. Add your first task 🚀
      </p>
    )}

    {/* Pagination */}
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white shadow rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

      <span className="font-medium text-gray-700">
        Page {currentPage}
      </span>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={indexOfLastTask >= tasks.length}
        className="px-4 py-2 bg-white shadow rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>

  </div>
</div>
  );
};

export default Dashboard;
