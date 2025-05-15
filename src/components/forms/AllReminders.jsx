import React, { useState } from "react";
import {
  useGetAllRemindersQuery,
} from "../../app/reminderSlice";
import { useParams } from "react-router-dom";

const RemindersList = () => {
  const {isLoading, status, data: reminderList } = useGetAllRemindersQuery();
  const [noteTittle, setNoteTitle] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();
 
//Search by Title function
async function handleSearch(e) {
  setSearch(e.target.value);
  console.log(e.target.value);
   const searchedTtittle = noteTittle.filter(reminder =>
        reminder.tittle.toLowerCase().startsWith(search.toLowerCase())
    );
  try {
    console.log(searchedTtittle);
     if (status === "fulfilled") {
          setNoteTitle(reminderList);
        }
  } catch (error) {
    console.error(error);
  }
} 
   
// Get All Reminders function
  async function allReminders(e) {
    e.preventDefault();
    try {
      await reminderList().unwrap();
    } catch (error) {
      console.error(error, 'Uh oh, something went wrong!');
    }
  }
  if (isLoading) return <div>Loading...</div>;
if (allReminders){
  console.log('All Reminders loaded successfully!')
}
// Update Reminder function
  async function handleUpdateReminder(event) {
    event.preventDefault();
    const reminderId = id;
    try {
      await updateReminder({ reminderId, reminderInput }).unwrap();
      setReminderInput("");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  // Delete Reminder function
  async function handleDeleteReminder(id) {
    try {
      await deleteReminder(id).unwrap();
      if ("Fufilled") {
        alert("Reminder Deleted successfuly");
        window.location.reload();
      }
    } catch (error) {}
  }
  return (
    <>  
     <div className="search-title-container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="search-container">
                             
                        <input 
                            type="text" 
                            className="form-control search-input" 
                            placeholder="Search by title..."
                            value={search}
                            onChange={handleSearch}
                        />
                        </div>
                    </div>
                </div>
            </div>
    {/* <div className="content-container">
      <div className="reminderPage">
        <table>
          <tbody>
            <tr>
              <td className="Width40">
                <section>
                  <h1>All Reminders </h1>
                </section>
               <ul>
                {reminderList.map((reminder) => (
                  <li key={reminder.id}>
                    <p>{reminder.tittle}</p>
                    <p>{reminder.notes}</p>
                    <p>{reminder.createdAt}</p>
                    <p>{reminder.car}</p>
                    <button onClick={() => handleDeleteReminder(reminder.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdateReminder(reminder.id)}>
                      Update
                    </button>
                  </li>
                ))}
               </ul>
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> */}
    </>
  );
};

export default RemindersList;
