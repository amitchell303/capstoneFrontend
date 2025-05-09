import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../app/userSlice";
import "./login.css";

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
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  return (
    <main>
      <div className="content-container">
        <h1>Welcome</h1>
        <div className="login-form">
          <form onSubmit={submit}>
            <div className="login-form-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-form-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
