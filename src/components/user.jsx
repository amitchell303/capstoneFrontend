import React from "react";
import { useAboutMeQuery } from "./userSlice";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { isSuccess, isLoading, data: user } = useAboutMeQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>User isLoading</p>;
  }
  if (!isSuccess) {
    return alert("Please login to view user account");
    navigate("/login");
  }
  console.log(user);
  async function had(params) {}

  return <div>sigleUser</div>;
}