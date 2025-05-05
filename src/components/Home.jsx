import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <main id="homePage">
        <div className="page">
          <h1>H O M E</h1>
        </div>
      </main>
    </>
  );
}

export default Home;
