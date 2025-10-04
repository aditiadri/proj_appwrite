import React from "react";
import { Login as LoginComponent } from "../components";
import authService from "../appwrite/auth";

function Login() {
  return (
    <div className="py-8">
      <LoginComponent />
    </div>
  );
}

export default Login;
