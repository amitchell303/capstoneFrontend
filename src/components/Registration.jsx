import { useState } from "react";
import { useRegisterUserMutation } from "../app/userSlice";
import "../App.css";

function Registration() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser] = useRegisterUserMutation();

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
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main>
        <div className="page">
          <h1>Registration</h1>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                value={firstname}
                placeholder="First Name"
                onChange={(ev) => setFirstName(ev.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                value={lastname}
                placeholder="Last Name"
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                placeholder="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                placeholder="password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <button
              className="formBtn"
              type="submit"
              disabled={!email || !password}
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Registration;
