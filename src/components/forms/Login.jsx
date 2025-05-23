import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../app/userSlice";
import "../../styling/landing.css";
import "../../styling/forms.css";

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
    <main className="modal">
      <h1>Welcome</h1>
      <form className="allForms" onSubmit={submit}>
        <div className="allForms-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="allForms-group">
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
  );
}

export default Login;
