import ComingSoon from "./ComingSoon";

export default function VehicleDetails({ car }) {
  if (!car) return <p>Loading vehicle details...</p>;

  return (
    <div className="vehicleDetails">
      <div className="comingSoon">
        <ComingSoon />
      </div>
    </div>

    // WIP- NEED API THAT PROVIDES LISTED FIELDS
    // <div className="vehicleDetails">
    //   <section className="vd-section-1">
    //       <div className="vd-1-general">
    //         <h3>General Information</h3>
    //         <p>Year: {car.modelYear}</p>
    //         <p>Make: {car.make}</p>
    //         <p>Model: {car.model}</p>
    //         <p>Drive Type: {car.driveType}</p>
    //         <p>VIN Number: {car.vin}</p>
    //         <p>Mileage: {car.mileage}</p>
    //       </div>
    //       <img src={car.carImg} alt={`${car.make} ${car.model}`} />
    //     </section>
    //     <section className="vd-section-2">
    //       <div className="performance-container">
    //         <article className="performance-1">
    //           <h3>Speed</h3>
    //           <p>Top Speed:</p>
    //           <p>0-60mph:</p>
    //         </article>
    //         <article className="performance-2">
    //           <h3>MPG</h3>
    //           <p>Highway: {car.mpgHighway}</p>
    //           <p>City: {car.mpgCity}</p>
    //         </article>
    //         <article className="performance-3">
    //           <h3>Tow Capacity</h3>
    //           <p>Charge System:</p>
    //         </article>
    //       </div>
    //     </section>
    //     <section className="vd-section-3">
    //       <details name="accordian-details">
    //         <summary>Engine</summary>
    //         <div className="engine-container">
    //           <div className="engine-details">
    //             <p>Manufacturer: {car.engineManufacturer}</p>
    //             <p>Engine Type: {car.engineType}</p>
    //             <p>Horsepower: {car.horsepower}</p>
    //             <p>Torque: {car.torque}</p>
    //             <p>Charge System: {car.chargeSystem}</p>
    //           </div>
    //           <div className="engine-details">
    //             <p>Fuel System: {car.fuelSystem}</p>
    //             <p>Fuel Type: {car.fuelType}</p>
    //             <p>Fuel Capacity: {car.fuelCapacity}</p>
    //             <p>Emission Control: {car.emissionControl}</p>
    //           </div>
    //           <div className="engine-details">
    //             <p>Displacement: {car.displacement}</p>
    //             <p>Compression Ratio: {car.compressionRatio}</p>
    //           </div>
    //           <div className="engine-details">
    //             <p>Oil Type: {car.oilType}</p>
    //             <p>Oil Capacity: {car.oilCapacity}</p>
    //             <p>Coolant Capacity: {car.coolantCapacity}</p>
    //             <p>Tires: {car.tires}</p>
    //             <p>Suspension: {car.suspension}</p>
    //           </div>
    //         </div>
    //       </details>
    //       <details name="accordian-details">
    //         <summary>Transmission</summary>
    //         <div className="engine-container">
    //           <div className="engine-details">
    //             <p>Body Class: {car.bodyClass}</p>
    //             <p>Engine Type: {car.engineType}</p>
    //             <p>Horsepower: {car.horsepower}</p>
    //             <p>Torque: {car.torque}</p>
    //           </div>
    //           <div className="engine-details">
    //             <p>Fuel System: {car.fuelSystem}</p>
    //             <p>Fuel Type: {car.fuelType}</p>
    //             <p>Fuel Capacity: {car.fuelCapacity}</p>
    //             <p>Emission Control: {car.emissionControl}</p>
    //           </div>
    //           <div className="engine-details">
    //             <p>Cylinder Alignment: {car.cylinderAlignment}</p>
    //             <p>Valves per Cylinder: {car.valvesPerCylinder}</p>
    //             <p>Valve Timing: {car.valveTiming}</p>
    //             <p>Valve Timing: {car.valveTiming}</p>
    //           </div>
    //         </div>
    //       </details>
    //       <details name="accordian-details">
    //         <summary>Dimensions/Body</summary>
    //         <div className="engine-details">
    //           <p>Body Class: {car.bodyClass}</p>
    //           <p>Engine Type: {car.engineType}</p>
    //           <p>Horsepower: {car.horsepower}</p>
    //           <p>Torque: {car.torque}</p>
    //           <p>Charge System: {car.chargeSystem}</p>
    //         </div>
    //       </details>
    //     </section>
    // </div>
  );
}
