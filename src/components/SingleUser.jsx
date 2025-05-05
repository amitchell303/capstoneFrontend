import React, { useEffect } from "react"; // Import useEffect
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} from "./userSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error: getUserError,
  } = useGetUserQuery(id);

  const [update] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  console.log(user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  async function handleUpdateUser() {
    const updatedData = { firstname, lastname, email, password };
    try {
      await update({ id, ...updatedData }).unwrap();
      alert("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user.");
    }
  }

  async function handleDeleteUser() {
    try {
      await deleteUser(id).unwrap();
      alert("User deleted Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user.");
    }
  }

  // --- Render Logic ---

  if (isLoading) {
    return <p>User is Loading</p>;
  }

  if (isError) {
    console.error("Error fetching user:", getUserError);
    return <p>Error loading user data. Please try again later.</p>;
  }

  // Only render details if fetching was successful and user data exists
  let $details = <p>User not found.</p>;
  if (isSuccess && user) {
    $details = (
      <div className="aboutMe">
        <h3>
          Name: "{user.firstname} {user.lastname}"
        </h3>
        <h4>Id: #{user.id}</h4>
        <h5>Email: {user.email}</h5>
        <div className="update-user">
          <button
            className="update-button"
            type="submit"
            onClick={handleUpdateUser}
          >
            Update
          </button>
        </div>
        <div className="delete-user">
          <button
            className="delete-button"
            type="button"
            onClick={handleDeleteUser}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <aside>
        <h2>Selected User</h2>
        {$details}
      </aside>
    </>
  );
}
