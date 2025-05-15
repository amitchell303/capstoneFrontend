// This file is a collection of quick views of their larger parent pages

function QuickViews() {
  return (
    <div className="content-container">
      <VehicleQV />
      <div className="maintQV"></div>
      <div className="remindersQV"></div>
      <div className="notesQV"></div>
    </div>
  );
}

function VehicleQV() {
  return <div className="vehicleQV"></div>;
}

export default { QuickViews, VehicleQV };
