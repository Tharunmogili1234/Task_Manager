import React, { useState } from "react";
import Login from "./components/Login";
import Admin from "./components/Admin";
import User from "./components/User";

function App() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  function goHome() {
    setRole("");
    setUsername("");
  }

  return (
    <div>
      {!role && <Login setRole={setRole} setUsername={setUsername} />}

      {role === "admin" && <Admin goHome={goHome} />}
      {role === "user" && <User username={username} goHome={goHome} />}
    </div>
  );
}

export default App;
