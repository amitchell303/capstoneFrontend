import "../../App.css";

const EditVehicleForm = () => {
  return (
    <div>
      <h1>Edit Vehicle</h1>
      <form>
        <div className="form-group">
          <label htmlFor="vin">VIN</label>
          <input type="text" id="vin" placeholder="vin number" disabled />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVehicleForm;
