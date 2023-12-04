"use client";
import { useState } from "react";

const Register = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <div className="register_page">
      <div className={`form-structor ${isLoginFormVisible ? "" : "slide-up"}`}>
        <div className={`signup ${isLoginFormVisible ? "" : "slide-up"}`}>
          <h2 className="form-title" onClick={toggleForm}>
            <span
              className={`text-secondary`}
              style={{
                display: isLoginFormVisible ? "none" : "inline-block",
                fontSize: "0.8rem",
              }}
            >
              or
            </span>
            Sign up
          </h2>
          <div className="form-holder">
            <input type="text" className="input" placeholder="Name" />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Password" />
          </div>
          <button className="submit-btn" onClick={toggleForm}>
            Sign up
          </button>
        </div>
        <div className={`login ${isLoginFormVisible ? "slide-up" : ""}`}>
          <div className="center">
            <h2 className="form-title" onClick={toggleForm}>
              <span
                className={`text-secondary`}
                style={{
                  display: !isLoginFormVisible ? "none" : "inline-block",
                  fontSize: "0.8rem",
                }}
              >
                or
              </span>
              Log in
            </h2>
            <div className="form-holder">
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn" onClick={toggleForm}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
