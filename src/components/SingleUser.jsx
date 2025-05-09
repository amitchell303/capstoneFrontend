import React, { useEffect } from "react"; // Import useEffect
import { useGetUserQuery } from "../app/userSlice";
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
  console.log(user);

  if (isLoading) {
    return <p>User is Loading</p>;
  }

  if (isError) {
    console.error("Error fetching user:", getUserError);
    return <p>Error loading user data. Please try again later.</p>;
  }

  // Only render details if fetching was successful and user data exists

  return (
    <div>
      <div>
        <h1>User Details</h1>
      </div>
      <div>
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Id: {user.id}</p>
      </div>
    </div>
  );
}
