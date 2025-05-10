import { useParams } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import {
  useAboutMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../app/userSlice";

export default function AboutMe() {
  const { error, isLoading, data: me } = useAboutMeQuery();
  const [update] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (me) {
    console.log(me);
  }
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUpdateUser(e) {
    e.preventDefault();
    const updatedData = { firstname, lastname, email, password };
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
      console.log("No token found, redirecting to login.");
    } else {
      console.log(updatedData);
      try {
        const userId = me.user.id;
        console.log(userId);
        const response = await update({ userId, ...updatedData }).unwrap();
        if (response) {
          alert("User updated successfully!");
        }
      } catch (error) {
        console.error("Failed to update user:", error);
        alert("Failed to update user.");
      }
    }
  }
  async function handleDeleteUser() {
    try {
      await deleteUser().unwrap();
      alert("User deleted Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user.");
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h2>My Details:</h2>
      <p>First Name: {me.user.firstname}</p>
      <p>Last Name: {me.user.lastname}</p>
      <p>Email: {me.user.email}</p>
      <div>
        <form onSubmit={handleUpdateUser}>
          <button type="submit" value="Update User">
            {" "}
            Submit{" "}
          </button>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button type="button" onClick={handleDeleteUser}>
          Delete
        </button>
      </div>
    </div>
  );
}
