import { GridBackground } from "../assets/grid";
import { NavLink } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <>
      <GridBackground />
      <div className="homePage">
        <h1>
          Please <NavLink to="/login">Sign-in</NavLink> or{" "}
          <NavLink to="/register">Register</NavLink> to view users.
        </h1>
      </div>
    </>
  );
}

export default Home;
