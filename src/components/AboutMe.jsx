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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");

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
    <div className="accountPage">
      <table>
        <tbody>
          <tr>
            <td className="Width40">
              <section id="accountDetails">
                <h1>A C C O U N T :</h1>
                <div>
                  <p>First Name: {me.user.firstname}</p>
                  <p>Last Name: {me.user.lastname}</p>
                  <p>Email: {me.user.email}</p>
                </div>
              </section>
            </td>
            <td className="Width60">
            <h1>U P D A T E</h1>
              <form className="updateUserForm" onSubmit={handleUpdateUser}>
                <label>First name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label>New Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>New Password </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Confirm New Passsword</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                <button
                  className="submitt-button"
                  type="submit"
                  value="Update User"
                >
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="update-user">
        <button
          className="update-btn"
          type="submit"
          disabled={password && confirmPassword && password !== confirmPassword}
        >
          Update
        </button>
      </form>
      <button type="button" onClick={handleDeleteUser} className="delete-btn">
        Delete Account
      </button>
    </div>
  );
}
