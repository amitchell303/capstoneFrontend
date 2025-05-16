import "../../styling/forms.css";

const EditVehicleForm = () => {
  return (
    <div className="content-container">
      <h1>Edit Vehicle</h1>
      <div className="glassmorphism-container">
        <form className="allForms">
          <div className="section-1">
            <div className="allForms-group">
              <label htmlFor="vin">Nickname</label>
              <input type="text" id="vin" placeholder="Nickname (Optional)" />
            </div>
          </div>
          <div className="section-2">
            <div className="allForms-group">
              <label htmlFor="vin">VIN</label>
              <input type="text" id="vin" placeholder="vin number" disabled />
            </div>
            <div className="allForms-group">
              <label htmlFor="vin">Plate Number</label>
              <input
                type="text"
                id="vin"
                placeholder="Plate number (Optional)"
              />
            </div>
          </div>
          <div className="section-3">
            <div className="allForms-group">
              <label htmlFor="vin">Make</label>
              <input type="text" id="vin" placeholder="vin number" disabled />
            </div>
            <div className="allForms-group">
              <label htmlFor="vin">Model</label>
              <input type="text" id="vin" placeholder="vin number" disabled />
            </div>
            <div className="allForms-group">
              <label htmlFor="vin">Year</label>
              <input type="text" id="vin" placeholder="vin number" disabled />
            </div>
          </div>
          <div className="section-4">
            <div className="allForms-group">
              <label htmlFor="vin">Current Mileage</label>
              <input type="text" id="vin" placeholder="Mileage (Required)" />
            </div>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleForm;
