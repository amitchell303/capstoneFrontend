import "../../styling/forms.css";

const EditVehicleForm = ({ car }) => {
  return (
    <div className="content-container">
      <h1>Edit Vehicle</h1>
      <form className="allForms">
        <div className="section-1">
          <div className="allForms-group">
            <label>Nickname</label>
            <input type="text" id="vin" placeholder="Nickname (optional)" />
          </div>
        </div>
        <div className="section-2">
          <div className="allForms-group">
            <label>VIN</label>
            <input type="text" placeholder={car.vin} disabled />
          </div>
          <div className="allForms-group">
            <label>Plate Number</label>
            <input type="text" id="vin" placeholder="Plate number (optional)" />
          </div>
        </div>
        <div className="section-3">
          <div className="allForms-group">
            <label>Make</label>
            <input type="text" placeholder={car.make} disabled />
          </div>
          <div className="allForms-group">
            <label>Model</label>
            <input type="text" placeholder={car.model} disabled />
          </div>
          <div className="allForms-group">
            <label>Year</label>
            <input type="text" placeholder={car.modelYear} disabled />
          </div>
        </div>
        <div className="section-4">
          <div className="allForms-group">
            <label>Current Mileage*</label>
            <input type="text" id="vin" placeholder="Mileage (required)" />
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVehicleForm;
