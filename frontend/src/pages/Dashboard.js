import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">

      <div className="sidebar">

        <h2>AI Resume Analyzer</h2>

        <ul>
          <li>Dashboard</li>
          <li>Upload Resume</li>
          <li>ATS Score</li>
          <li>Job Matches</li>
          <li>Profile</li>
        </ul>

      </div>

      <div className="main">

        <div className="header">

          <h1>Welcome User 👋</h1>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <div className="cards">

          <div className="card">
            <h3>ATS Score</h3>
            <div className="card-value">
              80%
            </div>
          </div>

          <div className="card">
            <h3>Skills Found</h3>
            <div className="card-value">
              12
            </div>
          </div>

          <div className="card">
            <h3>Matched Jobs</h3>
            <div className="card-value">
              8
            </div>
          </div>

          <div className="card">
            <h3>Resume Status</h3>
            <div className="card-value">
              Uploaded
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;