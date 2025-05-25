// This page displays all of the User's vehicles

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../../app/carSlice";
import { BiSolidCarGarage, BiSolidBook } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "../../App.css";
import "../../styling/Carousel.css";

export default function AllVehicles() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, error, isLoading } = useGetMyCarsQuery();
  const [cars, setCars] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

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

  const prev = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === 0 ? cars.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === cars.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!cars || cars.length === 0) {
    return <p>No cars available</p>;
  }
  const prevIndex = currIndex === 0 ? cars.length - 1 : currIndex - 1;
  const nextIndex = currIndex === cars.length - 1 ? 0 : currIndex + 1;
  const visibleCars = [
    { car: cars[prevIndex], position: "prev" },
    { car: cars[currIndex], position: "active" },
    { car: cars[nextIndex], position: "next" },
  ];

  return (
    <div className="content-container">
      <div className="allVehicles-sect-1">
        <h1>My Vehicles</h1>
        <Link to="/addVehicle" className="addVehcile-btn">
          <span className="material-symbols-outlined">add_2</span>
        </Link>
      </div>
      <div className="carousel-container">
        <div className="carousel">
          {visibleCars.map(({ car, position }) => (
            <article key={car.vin} className={`card ${position}`}>
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
      <div>
        <button className="carousel-btn prev" onClick={prev}>
          ‹
        </button>
        <button className="carousel-btn next" onClick={next}>
          ›
        </button>
      </div>
      {/* <div className="card-list">
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
      </div> */}
    </div>
  );
}
