import { NavLink } from "react-router-dom";
// import { useEffect } from "react";
// import "../App.css";
import "../landing.css";

export default function Landing() {
  //   const navigate = useNavigate();
  //   const token = localStorage.getItem("token");

  //   useEffect(() => {
  //     if (!token) {
  //       navigate("/login");
  //     } else {
  //       if (data) {
  //         setCars(data);
  //         console.log(cars);
  //       }
  //     }
  //   }, [token, navigate, data]);

  //   if (!token) {
  //     return (
  //       <main id="homePage">
  //         <div className="page">
  //           <h1>
  //             Please <NavLink to="/login">Sign-in</NavLink> or{" "}
  //             <NavLink to="/register">Register</NavLink>.
  //           </h1>
  //         </div>
  //       </main>
  //     );
  //   }

  //   if (isLoading) {
  //     return (
  //       <main id="homePage">
  //         <div className="page">
  //           <div>Loading...</div>
  //         </div>
  //       </main>
  //     );
  //   }

  return (
    <div className="landingPage">
      <div className="text-content">
        <h1 className="title">MyMoto</h1>
        <h2>
          Please <NavLink to="/login">Sign-in</NavLink> or{" "}
          <NavLink to="/register">Register</NavLink>.
        </h2>
      </div>
      <div className="animation">
        <img src="src/components/assets/bmwbkgd.jpg" alt="BMW" />
      </div>
    </div>
  );
}
