import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../app/userSlice";
import { useCreateAccessMutation } from "../../app/carAccessSlice";
import "../../styling/forms.css";
import "../../styling/shareCar.css";

const AddCarOwner = () => {
  const { vin } = useParams();
  const [allMechanics, setAllMechanics] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [isUser, setIsUser] = useState(true);
  const [isMechanic, setIsMechanic] = useState(false);
  const {
    error: failedUsers,
    isLoading: findUsers,
    data: accounts,
  } = useGetAllUsersQuery();
  const [createAccess, { isLoading: addingUser }] = useCreateAccessMutation();

  useEffect(() => {
    if (accounts) {
      const mechanics = accounts.filter((user) => user.roleId === 2);
      setAllMechanics(mechanics);
      const users = accounts.filter((user) => user.roleId === 1);
      setAllUsers(users);
    }
  }, [accounts]);

  function setUser() {
    setIsUser(true);
    setIsMechanic(false);
  }
  function setMechanic() {
    setIsMechanic(true);
    setIsUser(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAccess({
        testVin: vin,
        userId,
      });
    } catch (err) {
      console.error("Error adding vehicle access:", err);
    }
  };

  if (failedUsers) {
    return (
      <div>
        <h1>Failed to find Users.</h1>
      </div>
    );
  } else if (findUsers) {
    <div>
      <h1>Searching for Users...</h1>
    </div>;
  }
  return (
    <main className="shareVeh-page">
      <section className="sp-sect-1">
        <div className="sp-sect-1a">
          <h2>Share Vehicle Access</h2>
        </div>
        <div className="sp-sect-1b" id="whichUser">
          <button onClick={() => setUser()}>Users</button>
          <button onClick={() => setMechanic()}>Mechanics</button>
        </div>
      </section>

      <section className="sp-sect-2">
        {isUser && (
          <div className="sp-sect-2a">
            <h2>All Users</h2>
            <form className="allForms" onSubmit={handleSubmit}>
              <div className="allForms-group">
                <label>User:</label>
                <select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option value="">Select</option>
                  {allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstname}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={addingUser}>
                {addingUser ? "Adding..." : "Add User"}
              </button>
            </form>
          </div>
        )}
        {isMechanic && (
          <div className="sp-sect-2b">
            <h2>All Mechanics:</h2>
            <form className="allForms" onSubmit={handleSubmit}>
              <div className="allForms-group">
                <label>Mechanic:</label>
                <select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option value="">Select</option>
                  {allMechanics.map((mechanic) => (
                    <option key={mechanic.id} value={mechanic.id}>
                      {mechanic.firstname}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={addingUser}>
                {addingUser ? "Adding..." : "Add Mechanic"}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
};
export default AddCarOwner;
