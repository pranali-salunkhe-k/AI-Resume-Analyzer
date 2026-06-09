import { useState } from "react";
import API from "../services/dashboardApi";

function ResumeUpload({ onResumeProcessed }) {

  const [file, setFile] = useState(null);

  const uploadResume = async () => {

    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();

    formData.append(
      "name",
      "User Resume"
    );

    formData.append(
      "resume_file",
      file
    );

    try {

      const response =
        await API.post(
          "resume/upload/",
          formData
        );

      console.log(response.data);

      if (onResumeProcessed) {
        onResumeProcessed(
          response.data
        );
      }

      alert(
        "Resume Uploaded Successfully"
      );

    } catch(error){

      console.log(error);

      alert(
        "Upload Failed"
      );
    }
  };

  return (
    <div className="card">

      <h3>Upload Resume</h3>

      <input
        type="file"
        onChange={(e)=>
          setFile(
            e.target.files[0]
          )
        }
      />

      <br /><br />

      <button
        onClick={uploadResume}
      >
        Upload
      </button>

    </div>
  );
}

export default ResumeUpload;