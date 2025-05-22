import React, { useEffect,useState, useMemo } from "react";
import {
  useGetAllRemindersQuery,
  useDeleteReminderMutation,
} from "../../app/reminderSlice"; 
import { useParams } from "react-router-dom";
import "../../styling/AllReminders.css"; 

const AllReminders = () => {
  const [search, setSearch] = useState("");
  const {vin} = useParams();
  const [deleteReminder, { isLoading: isDeleting }] = useDeleteReminderMutation();
  const {
    isLoading,
    error,
    data: reminderList , 
  } = useGetAllRemindersQuery({ vin});


 const [reminders, setReminders] = useState([]);
useEffect(() => {
  if (reminderList) {
    console.log(reminderList);
    setReminders(reminderList);
  }
}, [reminderList])
 
  const filteredReminders = useMemo(() => {
    if (!reminders) return [];
    if (!search) return reminders;
    return reminders.filter((reminder) =>
      reminder.tittle.toLowerCase().includes(search.toLowerCase())
    );
  }, [reminders, search]);

  

  // Delete Reminder function
  async function handleDeleteReminder(reminderIdToDelete) {
    try {
      await deleteReminder(reminderIdToDelete).unwrap();
      
    } catch (err) {
      console.error("Failed to delete reminder:", err);
    }
  }

  if (isLoading) {
    return <div>Loading reminders...</div>;
  }

  if (error) {
    return (
      <div>
        Error fetching reminders:{" "}
        {error?.data?.message || error?.error || "An unknown error occurred"}
      </div>
    );
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="reminderPage">
          <article>
            <h2>All Reminders</h2>
            {filteredReminders?.length > 0 ? (
              <ul>
                {filteredReminders.map((reminder) => (
                  <li key={reminder.id}>
                    <h3>{reminder.tittle}</h3>
                    <p className="reminder-notes">{reminder.notes}</p> {/* Optional: class for notes if needed */}
                    <p className="reminder-meta">
                      Created:{" "}
                      {new Date(reminder.createdAt).toLocaleString()}
                    </p>
                    {reminder.car && <p className="reminder-meta">Associated Car: {reminder.car_id || reminder.car}</p>}
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reminders found{search ? " matching your search." : "."}</p>
            )}
          </article>
        </div>
      </div>
    </>
  );
};

export default AllReminders;
