import "../App.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetLogsQuery, useCreateLogMutation } from "../app/maintenanceSlice";
import { useGetAllUsersQuery } from "../app/userSlice";
export default function VehiclePage() {
  const { vin } = useParams();
  const { error, isLoading, data: logs } = useGetLogsQuery({ testVin: vin });
  const { data: users } = useGetAllUsersQuery();
  const [createLog] = useCreateLogMutation();
  const [milage, setMilage] = useState("");
  const [allMechanics, setAllMechanics] = useState([]);
  const [mechanic, setMechanic] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceDetail, setServiceDetail] = useState("");

  useEffect(() => {
    if (users) {
      console.log("users:", users);
      const mechanics = users.filter((user) => user.roleId === 2);
      setAllMechanics(mechanics);
      console.log("mechanics:", mechanics);
    }
    if (logs) {
      console.log("logs:", logs);
    }
  }, [users, logs]);
  if (isLoading) return <h2>Loading Maintenance Log...</h2>;
  if (error)
    return (
      <>
        <h2>There was an error loading the maintenance log</h2>
      </>
    );
  async function submitMaintenance(e) {
    e.preventDefault();
    try {
      const mechanicId = allMechanics.find(
        (mech) => mech.firstname == mechanic
      );
      console.log(mechanicId.id);
      const updatedData = {
        mileage: milage,
        serviceBy: mechanicId.id,
        serviceType,
        serviceCost: serviceCost,
        serviceDetail,
      };
      console.log(updatedData);
      const response = await createLog({
        testVin: vin,
        mileage: updatedData.mileage,
        serviceBy: updatedData.serviceBy,
        serviceType: updatedData.serviceType,
        serviceCost: updatedData.serviceCost,
        serviceDetail: updatedData.serviceDetail,
      }).unwrap();
      if (response) {
        alert("Maintenace added successfully!");
        setMilage("");
        setMechanic("");
        setServiceType("");
        setServiceCost("");
        setServiceDetail("");
      }
    } catch (error) {
      console.error(error);
    }
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
                  <ol>
                    {logs.length > 0 ? (
                      logs.map((log) => (
                        <li key={log.id}>
                          ${log.serviceCost || "No cost available"}_
                          {log.serviceType || "No description available"}_
                          {log.mileage}miles
                        </li>
                      ))
                    ) : (
                      <li>No logs available.</li>
                    )}
                  </ol>
                </div>
              </td>
              <td>
                <div>
                  <form
                    className="allForms"
                    onSubmit={(e) => submitMaintenance(e)}
                  >
                    <div>
                      <h3>Add Maintenance</h3>
                    </div>
                    <div className="allForms-group">
                      <label>Mileage</label>
                      <input
                        value={milage}
                        placeholder="Enter Mileage"
                        onChange={(e) => setMilage(e.target.value)}
                      />
                    </div>
                    <div className="allForms-group">
                      <label>Mechanic</label>
                      <select
                        value={mechanic}
                        onChange={(e) => setMechanic(e.target.value)}
                      >
                        <option>Select</option>
                        {allMechanics.map((Mechanic) => (
                          <option key={Mechanic.id}>
                            {Mechanic.firstname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="allForms-group">
                      <label>Service Type</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Oil Change</option>
                        <option>Tire Rotation</option>
                        <option>Replace Air Filter</option>
                        <option>Change Break Pads</option>
                        <option>Brake Fluid Flush</option>
                        <option>Replace Tires</option>
                        <option>Replace Battery</option>
                        <option>Replace Timing Belt</option>
                      </select>
                    </div>
                    <div className="allForms-group">
                      <label>Service Cost</label>
                      <input
                        value={serviceCost}
                        placeholder="Enter Service Cost"
                        onChange={(e) => setServiceCost(e.target.value)}
                      />
                    </div>
                    <div className="allForms-group">
                      <label>Service Detail</label>
                      <input
                        value={serviceDetail}
                        placeholder="Enter Service Detail"
                        onChange={(e) => setServiceDetail(e.target.value)}
                      />
                    </div>
                    <button type="submit">Submit</button>
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
