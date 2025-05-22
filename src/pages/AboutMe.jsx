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
  const [isNewPassword, setIsNewPassword] = useState(false);
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
      street,
      city,
      state,
      postal,
    };
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      navigate("/");
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
  async function handleNewPassword(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        console.log("No token found, redirecting to login.");
      } else {
        const userId = me.user.id;
        const response = await update({ userId, password }).unwrap();
        if (response) {
          alert("User updated successfully!");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch (error) {
      console.error("Failed to change user password:", error);
      alert("Failed to change password.");
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (isUpdating) {
    if (firstname == "") {
      setFirstname(me.user.firstname);
      setLastname(me.user.lastname);
      setEmail(me.user.email);
      setStreet(me.user.street);
      setCity(me.user.city);
      setState(me.user.state);
      setPostal(me.user.postal);
    }

    return (
      <div className="content-container">
        <h1>Update Account</h1>
        <div className="glassmorphism-container">
          <button
            className="EAF-close-icon"
            type="button"
            onClick={() => setIsUpdating(false)}
          >
            <span className="material-symbols-outlined">close_small</span>
          </button>
          <form className="allForms" onSubmit={handleUpdateUser}>
            <div className="EAF-section-1">
              <div className="allForms-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="allForms-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="EAF-section-4">
              <div className="allForms-group">
                <label>Street Address</label>
                <input
                  type="text"
                  placeholder="Enter Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
            <div className="EAF-section-5">
              <div className="allForms-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="allForms-group">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="allForms-group">
                <label>Postal</label>
                <input
                  type="text"
                  placeholder="Zipcode"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="EAF-section-6"> */}
            <button className="EAF-update-btn" type="submit">
              Update
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    );
  }
  if (isNewPassword) {
    return (
      <div className="content-container">
        <h1>Change Password</h1>
        <div className="glassmorphism-container">
          <button
            className="EAF-close-icon"
            type="button"
            onClick={() => setIsNewPassword(false)}
          >
            <span className="material-symbols-outlined">close_small</span>
          </button>
          <form className="allForms" onSubmit={handleNewPassword}>
            <div className="allForms-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="allForms-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !password || password !== confirmPassword}
            >
              {isLoading ? "Adding..." : "Add Vehicle"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h1>My Account </h1>
      <div className="glassmorphism-container">
        <main className="acctPage">
          <section className="acctPage-section-1">
            <div className="acctPage-1a">
              <h2>
                {me.user.firstname} {me.user.lastname}
              </h2>
            </div>
            <div className="acctPage-1b">
              <p>Email: {me.user.email}</p>
              <p>Street Address:{me.user.street}</p>
              <p>City: {me.user.city}</p>
              <p>State:{me.user.state}</p>
              <p>Zip:{me.user.postal}</p>
            </div>
          </section>
          <section className="acctPage-section-2">
            <button
              className="update-btn"
              type="button"
              onClick={() => setIsUpdating(true)}
            >
              <span className="material-symbols-outlined">manage_accounts</span>
            </button>
            <button
              className="password-btn"
              type="button"
              onClick={() => setIsNewPassword(true)}
            >
              {/* <span className="material-symbols-outlined">change_password</span> */}
              <span class="material-symbols-outlined">password</span>
            </button>
            <button
              className="delete-btn"
              type="button"
              onClick={handleDeleteUser}
            >
              <span className="material-symbols-outlined">delete_forever</span>
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
