import React, { useState } from "react";

function User({ username, goHome }) {
  const [tasks, setTasks] = useState([]);

  function loadTasks() {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = allTasks.filter(
      task => task.assignedTo === username
    );
    setTasks(userTasks);
  }

  function completeTask(id) {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = allTasks.map(task =>
      task.id === id ? { ...task, status: "Completed" } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
  }

  const pendingTasks = tasks.filter(t => t.status === "Pending");
  const completedTasks = tasks.filter(t => t.status === "Completed");

  return (
    <div className="box">
      
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={goHome}
          style={{ width: "80px", padding: "5px", fontSize: "14px" }}
        >
          Home
        </button>
      </div>

      <h2>User Dashboard ({username})</h2>

      <button onClick={loadTasks}>Load My Tasks</button>

      
      <h3>Pending Tasks ({pendingTasks.length})</h3>


      {pendingTasks.length === 0 && <p>No pending tasks</p>}

      {pendingTasks.map(task => (
        <div
          key={task.id}
          className="task"
          style={{
            border: "2px solid red",
            backgroundColor: "#ffe6e6"
          }}
        >
          <p><b>Task:</b> {task.title}</p>
          <p><b>Status:</b> Pending</p>

          <button onClick={() => completeTask(task.id)}>
            Mark as Completed
          </button>
        </div>
      ))}

      
      <h3>Completed Tasks ({completedTasks.length})</h3>


      {completedTasks.length === 0 && <p>No completed tasks</p>}

      {completedTasks.map(task => (
        <div
          key={task.id}
          className="task"
          style={{
            border: "2px solid green",
            backgroundColor: "#e6ffe6"
          }}
        >
          <p><b>Task:</b> {task.title}</p>
          <p><b>Status:</b> Completed</p>
        </div>
      ))}
    </div>
  );
}

export default User;
