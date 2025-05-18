export default function VehicleDetails() {
  return (
    <div className="content-container">
      <div className="glassmorphism-container">
        <div className="vehicleDetails">
          <section className="vd-section-1">
            <div className="vs-1-general">
              <h3>General Information</h3>
              <p>Year: </p>
              <p>Make: </p>
              <p>Model: </p>
              <p>Submodel: </p>
              <p>Drive Type: </p>
              <p>Vin Number: </p>
            </div>
            {/* <img src="" alt="" /> */}
          </section>
          <section className="vd-section-2">
            <div className="performance-container">
              <article className="performance-1">
                <h3>Speed</h3>
                <p>Charge System:</p>
                <p>Cylinder Alignment:</p>
              </article>
              <article className="performance-2">
                <h3>MPG</h3>
                <p>Charge System:</p>
                <p>Cylinder Alignment:</p>
              </article>
              <article className="performance-3">
                <h3>Tow Capacity</h3>
                <p>Charge System:</p>
                <p>Cylinder Alignment:</p>
              </article>
            </div>
          </section>
          <section className="vd-section-3">
            <h3>Engine</h3>
            <div className="engine-container">
              <article>
                <p>Manufactuer:</p>
                <p>Engine Type:</p>
                <p>Horsepower:</p>
                <p>Torque:</p>
                <p>Charge System:</p>
              </article>
              <article>
                {" "}
                <p>Fuel System:</p>
                <p>Fuel Type: </p>
                <p>Fuel Capacity:</p>
                <p>Emission Control:</p>
              </article>
              <article>
                {" "}
                <p>Cylinder Alignment:</p>
                <p>Valves per Cylinder:</p>
                <p>Valve Timing:</p>
                <p>Displacement:</p>
                <p>Bore:</p>
                <p>Stroke:</p>
                <p>Compression Ratio:</p>
              </article>
              <article>
                {" "}
                <p>Oil Type:</p>
                <p>Oil capacity</p>
                <p>Coolant Capacity:</p>
                <p>Battery Capacity(Ah):</p>
                <p>Tires:</p>
                <p>Suspension:</p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
