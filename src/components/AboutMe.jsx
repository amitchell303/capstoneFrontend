import { useParams } from "react-router-dom";
import { useAboutMeQuery } from "./userSlice";

export default function AboutMe() {
    const { data: me, error, isLoading } = useAboutMeQuery();
    const {id,} = useParams();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    
    return ( 
        <div className="profileDetails">
        <div>
          <h2>My Details:</h2>
        </div>
        <div>
          <p>First Name: {me.firstname}</p>
          <p>Last Name: {me.lastname}</p>
          <p>Email: {me.email}</p>
          <p>Id: {me.id}</p>
        </div>
      </div>
    )
}