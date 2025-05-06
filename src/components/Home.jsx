import { GridBackground } from "../assets/grid";
import { NavLink } from "react-router-dom";
import "../App.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "./userSlice";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data, error, isLoading } = useGetAllUsersQuery();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (data) {
        setUsers(data);
      }
    }
  }, [token, navigate, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }
  return (
    <>
      <main id="homePage">
        <GridBackground />
        <div className="homePage">
          <h1>
            Please <NavLink to="/login">Sign-in</NavLink> or{" "}
            <NavLink to="/register">Register</NavLink> to view users.
          </h1>
        </div>
        <div className="page">
          <h1>U S E R S</h1>
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>
                  {user.firstname} {user.lastname}{" "}
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Home;
