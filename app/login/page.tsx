"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}
