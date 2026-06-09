function ATSProgress({
  score
}) {

  return (

    <div className="card">

      <h3>
        ATS Score Progress
      </h3>

      <div
        style={{
          width: "100%",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >

        <div
          style={{
            width: `${score}%`,
            height: "25px",
            background: "#4CAF50",
            textAlign: "center",
            color: "white",
            lineHeight: "25px"
          }}
        >

          {score}%

        </div>

      </div>

    </div>
  );
}

export default ATSProgress;