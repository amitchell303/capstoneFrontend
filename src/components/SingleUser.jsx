import React, { useEffect } from "react"; // Import useEffect
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} from "./userSlice";
import { data, useNavigate, useParams } from "react-router-dom";

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
  
   
  
  async function handleUpdateUser() {
    const updatedData = { firstname, lastname, email, password };
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      console.log("No token found, redirecting to login.");
    }else{ 
    try {
     const response = await update({ id, ...updatedData }).unwrap();
     if (response){
      alert("User updated successfully!");
     }
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user.");
    }
  }
}
  async function handleDeleteUser(user) {
    try {
      await deleteUser(user).unwrap();
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
 
  if (isSuccess && user) {
    return (
      <div className="selectedUser">
        <div> 
        <h1>User Details</h1>
        </div>
        <div>
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Id: {user.id}</p>
      </div>        
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
        <ul>
          {user?.map((user) => {
            <div key={user.id}>
              <li>{user.firstname}</li>
              <li>{user.lastname}</li>
              <li>{user.email}</li>

            </div>
          })}
        </ul>
      </div>
    );
  }
  
}
