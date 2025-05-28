import React from "react";

export default function MaintSumm() {
  return (
    <main className="garage-modal">
      <div className="glassmorphism-container">
        <h1>Add Service</h1>
        <div className="maintenance-addMaint">
          <form className="allForms">
            <div className="allForms-group">
              <label>Mileage</label>
            </div>
            <div className="allForms-group">
              <label>Mechanic</label>
            </div>
            <div className="allForms-group">
              <label>Service Type</label>
            </div>
            <div className="allForms-group">
              <label>Service Cost</label>
            </div>
            <div className="allForms-group">
              <label>Service Detail</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
