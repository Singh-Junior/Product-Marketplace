import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "../services/useAlert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // using global alert

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      showAlert("error", "Enter a valid email.");
      return;
    }

    if (password.trim().length < 6) {
      showAlert("error", "Password must be at least 6 characters.");
      return;
    }

    const err = login(email, password);
    if (err) {
      showAlert("error", err);
    } else {
      showAlert("success", "Logged in successfully!");
      navigate("/", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p style={{ color: "black" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
