import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../app/userSlice";
import "../../styling/landing.css";

function Registration() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    console.log("First Name: ", firstname);
    console.log(", Last Name: ", lastname);
    console.log(", Email: ", email);
    console.log(", Password: ", password);
    try {
      const response = await addUser({
        firstname,
        lastname,
        email,
        password,
      }).unwrap();
      try {
        localStorage.setItem("token", response.token);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        navigate("/home");
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="modal">
      <h1>Register</h1>
      <form className="allForms" onSubmit={submit}>
        <div className="allForms-group">
          <label>First Name</label>
          <input
            value={firstname}
            placeholder="First Name"
            onChange={(ev) => setFirstName(ev.target.value)}
          />
        </div>
        <div className="allForms-group">
          <label>Last Name</label>
          <input
            value={lastname}
            placeholder="Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
          />
        </div>
        <div className="allForms-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div className="allForms-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div className="allForms-group">
          <label>Confirm Passsword</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={
            !email ||
            !password ||
            (password && confirmPassword && password !== confirmPassword)
          }
        >
          Register
        </button>
      </form>
    </main>
  );
}

export default Registration;
