import { useParams } from "react-router-dom";
import { useAboutMeQuery, useUpdateUserMutation, useDeleteUserMutation } from "./userSlice";
import { useState } from "react";

export default function AboutMe() {
    const {error, isLoading, data: me } = useAboutMeQuery();
    const {id,} = useParams();
    const [update] = useUpdateUserMutation();
      const [deleteUser] = useDeleteUserMutation();

    if (me){
        console.log(me);
    }
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleUpdateUser(e) {
        e.preventDefault();
        const updatedData = { firstname, lastname, email, password };
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          console.log("No token found, redirecting to login.");
        }else{ 
            console.log(updatedData);
        try {
            const userId=user.id;
         const response = await update({ userId, ...updatedData }).unwrap();
         if (response){
          alert("User updated successfully!");
         }
        } catch (error) {
          console.error("Failed to update user:", error);
          alert("Failed to update user.");
        }
      }
    }
    async function handleDeleteUser(user) {
        try {
          await deleteUser(user).unwrap();
          alert("User deleted Successfully!");
          navigate("/");
        } catch (error) {
          console.error("Failed to delete user:", error);
          alert("Failed to delete user.");
        }
      }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    
    return ( 
        <div className="profileDetails">
        <div>
          <h2>My Details:</h2>
        </div>
        <div>
          <p>First Name: {me.user.firstname}</p>
          <p>Last Name: {me.user.lastname}</p>
          <p>Email: {me.user.email}</p>
          <p>Id: {me.user.id}</p>
        </div>
        <div className="update-user">
            <form onSubmit={handleUpdateUser}>
                <input type="submit" value="Update User" />
                <input type="text" value = {firstname} onChange={(e) => setFirstname(e.target.value)}/>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
            </form>
        
          <button
            className="delete-button"
            type="button"
            onClick={handleDeleteUser}
          >
            Delete
          </button>
        </div>
      </div>
      
    )
}