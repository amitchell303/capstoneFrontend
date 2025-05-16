import "../../styling/forms.css";

const EditVehicleForm = () => {
  return (
    <div className="content-container">
      <h1>Edit Vehicle</h1>
      <div className="glassmorphism-container">
        <form className="allForms">
          <div className="allForms-group">
            <label htmlFor="vin">VIN</label>
            <input type="text" id="vin" placeholder="vin number" />
          </div>
          <div className="allForms-group">
            <label htmlFor="vin">Make</label>
            <input type="text" id="vin" placeholder="vin number" />
          </div>
          <div className="allForms-group">
            <label htmlFor="vin">Model</label>
            <input type="text" id="vin" placeholder="vin number" />
          </div>
          <div className="allForms-group">
            <label htmlFor="vin">Year</label>
            <input type="text" id="vin" placeholder="vin number" />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleForm;
