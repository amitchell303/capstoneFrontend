import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../app/carSlice"; //make Slice file for cars
import "../App.css";

export default function AllVehicles() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, error, isLoading } = useGetMyCarsQuery(); //create to grab all of user's cars
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (data) {
        setCars(data);
        console.log(cars);
      }
    }
  }, [token, navigate, data]);

  if (isLoading) {
    return (
      <main id="homePage">
        <div className="page">
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <div className="content-container">
      <div className="allVehicles">
        <h3>My Vehicles</h3>
        <div className="vehicleCard-container">
          {cars.map((car) => (
            <div className="vehicleCard">
              <section key={car.id}>
                <img src={car.carImg} alt={`${car.make} ${car.model}`} />
                <h1>Car Name</h1>
                <p>
                  {car.modelYear} {car.make} {car.model}
                </p>
                <p>{car.vin}</p>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
