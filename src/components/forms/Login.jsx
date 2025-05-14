import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../app/userSlice";
import "../../styling/landing.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log("response: ", response);

      // stores login credentials
      localStorage.setItem("token", response.token);
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  return (
    <div className="modal-container">
      <main className="modal">
        <h1>Welcome</h1>
        <form className="regLogForm" onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={!email || !password}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
