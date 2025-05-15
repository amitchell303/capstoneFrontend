import React, { useState } from "react";
import {
  useCreateReminderMutation,
} from "../../app/reminderSlice";
import { useParams } from "react-router-dom";

const AddReminders = () => {
  const [isLoading, status, createReminder] = useCreateReminderMutation();
  
  
  const [reminderInput, setReminderInput] = useState("");
  const [tittle, setTittle] = useState("");
  

// Add Reminder function
  async function handleAddReminder(event) {
    event.preventDefault();
    try {
      const response = await createReminder({ reminderInput, tittle }).unwrap();
      try {
        localStorage.setItem("token", response.token);
        setTittle("");
        setReminderInput("");
        window.location.reload();
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  if (isLoading) {
    return "Loading...";
  }
  
  if (status === "fulfilled") {
    alert("Reminder added successfully!");
    console.log("Reminder added successfully!");
  }
  if (status !== "fulfilled"){
    alert ("Unable to add reminder!")
    console.log("Unable to add reminder!")
  }


  return (
    <>  
    
    <div className="content-container">
      <div className="reminderPage">
        <table>
          <tbody>
            <tr>
              <td className="Width40">
                <section>
                  <h1>My Reminders </h1>
                </section>
                <form className="reminderForm" onSubmit={handleAddReminder}>
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTittle(e.target.value)}
                  />
                  <label>Reminder</label>
                  <input
                    type="text"
                    placeholder="Type Reminder Here"
                    value={reminderInput}
                    onChange={(e) => setReminderInput(e.target.value)}
                  />
                </form>
                <button type="submit" onClick={handleAddReminder}>Add Reminder</button>
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
