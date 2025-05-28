import "../../App.css";
import "../../styling/Service.css";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetLogsQuery } from "../../app/maintenanceSlice";
import { useGetUpcomingServicesQuery } from "../../app/upcomingServiceSlice";
import { useGetPastDueQuery } from "../../app/pastDueSlice";
import { useGetAllUsersQuery } from "../../app/userSlice";
import { GiAutoRepair } from "react-icons/gi";
import AddMaint from "../forms/AddMaint";
import MaintSumm from "../garageViews/MaintSumm";

export default function VehiclePage() {
  const { vin } = useParams();
  const { error, isLoading, data: logs } = useGetLogsQuery({ testVin: vin });
  const {
    error: error2,
    isLoading: loading2,
    data: upcomingServices,
  } = useGetUpcomingServicesQuery({ testVin: vin });
  const { data: pastDue } = useGetPastDueQuery({ testVin: vin });
  const { data: users } = useGetAllUsersQuery();

  const [allMechanics, setAllMechanics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);

  useEffect(() => {
    if (users) {
      const mechanics = users.filter((user) => user.roleId === 2);
      setAllMechanics(mechanics);
    }
  }, [users]);

  if (isLoading || loading2) return <h2>Loading...</h2>;
  if (error || error2) return <h2>There was an error loading your data.</h2>;

  return (
    <div className="content-container">
      <main className="maintenance">
        <div className="maint-section-1">
          <h1>Service History</h1>
          <button
            className={`AMF-btn ${showForm ? "rotated" : ""}`}
            onClick={() => setShowForm((prev) => !prev)}
          >
            <IoAdd />
          </button>
        </div>

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

        <div className="slide-form-container">
          {showForm && (
            <div className="slide-form active">
              <AddMaint vin={vin} />
            </div>
          )}
          {selectedLogId && (
            <div className="slide-form active">
              <MaintSumm vin={vin} logId={selectedLogId} />
            </div>
          )}
        </div>

        <div className="maint-section-3">
          <div className="serviceHistory">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div className="serviceCard" key={log.id}>
                  <span className="serviceCard-icon">
                    <GiAutoRepair />
                  </span>
                  <h3>{log.serviceType || "No description available"}</h3>
                  <p className="serviceCard-miles">
                    {log.mileage || "No mileage available"} mi
                  </p>
                  <p className="serviceCard-cost">
                    ${log.serviceCost || "No cost available"}
                  </p>
                  <button
                    onClick={() =>
                      setSelectedLogId((current) =>
                        current === log.id ? null : log.id
                      )
                    }
                  >
                    <span className="material-symbols-outlined">
                      description
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <li>No logs available.</li>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// import "../../App.css";
// import "../../styling/Service.css";
// import { IoAdd } from "react-icons/io5";
// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useGetLogsQuery } from "../../app/maintenanceSlice";
// import { useGetUpcomingServicesQuery } from "../../app/upcomingServiceSlice";
// import { useGetPastDueQuery } from "../../app/pastDueSlice";
// import { useGetAllUsersQuery } from "../../app/userSlice";
// import { GiAutoRepair } from "react-icons/gi";
// import AddMaint from "../forms/AddMaint";
// import MaintSumm from "../garageViews/MaintSumm";

// export default function VehiclePage() {
//   const { vin } = useParams();
//   const { error, isLoading, data: logs } = useGetLogsQuery({ testVin: vin });
//   const {
//     error: error2,
//     isLoading: loading2,
//     data: upcomingServices,
//   } = useGetUpcomingServicesQuery({ testVin: vin });
//   const { data: pastDue } = useGetPastDueQuery({ testVin: vin });
//   const { data: users } = useGetAllUsersQuery();
//   const [allMechanics, setAllMechanics] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedLogId, setSelectedLogId] = useState(null);

//   useEffect(() => {
//     if (users) {
//       const mechanics = users.filter((user) => user.roleId === 2);
//       setAllMechanics(mechanics);
//     }
//     if (logs) {
//     }
//     if (pastDue) {
//       console.log("Past Due services: ", pastDue.data);
//     }
//   }, [users, logs, upcomingServices, pastDue]);

//   if (isLoading || loading2) return <h2>Loading...</h2>;
//   if (error || error2) return <h2>There was an error loading your data.</h2>;

//   return (
//     <div className="content-container">
//       <main className="maintenance">
//         <div className="maint-section-1">
//           <h1>Service History</h1>
//           <button
//             className={`AMF-btn ${showForm ? "rotated" : ""}`}
//             onClick={() => setShowForm((hidden) => !hidden)}
//           >
//             {showForm ? <IoAdd /> : <IoAdd />}
//           </button>
//         </div>

//         <div className="maint-2a">
//           <h1>Upcoming</h1>
//           {upcomingServices.data.length > 0 ? (
//             upcomingServices.data.map((upcomingService) => (
//               <li key={upcomingService.id}>
//                 <strong>{upcomingService.serviceType}</strong> at{" "}
//                 {upcomingService.targetMileage} miles
//               </li>
//             ))
//           ) : (
//             <p>Add mileage to see upcoming service reminders.</p>
//           )}
//         </div>
//         <div className="maint-2b">
//           {/* <h1>Past Due</h1>
//           {pastDue?.length > 0 ? (
//             pastDue.data.map((serviceDue) => (
//               <li key={serviceDue.id}>
//                 <strong>{serviceDue.serviceType}</strong> at{" "}
//                 {serviceDue.targetMileage} miles
//               </li>
//             ))
//           ) : (
//             <p>No Service Due.</p>
//           )} */}
//         </div>
//         <div className={`slide-form ${showForm ? "active" : ""}`}>
//           <AddMaint vin={vin} />
//         </div>

//         <div className="maint-section-3">
//           {/* <h1>Service History</h1> */}
//           <div className="serviceHistory">
//             {logs.length > 0 ? (
//               logs.map((log) => (
//                 <div className="serviceCard" key={log.id} log={log} vin={vin}>
//                   <span className="serviceCard-icon">
//                     {" "}
//                     <GiAutoRepair />
//                   </span>
//                   <h3>{log.serviceType || "No description available"} </h3>
//                   <p className="serviceCard-miles">
//                     {" "}
//                     {log.mileage || "No mileage available"}mi
//                   </p>
//                   <p className="serviceCard-cost">
//                     {" "}
//                     ${log.serviceCost || "No cost available"}
//                   </p>
//                   <button
//                     onClick={() =>
//                       setSelectedLogId((current) =>
//                         current === log.id ? null : log.id
//                       )
//                     }
//                   >
//                     <span className="material-symbols-outlined">
//                       description
//                     </span>
//                   </button>

//                   {/* Slide-in for individual log details */}
//                   {selectedLogId === log.id && (
//                     <div className="slide-form active">
//                       <MaintSumm vin={vin} logId={log.id} />
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <li>No logs available.</li>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// {log.mechanic || "No mechanic available";}
// {log.serviceDetail || "No summary available";}
