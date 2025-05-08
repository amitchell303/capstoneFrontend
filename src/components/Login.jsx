// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../app/librarySlice";
// import { useState } from "react";

// export default function Login() {
//   const [response, setResponse] = useState();
//   const navigate = useNavigate();

//   const [login] = useLoginMutation();

//   // Stores data from login form
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // Updates formData whenever input field changes
//   const update = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Submit login request
//   const submit = async (e) => {
//     try {
//       e.preventDefault();

//       const response = await login(formData);
//       setResponse(response);

//       // if login success return to home
//       if (response?.data) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <main>
//       <GridBackground />
//       <div className="content-container">
//         <form onSubmit={submit}>
//           {/* <!-- Email input --> */}
//           <div className="form-floating mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="floatingInput-login-email"
//               placeholder="name@example.com"
//               name="email"
//               onChange={update}
//             />
//             <label htmlFor="floatingInput-login-email">Email</label>
//           </div>
//           {/* <!-- Password input --> */}
//           <div className="form-floating mb-3">
//             <input
//               type="password"
//               className="form-control"
//               id="floatingInput-login-password"
//               placeholder="Password"
//               name="password"
//               onChange={update}
//             />
//             <label htmlFor="floatingInput-login-password">Password</label>
//           </div>
//           <button type="submit">Sign In</button>
//         </form>
//       </div>
//     </main>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../app/userSlice";
import { GridBackground } from "../assets/grid";
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
      <GridBackground />
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
