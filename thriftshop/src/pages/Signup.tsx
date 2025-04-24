import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../utils/auth";
import { User } from "../types/user";
import "../styles/_forms.scss"; // your SCSS module
import { useAlert } from "../services/useAlert";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isPasswordStrong = (password: string) => password.length >= 6;

    if (!username.trim()) return showAlert("error","Username is required.");
    if (!isEmailValid(email)) return showAlert("error","Enter a valid email.");
    if (!isPasswordStrong(password))
      return showAlert("error","Password must be at least 6 characters.");

    if (password !== confirmPassword) {
      showAlert("error","Passwords do not match");
      return;
    }

    const newUser: User = {
      id: Date.now(),
      username,
      email,
      password,
    };

    try {
      signupUser(newUser);
      console.log("User signed up:", newUser);
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        showAlert("error",err.message);
      } else {
        showAlert("error","An unknown error occurred");
      }
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
        <p style={{ color: "black" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;


