import "../../App.css";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetLogsQuery,
  useCreateLogMutation,
} from "../../app/maintenanceSlice";
import { useGetUpcomingServicesQuery } from "../../app/upcomingServiceSlice";
import { useGetPastDueQuery } from "../../app/pastDueSlice";
import { useGetAllUsersQuery } from "../../app/userSlice";
import AddMaint from "../forms/AddMaint";

export default function VehiclePage() {
  const { vin } = useParams();
  const { error, isLoading, data: logs } = useGetLogsQuery({ testVin: vin });
  const {
    error: error2,
    isLoading: loading2,
    data: upcomingServices,
  } = useGetUpcomingServicesQuery({ testVin: vin });
  const { data: pastDue } = useGetPastDueQuery({ testVin: vin });
  const [pastDueServices, setPastDueServices] = useState([]);
  const { data: users } = useGetAllUsersQuery();
  const [milage, setMilage] = useState("");
  const [allMechanics, setAllMechanics] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (users) {
      const mechanics = users.filter((user) => user.roleId === 2);
      setAllMechanics(mechanics);
    }
    if (logs) {
    }
    if (pastDue) {
      console.log("Past Due services: ", pastDue.data);
    }
  }, [users, logs, upcomingServices, pastDue]);

  if (isLoading || loading2) return <h2>Loading...</h2>;
  if (error || error2) return <h2>There was an error loading your data.</h2>;

  // --- FORM REMOVED FROM PAGE; THIS FUNCTION IS NOT USED ---
  // async function submitMaintenance(e) {
  //   e.preventDefault();
  //   try {
  //     const mechanicId = allMechanics.find(
  //       (mech) => mech.firstname == mechanic
  //     );
  //     console.log(mechanicId.id);
  //     const updatedData = {
  //       mileage: milage,
  //       serviceBy: mechanicId.id,
  //       serviceType,
  //       serviceCost: serviceCost,
  //       serviceDetail,
  //     };
  //     console.log(updatedData);
  //     const response = await createLog({
  //       testVin: vin,
  //       mileage: updatedData.mileage,
  //       serviceBy: updatedData.serviceBy,
  //       serviceType: updatedData.serviceType,
  //       serviceCost: updatedData.serviceCost,
  //       serviceDetail: updatedData.serviceDetail,
  //     }).unwrap();
  //     if (response) {
  //       alert("Maintenace added successfully!");
  //       setMilage("");
  //       setMechanic("");
  //       setServiceType("");
  //       setServiceCost("");
  //       setServiceDetail("");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="content-container">
      <main className="maintenance">
        <div className="maint-section-1">
          <h1>Service</h1>
          <button
            className={`AMF-btn ${showForm ? "rotated" : ""}`}
            onClick={() => setShowForm((hidden) => !hidden)}
          >
            {showForm ? <IoAdd /> : <IoAdd />}
          </button>
        </div>

        <div className="maint-section-2">
          <div className="maint-2a">
            <h1>Upcoming</h1>
            {upcomingServices.data.length > 0 ? (
              upcomingServices.data.map((upcomingService) => (
                <li key={upcomingService.id}>
                  <strong>{upcomingService.serviceType}</strong> at{" "}
                  {upcomingService.targetMileage} miles
                </li>
              ))
            ) : (
              <p>Add mileage to see upcoming service reminders.</p>
            )}
          </div>
          <div className="maint-2b">
            <h1>Past Due</h1>
            {pastDue?.length > 0 ? (
              pastDue.data.map((serviceDue) => (
                <li key={serviceDue.id}>
                  <strong>{serviceDue.serviceType}</strong> at{" "}
                  {serviceDue.targetMileage} miles
                </li>
              ))
            ) : (
              <p>No Services Due.</p>
            )}
          </div>
          <div className={`slide-form ${showForm ? "active" : ""}`}>
            <AddMaint vin={vin} />
          </div>
        </div>

        <div className="maint-section-3">
          <h1>Service History</h1>
          {logs.length > 0 ? (
            logs.map((log) => (
              <li key={log.id}>
                ${log.serviceCost || "No cost available"}_
                {log.serviceType || "No description available"}
              </li>
            ))
          ) : (
            <li>No logs available.</li>
          )}
        </div>
      </main>
    </div>
  );
}
