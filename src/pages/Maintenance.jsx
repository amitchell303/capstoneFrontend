import "../App.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetLogsQuery } from "../app/maintenanceSlice";
export default function VehiclePage() {
  const { vin } = useParams();
  const { error, isLoading, data: logs } = useGetLogsQuery({ testVin: vin });
  const [milage, setMilage] = useState("");
  const [mechanic, setMechanic] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceDetail, setServiceDetail] = useState("");
  if (isLoading) return <h2>Loading Maintenance Log...</h2>;
  if (error)
    return (
      <>
        <h2>There was an error loading the maintenance log</h2>
      </>
    );
  if (logs) {
    console.log(logs);
  }
  async function submitMaintenance(e) {
    e.preventDefault();
    console.log("milage: ", milage);
    console.log("mechanic: ", mechanic);
    console.log("serviceType: ", serviceType);
    console.log("serviceCost: ", serviceCost);
    console.log("serviceDetail: ", serviceDetail);
  }
  return (
    <>
      <main>
        <h1>M A I N T E N A N C E</h1>
        <table className="maintenance">
          <tbody>
            <tr>
              <td>
                <div>
                  <ul>
                    {logs.length > 0 ? (
                      logs.map((log) => (
                        <li key={log.id}>
                          {log.serviceDetail || "No description available"}
                        </li>
                      ))
                    ) : (
                      <li>No logs available.</li>
                    )}
                  </ul>
                </div>
              </td>
              <td>
                <div>
                  <form onSubmit={(e) => submitMaintenance(e)}>
                    <div>
                      <h3>Add Maintenance</h3>
                    </div>
                    <div>
                      <label>Milage</label>
                      <input
                        value={milage}
                        placeholder="Enter Milage"
                        onChange={(e) => setMilage(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Mechanic</label>
                      <input
                        value={mechanic}
                        placeholder="Enter Mechanic"
                        onChange={(e) => setMechanic(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Service Type</label>
                      <input
                        value={serviceType}
                        placeholder="Enter Service Type"
                        onChange={(e) => setServiceType(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Service Cost</label>
                      <input
                        value={serviceCost}
                        placeholder="Enter Service Cost"
                        onChange={(e) => setServiceCost(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Service Detail</label>
                      <input
                        value={serviceDetail}
                        placeholder="Enter Service Detail"
                        onChange={(e) => setServiceDetail(e.target.value)}
                      />
                    </div>
                    <button type="submit">submit</button>
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div></div>
      </main>
    </>
  );
}
