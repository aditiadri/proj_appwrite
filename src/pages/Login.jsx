import React from "react";
// Import the actual login form UI component directly (renamed file path kept same)
import LoginComponent from "../components/Login";

function LoginPage() {
  return (
    <div className="py-8">
      <LoginComponent />
    </div>
  );
}

export default LoginPage;
