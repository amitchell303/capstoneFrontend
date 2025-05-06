import { GridBackground } from "../assets/grid";
import { NavLink } from "react-router-dom";
import { getToken } from "../app/tokenService";
import { user } from "./SingleUser";
import "../App.css";

function Home() {
  const token = getToken();

  return (
    <>
      <GridBackground />
      <div className="homePage">
        {token === null ? (
          <h1>
            Please <NavLink to="/login">Sign-in</NavLink> or{" "}
            <NavLink to="/register">Register</NavLink> to view users.
          </h1>
        ) : (
          <></>
          // if signed in, home page will return account info and list of users
        )}
      </div>
    </>
  );
}

export default Home;
