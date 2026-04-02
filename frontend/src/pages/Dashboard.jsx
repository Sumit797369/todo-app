import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import TodoCards from "../components/TodoCards";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setIsLogin }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const token = useMemo(() => localStorage.getItem("token"), []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  //  const token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setInitialLoading(true);

        const res = await fetch(
          "https://todo-app-1-k0d4.onrender.com/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        // console.log("GET TASKS:", data);
        setTasks(data.tasks || []);
      } catch (err) {
        console.log(err);
      } finally {
        setInitialLoading(false);
      }
    };

    getTasks();
  }, [token]);

  // add task
  const addTask = async (task) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://todo-app-1-k0d4.onrender.com/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // token: token
          },
          body: JSON.stringify(task),
        },
      );

      const data = await res.json();

      if (data.success && data.task) {
        setTasks((prev) => [...prev, data.task]);
        toast.success("Task added successfully ✅");
      } else {
        toast.error("Task not added ❌");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // delete task
  const handleDelete = async (id) => {
    const prevTasks = tasks;
    setTasks(tasks.filter((task) => task._id !== id));
    try {
      await fetch(`https://todo-app-1-k0d4.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          // token: token,
        },
      });

      toast.success("Task deleted 🗑️");
    } catch (err) {
      setTasks(prevTasks);
      console.log(err);
    }
  };
  // complete task
  const handleComplete = async (id, currentStatus) => {
    const updated = tasks.map((task) =>
      task._id === id ? { ...task, completed: !currentStatus } : task,
    );
    setTasks(updated);

    try {
      await fetch(`https://todo-app-1-k0d4.onrender.com/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://todo-app-1-k0d4.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // token: token
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();

      if (data.success) {
        const updatedTasks = tasks.map((task) =>
          task._id === id ? data.task : task,
        );

        setTasks(updatedTasks);
        toast.success("Task updated ✏️");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar setIsLogin={setIsLogin} setSearch={setSearch} />

      {/* Page Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 py-6">
        {initialLoading ? (
          <div className="text-center py-10 text-gray-600 font-medium">
            Loading tasks...
          </div>
        ) : (
          <>
            {/* Add Task Card */}
            <div className="bg-white shadow-lg rounded-xl p-5 mb-6">
              <Todo addTask={addTask} loading={loading} />
            </div>

            {/* Tasks Grid */}
            <div className="max-h-[55vh] ">
              <div className="flex flex-col gap-2">
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
                    ) : null,
                  )}
              </div>
            </div>

            {/* Empty State */}
            {(!tasks || tasks.length === 0) && (
              <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-2xl bg-white/50 backdrop-blur-sm mt-8">
                <svg
                  className="w-16 h-16 text-indigo-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <p className="text-gray-600 font-medium text-lg">
                  No tasks yet
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Add your first task above to get started 🚀
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-sm font-medium px-5 py-2.5 bg-white text-gray-700 shadow-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:hover:text-gray-700 transition duration-200"
              >
                Previous
              </button>

              <span className="font-medium text-gray-700">
                Page {currentPage}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastTask >= (tasks ? tasks.length : 0)}
                className="text-sm font-medium px-5 py-2.5 bg-white text-gray-700 shadow-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:hover:text-gray-700 transition duration-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
