import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetMyCarsQuery } from "../app/carSlice"; //make Slice file for cars
import { useUpdateUserMutation, useDeleteUserMutation } from "../app/userSlice";
import EmptyGarage from "../components/garageViews/EmptyGarage";
import AllVehicles from "../pages/Garage.jsx";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //const { data, error, isLoading } = useGetAllUsersQuery();
  const { data, error, isLoading } = useGetMyCarsQuery(); //create to grab all of user's cars
  const [updateAUser] = useUpdateUserMutation();
  const [deleteAUser] = useDeleteUserMutation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (data) {
        setCars(data);
        console.log(data);
      }
    }
  }, [token, navigate, data]);

  async function updateUser(id) {
    const response = await updateAUser({ id });
    console.log(response);
  }
  async function deleteUser(id, firstname, lastname, email, password) {
    const response = await updateAUser({
      userId: id,
      firstname,
      lastname,
      email,
      password,
      activated: false,
      deactivatedOn: new Date(),
    });
    console.log(response);
  }

  if (!token) {
    return (
      <main id="homePage">
        <div className="page">
          <h1>
            Please <NavLink to="/login">Sign-in</NavLink> or{" "}
            <NavLink to="/register">Register</NavLink>.
          </h1>
        </div>
      </main>
    );
  }
  if (isLoading) {
    return (
      <main id="homePage">
        <div className="page">
          <div>Loading...</div>
        </div>
      </main>
    );
  }
  // if (error) {
  //   return (
  //     <main id="homePage">
  //       <div className="page">
  //         <div>Error fetching Vehicles: {error.message}</div>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="content-container">
      <main>{cars.length > 0 ? <AllVehicles /> : <EmptyGarage />}</main>
    </div>
  );
}

export default Home;

/* Bridge project Users List */
{
  /* <ol>
  {users.length > 0 ? (
    users.map((user) => (
      <li key={user.id}>
        <label onClick={() => navigate(`/user/${user.id}`)}>
          {user.firstname} {user.lastname}{" "}
        </label>
        <button onClick={() => updateUser(user.id)}>update</button>
        <button
          onClick={() =>
            deleteUser(
              user.id,
              user.firstname,
              user.lastname,
              user.email,
              user.password
            )
          }
        >
          delete
        </button>
      </li>
    ))
  ) : (
    <li>No users found</li>
  )}
</ol> */
}

/* Specific/Single Vehicle Dashboard Bento */
{
  /* <div className="content-container">
      <div className="dashboard">
        <main>
          <h1>My Garage</h1>
          <div className="sect-container">
            <section>
              <h2>Vehicle Info</h2>
            </section>
            <section>
              <h2>Maintenance log</h2>
            </section>
            <section>
              <h2> Notes</h2>
            </section>
            <section>
              <h2>Reminders</h2>
            </section>
          </div>
        </main>
      </div>
    </div> */
}
