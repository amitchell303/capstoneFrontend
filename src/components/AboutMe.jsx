import { useParams } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import "../styling/forms.css";
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
  const [isUpdating, setIsUpdating] = useState(false);
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
    const updatedData = {
      firstname,
      lastname,
      email,
      password,
      street,
      city,
      state,
      postal,
    };
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      navigate("/login");
      console.log("No token found, redirecting to login.");
    } else {
      console.log(updatedData);
      try {
        const userId = me.user.id;
        // console.log(userId);
        if (postal !== undefined || null) {
          updatedData.postal = parseInt(postal, 10);
        }
        const response = await update({ userId, ...updatedData }).unwrap();
        if (response) {
          alert("User updated successfully!");
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setStreet("");
          setCity("");
          setState("");
          setPostal("");
          setIsUpdating(false);
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
  if (isUpdating) {
    return (
      // <div className="Updatepage">
      <div className="glassmorphism-container">
        <button
          className="closeBtn"
          type="button"
          onClick={() => setIsUpdating(false)}
        >
          close
        </button>
        <h1>Update Info</h1>
        <form className="allForms" onSubmit={handleUpdateUser}>
          <div className="EAF-section-1">
            <div className="allForms-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={me.user.firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={me.user.lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="EAF-section-2">
            <div className="allForms-group">
              <label>New Email</label>
              <input
                type="email"
                placeholder="Email"
                value={me.user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>Confirm New Email</label>
              <input
                type="email"
                placeholder="Confirm Email"
                value={""}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="EAF-section-3">
            <div className="allForms-group">
              <label>New Password </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="EAF-section-4">
            <div className="allForms-group">
              <label>Street</label>
              <input
                type="text"
                placeholder="Enter Street"
                value={me.user.street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={me.user.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                value={me.user.state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>Postal</label>
              <input
                type="text"
                placeholder="Zipcode"
                value={me.user.postal}
                onChange={(e) => setPostal(e.target.value)}
              />
            </div>
          </div>

          <button
            className="update-btn"
            type="submit"
            disabled={
              password && confirmPassword && password !== confirmPassword
            }
          >
            Update
          </button>
        </form>
      </div>
      // </div>
    );
  }

  return (
    <div className="content-container">
      <div className="accountPage">
        <section id="accountDetails">
          <h1>My Account </h1>
          <div>
            <p>
              Name: {me.user.firstname} {me.user.lastname}
            </p>
            <p>Email: {me.user.email}</p>
            <p>Address:</p>
            <p>{me.user.street}</p>
            <p>
              {me.user.city}, {me.user.state}
            </p>
            <p>{me.user.postal}</p>
          </div>
        </section>
      </div>
      <div className="userFeatures">
        <ul>
          <li>
            <button
              className="update-btn"
              type="button"
              onClick={() => setIsUpdating(true)}
            >
              Update
            </button>
          </li>
          <li>
            <button
              className="delete-btn"
              type="button"
              onClick={handleDeleteUser}
            >
              Delete Account
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
