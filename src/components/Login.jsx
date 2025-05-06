import { useState } from "react";
import { useLoginUserMutation } from "./userSlice";
import { GridBackground } from "../assets/grid";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginUserMutation();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log("response: ", response);

      // stores login credentials
      localStorage.setItem("token", response.data.token);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  return (
    <main>
      <GridBackground />
      <div className="content-container">
        <h1>Welcome</h1>
        {/* <div className="login-form"> */}
        <form onSubmit={submit}>
          <div className="login-form-field">
            <label>Email</label>
            <input
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form-field">
            <label>Password</label>
            <input
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            Login
          </button>
        </form>
        {/* </div> */}
      </div>
    </main>
  );
}

export default Login;
