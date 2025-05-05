import { useState } from "react";
import { useLoginUserMutation } from "./userSlice";
import "../App.css";

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
    <>
      <main>
        <div className="content-container">
          <h1>Login</h1>
          {/* <div className="login-form"> */}
          <form onSubmit={submit}>
            <div className="login-form-content">
              <label>Email</label>
              <input
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-form-content">
              <label>Password</label>
              <input
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-formBtn" type="submit">
              Login
            </button>
          </form>
          {/* </div> */}
        </div>
      </main>
    </>
  );
}

export default Login;
