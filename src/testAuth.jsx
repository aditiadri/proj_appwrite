import React, { useState } from "react";
import authService from "./appwrite/auth";

export default function TestAuth() {
  const [user, setUser] = useState(null);

  const handleSignup = async () => {
    try {
      const email = `test${Date.now()}@example.com`;
      const password = "password123";
      const name = "Test User";

      await authService.createAccount({ email, password, name });

      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      console.log("✅ Signed up and logged in:", currentUser);
    } catch (err) {
      console.error("❌ Signup error:", err);
    }
  };

  const handleLogin = async () => {
    try {
      const email = prompt("Enter email you used at signup:");
      const password = prompt("Enter password (default: password123)");

      await authService.login({ email, password });

      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      console.log("✅ Logged in:", currentUser);
    } catch (err) {
      console.error("❌ Login error:", err);
    }
  };

  return (
    <div>
      <h2>Auth Test</h2>
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogin}>Login</button>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}
