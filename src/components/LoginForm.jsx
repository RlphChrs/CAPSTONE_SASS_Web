import React from "react";
import Button from "./button.jsx"; // Ensure correct import
import "../styles/LoginForm.css"; // Import styles from styles folder

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="content">
        {/* Left Section */}
        <div className="left-section">
          <h2>Student Affairs Office</h2>
          <h3>ChatBot Support System</h3>
          <img src="/image/logo.png" alt="Chatbot" className="chatbot-img" />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>Enter your email and password for sign in.</h2>

          <form className="login-form">
            <div>
              <label>Username or email</label>
              <input type="text" placeholder="Ralph123" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <Button text="Sign in" className="signin-btn" />
            <Button text="Sign in with Google" className="google-btn" icon="/image/Google-icon.png" />
          </form>

          <div className="signup-text">
            Are you new? <a href="#">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
