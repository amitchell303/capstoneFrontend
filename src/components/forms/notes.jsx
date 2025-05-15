import React, { useState } from "react";
import {
  useGetAllRemindersQuery,
  useCreateReminderMutation,
  useDeleteReminderMutation,
  useUpdateReminderMutation,
} from "../../app/reminderSlice";
import { useParams } from "react-router-dom";

const ReminderText = () => {
  const [createReminder] = useCreateReminderMutation();
  const [updateReminder] = useUpdateReminderMutation();
  const [deleteReminder] = useDeleteReminderMutation();
  const {isLoading, status, data: reminderList } = useGetAllRemindersQuery();
  
  const [reminderInput, setReminderInput] = useState("");
  const [noteTittle, setNoteTitle] = useState([]);
  const [tittle, setTittle] = useState("");
  const [search, setSearch] = useState("");
  const { id } = useParams();


//Search by Title function
async function handleSearch(e) {
  setSearch(e.target.value);
  const searchedTtittle = noteTittle.filter(reminder =>
        reminder.tittle.toLowerCase().startsWith(search.toLowerCase())
    );
  try {
    await reminderList(searchedTtittle).unwrap();
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
if (allReminders){
  console.log(reminderList)
}

// Add Reminder function
  async function handleAddReminder(event) {
    event.preventDefault();
    try {
      const response = await createReminder({ reminderInput, tittle }).unwrap();
      try {
        localStorage.setItem("token", response.token);
        setTitle("");
        setReminderInput("");
        window.location.reload();
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
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
  if (isLoading) {
    return "Loading...";
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
                        <i className="fas fa-search search-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
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
                <button type="button" onClick={handleUpdateReminder}>
                  Update Reminder
                </button>

                {/* <button type="button" onClick={handleDeleteReminder}>
                  Delete Reminder
                </button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ReminderText;
