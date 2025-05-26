import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../app/userSlice";
import { useCreateAccessMutation } from "../../app/carAccessSlice";
import "../../styling/forms.css";
import "../../styling/shareCar.css";
import { FaUser } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

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
          <h1>Share Vehicle Access</h1>
        </div>
        <div className="sp-sect-1b">
          <p>
            Who is recieving vehicle access? <small>Select account type.</small>
          </p>
        </div>
        <div className="sp-sect-1c" id="whichUser">
          <button onClick={() => setUser()}>
            <FaUser /> <p>User</p>
          </button>
          <button onClick={() => setMechanic()}>
            <FaTools /> <p>Mechanic</p>
          </button>
        </div>
      </section>

      {isUser && (
        <section className="sp-sect-2">
          <h2>User Selection</h2>
          <div className="sp-sect-2a">
            <form onSubmit={handleSubmit}>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">User List</option>
                {allUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstname}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={addingUser}>
                {addingUser ? "Sharing..." : "Share"}
              </button>
            </form>
          </div>
        </section>
      )}
      {isMechanic && (
        <section className="sp-sect-2">
          <h2>Mechanic Selection</h2>
          <div className="sp-sect-2b">
            <form onSubmit={handleSubmit}>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">Technician List</option>
                {allMechanics.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.firstname}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={addingUser}>
                {addingUser ? "Sharing..." : "Share"}
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
};
export default AddCarOwner;

// ATTEMPTED SEARCH BAR

// const [searchTerm, setSearchTerm] = useState("");
// const filteredUsers = allUsers.filter((user) =>
//   user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
// );

//  {isUser && (
//     <div className="sp-sect-2a">
//       <form className="allForms" onSubmit={handleSubmit}>
//         <div className="allForms-group">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search all users..."
//           />
//           <div className="user-list">
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className={`user-list-item ${
//                     userId === user.id ? "selected" : ""
//                   }`}
//                   onClick={() => setUserId(user.id)}
//                 >
//                   {user.firstname}
//                 </div>
//               ))
//             ) : (
//               <p className="user-list-empty">
//                 No users match that search.
//               </p>
//             )}
//           </div>
//         </div>
//         <button type="submit" disabled={addingUser}>
//           {addingUser ? "Adding..." : "Add User"}
//         </button>
//       </form>
//     </div>
//   )}
