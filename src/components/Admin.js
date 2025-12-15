import React, { useState, useEffect } from "react";

function Admin({ goHome }) {
  const [taskName, setTaskName] = useState("");
  const [assignUser, setAssignUser] = useState("");
  const [tasks, setTasks] = useState([]);

  const users = ["user1", "user2", "user3"];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  function saveTasks(updated) {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  function addTask() {
  if (!taskName || !assignUser) return;

  
  const sameUserExists = tasks.some(
    t =>
      t.title === taskName &&
      t.assignedTo === assignUser &&
      t.status === "Pending"
  );

  if (sameUserExists) {
    alert("This task is already assigned to this user.");
    return;
  }

  
  const otherUserExists = tasks.some(
    t =>
      t.title === taskName &&
      t.assignedTo !== assignUser &&
      t.status === "Pending"
  );

  if (otherUserExists) {
    const confirmAssign = window.confirm(
      "This task is already assigned to another user. Do you want to assign it to this user as well?"
    );

    if (!confirmAssign) {
      return; 
    }
  }

  
  const newTask = {
    id: Date.now(),
    title: taskName,
    assignedTo: assignUser,
    status: "Pending"
  };

  saveTasks([...tasks, newTask]);
  setTaskName("");
  setAssignUser("");
}



  function reassignTask(id, newUser) {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, assignedTo: newUser } : t
    );
    saveTasks(updated);
  }

  function editTask(id) {
    const newTitle = prompt("Edit task name");
    if (!newTitle) return;

    const updated = tasks.map(t =>
      t.id === id ? { ...t, title: newTitle } : t
    );
    saveTasks(updated);
  }

  function deleteTask(id) {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  }

  const pendingTasks = tasks.filter(t => t.status === "Pending");
  const completedTasks = tasks.filter(t => t.status === "Completed");

  return (
    <div className="box">
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
  <button
    onClick={goHome}
    style={{
      width: "80px",
      padding: "5px",
      fontSize: "14px"
    }}
  >
    Home
  </button>
</div>


      <h2>Admin Dashboard</h2>

      <input
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <select
        value={assignUser}
        onChange={(e) => setAssignUser(e.target.value)}
      >
        <option value="">Assign to user</option>
        {users.map(u => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      <button onClick={addTask}>Add Task</button>

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
          <p><b>Assigned to:</b> {task.assignedTo}</p>

          <select
            value={task.assignedTo}
            onChange={(e) => reassignTask(task.id, e.target.value)}
          >
            {users.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <button onClick={() => editTask(task.id)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
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
          <p><b>Assigned to:</b> {task.assignedTo}</p>
          <p><b>Status:</b> Completed</p>

          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
