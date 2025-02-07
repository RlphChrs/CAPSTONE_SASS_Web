import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm"; // Fix the import path
import "../styles/LoginForm.css";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-900 to-gray-900 text-white flex flex-col">
      <Header />
      <div className="page-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
