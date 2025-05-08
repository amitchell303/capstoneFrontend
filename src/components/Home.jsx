import { GridBackground } from "../assets/grid";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { useGetAllUsersQuery } from "../app/userSlice";
import { useGetMyCarsQuery } from "../app/carSlice"; //make Slice file for cars
import { useUpdateUserMutation, useDeleteUserMutation } from "../app/userSlice";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //const { data, error, isLoading } = useGetAllUsersQuery();
  const { data, error, isLoading } = useGetMyCarsQuery(); //create to grab all of user's cars
  const [updateAUser] = useUpdateUserMutation();
  const [deleteAUser] = useDeleteUserMutation();
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (data) {
        setCars(data);
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
        <GridBackground />
        <div className="page">
          <h1>
            Please <NavLink to="/login">Sign-in</NavLink> or{" "}
            <NavLink to="/register">Register</NavLink> to view users.
          </h1>
        </div>
      </main>
    );
  }
  if (isLoading) {
    return (
      <main id="homePage">
        <GridBackground />
        <div className="page">
          <div>Loading...</div>
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <main id="homePage">
        <GridBackground />
        <div className="page">
          <div>Error fetching users: {error.message}</div>
        </div>
      </main>
    );
  }
  return (
    <main id="homePage">
      <GridBackground />
      <div className="page">
        <h1>H O M E</h1>
        {/* <ol>
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
        </ol> */}
        <div>
          <div>
            <ul>
              {cars.map((car) => (
                <li key={car.id}>
                  <label>{car.name}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <section>
              <h3>Car Details</h3>
            </section>
            <section>
              <h3>Appointments</h3>
            </section>
          </div>
          <div>
            <section>
              <h3>Maintainence Log</h3>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
