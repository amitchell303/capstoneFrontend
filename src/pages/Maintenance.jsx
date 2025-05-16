import { useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { useGetLogsQuery } from "../app/maintenanceSlice";

export default function VehiclePage() {
  const { vin } = useParams();
  const { error, isLoading, data: logs } = useGetLogsQuery({ testVin: vin });

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
  return (
    <>
      <main>
        <h1>M A I N T E N A N C E</h1>
        <div>
          <ul>
            {logs && Array.isArray(logs) ? (
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
      </main>
    </>
  );
}
