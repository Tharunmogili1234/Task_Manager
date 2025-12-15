import React, { useState } from "react";

function Login({ setRole, setUsername }) {
  const [name, setName] = useState("");

  return (
    <div className="box">
      <h2>Login</h2>
      <input placeholder="Enter username" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setRole("admin")}>Login as Admin</button>
      <button onClick={() => { setUsername(name); setRole("user"); }}>Login as User</button>
    </div>
  );
}

export default Login;
