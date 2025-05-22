// This page displays all of the User's vehicles

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../app/carSlice"; //make Slice file for cars
import { BiSolidCarGarage, BiSolidBook } from "react-icons/bi";
import { NavLink } from "react-router-dom";
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
      <h1>My Vehicles</h1>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  display="block"
                  id="Heart"
                >
                  <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                </svg>
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
