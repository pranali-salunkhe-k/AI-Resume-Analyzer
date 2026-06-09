import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ResumeUpload from "../components/ResumeUpload";
import ATSProgress from "../components/ATSProgress";
import JobMatchChart from "../components/JobMatchChart";
import AdminAnalytics from "../components/AdminAnalytics";

import API from "../services/dashboardApi";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [atsScore, setAtsScore] = useState(0);
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [resumeStatus, setResumeStatus] = useState("Not Uploaded");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleResumeProcessed = async (data) => {
    if (!data.skills) return;

    setSkills(data.skills);
    setResumeStatus("Uploaded");

    try {
      const atsResponse = await API.post("ats/check/", {
        resume_skills: data.skills,
        required_skills: [
          "Python",
          "React",
          "Django",
          "MySQL",
          "Git",
          "JavaScript",
        ],
      });

      setAtsScore(atsResponse.data.score);
    } catch (error) {
      console.log("ATS Error:", error);
    }

    try {
      const jobsResponse = await API.post("jobs/match/", {
        resume_skills: data.skills,
      });

      setJobs(jobsResponse.data);
    } catch (error) {
      console.log("Jobs Error:", error);
    }
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
          <li>Analytics</li>
          <li>Profile</li>
        </ul>
      </div>

      <div className="main">
        <div className="header">
          <h1>Welcome User 👋</h1>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="cards">
          <div className="card">
            <h3>ATS Score</h3>
            <div className="card-value">{atsScore}%</div>
          </div>

          <div className="card">
            <h3>Skills Found</h3>
            <div className="card-value">{skills.length}</div>
          </div>

          <div className="card">
            <h3>Matched Jobs</h3>
            <div className="card-value">{jobs.length}</div>
          </div>

          <div className="card">
            <h3>Resume Status</h3>
            <div className="card-value">{resumeStatus}</div>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <ResumeUpload
            onResumeProcessed={handleResumeProcessed}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <ATSProgress score={atsScore} />
        </div>

        <div style={{ marginTop: "30px" }}>
          <JobMatchChart jobs={jobs} />
        </div>

        <div
          className="card"
          style={{ marginTop: "30px" }}
        >
          <h3>Extracted Skills</h3>

          {skills.length === 0 ? (
            <p>Upload Resume First</p>
          ) : (
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="card"
          style={{ marginTop: "30px" }}
        >
          <h3>Recommended Jobs</h3>

          {jobs.length === 0 ? (
            <p>No Jobs Found</p>
          ) : (
            <ul>
              {jobs.map((job, index) => (
                <li key={index}>
                  <strong>{job.job_title}</strong>
                  {" - "}
                  {job.company}
                  {" ("}
                  {job.match_score}
                  {"%)"}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ marginTop: "30px" }}>
          <AdminAnalytics />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;