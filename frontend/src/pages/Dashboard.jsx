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
       

        const res = await fetch("http://localhost:5000/api/tasks", {
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

    const res = await fetch("http://localhost:5000/api/tasks/addTask", {
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
      await fetch(`http://localhost:5000/api/tasks/deleteTask/${id}`, {
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
      await fetch(`http://localhost:5000/api/tasks/updateTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // token: token,
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
      `http://localhost:5000/api/tasks/updateTask/${id}`,
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
    <div>
      <Navbar setIsLogin={setIsLogin} setSearch={setSearch} />

      {/* Todo Form */}
      <Todo addTask={addTask} />

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Your Tasks</h2>

        {/* Task List */}
       {Array.isArray(tasks) &&
  currentTasks.map((task) =>
    task ? (
      <TodoCards
        key={task._id}
        task={task}
        onDelete={handleDelete}
        onComplete={handleComplete}
         onEdit={handleEdit}
      />
    ) : null
  )}
  <div className="flex justify-center gap-4 mt-6">

    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 bg-gray-300 rounded"
    >
      Prev
    </button>

    <span className="font-semibold">
      Page {currentPage}
    </span>

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={indexOfLastTask >= tasks.length}
      className="px-3 py-1 bg-gray-300 rounded"
    >
      Next
    </button>

  </div>
      </div>
    </div>
  );
};

export default Dashboard;
