import React, { useState, useEffect } from "react";
import {
  useCreateReminderMutation,
} from "../../app/reminderSlice";
import { useParams } from "react-router-dom";



const AddReminders = () => {
  const [createReminder, { isLoading, isSuccess, isError, error }] = useCreateReminderMutation();
  const {vin} = useParams();

  const [reminderInput, setReminderInput] = useState("");
  const [tittle, setTittle] = useState("");
 


  // Add Reminder function
  async function handleAddReminder(event) {
    event.preventDefault();
   
    try {
      console.log("carVin:", vin);
      console.log("tittle:", tittle);
      console.log("reminderInput:", reminderInput);
      await createReminder({ carVin: vin, tittle, notes: reminderInput }).unwrap();
    } catch (err) {
      console.error("Failed to create reminder:", err);
    }
  }

  
  useEffect(() => {
    if (isSuccess) {
      alert("Reminder added successfully!");
      console.log("Reminder added successfully!");
      setTittle("");
      setReminderInput("");
     
      
    }
    if (isError) {
      alert(`Failed to add reminder: ${error?.data?.message || error?.error || "Unknown error"}`);
      console.error("Failed to add reminder:", error);
    }
  }, [isSuccess, isError, error]); 


  return (
    <>
    <div className="content-container">
      <div className="reminderPage">
        <table>
          <tbody>
            <tr>
              <td className="Width40">
                
                  <h1>Create a New Reminder</h1>
                
                <form className="reminderForm" onSubmit={handleAddReminder}>
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={tittle} 
                    onChange={(e) => setTittle(e.target.value)}
                  />
                  <label>Reminder</label>
                  <input
                    type="text"
                    placeholder="Type Reminder Here"
                    value={reminderInput}
                    onChange={(e) => setReminderInput(e.target.value)}
                  />
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Reminder"}
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AddReminders;
