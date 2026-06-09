import { useEffect, useState } from "react";
import API from "../services/dashboardApi";

function AdminAnalytics() {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
    async () => {

      try {

        const response =
          await API.get(
            "analytics/"
          );

        setData(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!data) {

    return <p>Loading...</p>;
  }

  return (

    <div
      className="card"
      style={{
        marginTop: "30px"
      }}
    >

      <h3>
        Admin Analytics
      </h3>

      <p>
        Total Users:
        {data.total_users}
      </p>

      <p>
        Total Resumes:
        {data.total_resumes}
      </p>

      <p>
        Total Jobs:
        {data.total_jobs}
      </p>

      <h4>
        Top Skills
      </h4>

      <ul>

        {data.top_skills.map(
          (
            skill,
            index
          ) => (

            <li key={index}>

              {skill[0]}
              {" - "}
              {skill[1]}

            </li>

          )
        )}

      </ul>

    </div>
  );
}

export default AdminAnalytics;