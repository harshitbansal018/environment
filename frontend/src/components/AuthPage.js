// AuthPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // ✅ To redirect
import "./AuthPage.css";

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
      const response = await axios.post(url, form);
      alert(response.data);

      if (isLogin) {
        setIsAuthenticated(true);      // ✅ Update auth state
        navigate("/");                 // ✅ Redirect to main page
      }

      setForm({ username: "", password: "" });
    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }
  };

 return (
  <div className="auth-page-wrapper">
    <div className="auth-page">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)} className="switch-btn">
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  </div>
);}


export default AuthPage;
