// This page displays all of the User's vehicles

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../app/carSlice"; //make Slice file for cars
import "../App.css";

export default function AllVehicles() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, error, isLoading } = useGetMyCarsQuery();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      if (data) {
        setCars(data);
        console.log(data);
      }
    }
  }, [token, navigate, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <div className="allVehicles-sect-1">
        <h1>My Vehicles</h1>
        <Link to="/addVehicle" className="addVehcile-btn">
          <span className="material-symbols-outlined">add_2</span>
        </Link>
      </div>
      <div className="card-list">
        {cars.map((car) => (
          <article className="card" key={car.vin}>
            <figure className="card-image">
              <img src={car.carImg} alt={`${car.make} ${car.model}`} />
            </figure>
            <div className="card-header">
              <div>
                <Link to={`/vehicles/${car.vin}`}>
                  {car.carName || `${car.make} ${car.model}`}
                </Link>
                <p>
                  {car.modelYear} {car.make} {car.model}{" "}
                </p>
              </div>
              <button className="icon-button">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="card-footer">
              <p>{car.vin}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
