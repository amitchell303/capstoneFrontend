import React, { useState, useMemo } from "react";
import {
  useGetAllRemindersQuery,
  useDeleteReminderMutation,
} from "../../app/reminderSlice"; 

const AllReminders = () => {
  const {
    isLoading,
    isError,
    error,
    data: reminderList = [], // Default to an empty array to prevent errors if data is undefined initially
  } = useGetAllRemindersQuery();

  const [search, setSearch] = useState("");
 

  const [deleteReminder, { isLoading: isDeleting }] = useDeleteReminderMutation();
  

  console.log(reminderList);

  // Memoized filtered list of reminders
  const filteredReminders = useMemo(() => {
    if (!reminderList || reminderList.length === 0) return [];
    return reminderList.filter(
      (reminder) =>
        reminder.tittle && 
        reminder.tittle.toLowerCase().includes(search.toLowerCase())
    );
  }, [reminderList, search]);

  

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

  if (isError) {
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
            {filteredReminders.length > 0 ? (
              <ul>
                {filteredReminders.map((reminder) => (
                  <li key={reminder.id}>
                    <h3>{reminder.tittle}</h3>
                    <p>{reminder.notes}</p>
                    <p>
                      Created:{" "}
                      {new Date(reminder.createdAt).toLocaleString()}
                    </p>
                    {reminder.car && <p>Associated Car: {reminder.car_id || reminder.car}</p> /* Adjust based on your car data structure */}
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
