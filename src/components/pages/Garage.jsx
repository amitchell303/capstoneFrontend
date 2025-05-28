// This page displays all of the User's vehicles
import { IoPeopleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../../app/carSlice";
import { useGetSharedCarsQuery } from "../../app/sharedVehiclesSlice";
import { useAboutMeQuery } from "../../app/userSlice";
import { MdSpeed } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "../../App.css";
import "../../styling/Carousel.css";

export default function AllVehicles() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data, error, isLoading } = useGetMyCarsQuery();
  // const { data: sharedCars } = useGetSharedCarsQuery();
  const { data: me } = useAboutMeQuery();
  const userId = me?.user?.id;
  const { data: sharedCars } = useGetSharedCarsQuery({
    userId: userId,
  });
  const [cars, setCars] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      if (data) {
        setCars(data);
      }
    }
  }, [token, navigate, data]);
  useEffect(() => {
    if (me) {
      // console.log("me: ", me);
    }
  }, [me]);
  useEffect(() => {
    if (sharedCars) {
      // console.log("shared: ", sharedCars.data);
      const mergedArray = data.concat(sharedCars.data);
      setCars(mergedArray);
    }
  }, [sharedCars]);

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
      {cars.length > 3 ? (
        <>
          <div className="carousel-container">
            <div className="carousel">
              {visibleCars.map(({ car, position }) => (
                <article key={car.vin} className={`card ${position}`}>
                  <figure className="card-image">
                    <img
                      src={car.carImg || "/missingcarimg.png"}
                      alt={`${car.make} ${car.model}`}
                    />
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
                    {sharedCars?.data.some((c) => c.vin === car.vin) ? (
                      <IoPeopleOutline className="icon-button"></IoPeopleOutline>
                    ) : (
                      <Link
                        to="/updateMileage"
                        state={{ car }}
                        className="icon-button"
                      >
                        <MdSpeed />
                      </Link>
                    )}
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
        </>
      ) : (
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

                <Link to={`/updateMileage`} className="icon-button">
                  <MdSpeed />
                </Link>
              </div>
              <div className="card-footer">
                <p>{car.vin}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
