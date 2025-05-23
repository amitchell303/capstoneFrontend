import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  useGetAllRemindersQuery,
  useDeleteReminderMutation,
} from "../../app/reminderSlice";
import AddReminders from "../forms/AddNote";

const AllReminders = () => {
  const [search, setSearch] = useState("");
  const { vin } = useParams();
  const [deleteReminder, { isLoading: isDeleting }] =
    useDeleteReminderMutation();
  const {
    isLoading,
    error,
    data: reminderList, // Default to an empty array to prevent errors if data is undefined initially
  } = useGetAllRemindersQuery({ vin });

  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    if (reminderList) {
      console.log(reminderList);
      setReminders(reminderList);
    }
  }, [reminderList]);

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
      <div className="content-container">
        <div className="notes-container">
          <h1>All Notes</h1>
          <main className="notes">
            <div className="notes-section-1">
              {filteredReminders?.length > 0 ? (
                <ul className="note-list">
                  {filteredReminders.map((reminder) => (
                    <li key={reminder.id} className="note-card">
                      <div className="note-card-info">
                        <h2>{reminder.tittle}</h2>
                        <small>
                          {new Date(reminder.createdAt).toLocaleString()}
                        </small>
                        <p>{reminder.notes}</p>
                        {reminder.car && (
                          <p>
                            Associated Car: {reminder.car_id || reminder.car}
                          </p>
                        )}
                      </div>
                      <div className="note-card-btn">
                        <button
                          onClick={() => handleDeleteReminder(reminder.id)}
                          disabled={isDeleting}
                        >
                          {/* {isDeleting ? "Deleting..." : "Delete"} */}
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  No reminders found{search ? " matching your search." : "."}
                </p>
              )}
            </div>
            <div className="notes-floating-divider"></div>
            <div className="notes-section-2">
              <AddReminders />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AllReminders;
