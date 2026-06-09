import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function JobMatchChart({ jobs }) {

  return (

    <div className="card">

      <h3>Job Match Analytics</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={jobs}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="job_title"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="match_score"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default JobMatchChart;