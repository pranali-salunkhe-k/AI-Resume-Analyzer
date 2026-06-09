import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";

function Register() {

  const [form,setForm] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await API.post(
        "register/",
        form
      );

      alert(
        "Registration Successful"
      );

    }
    catch(error){
      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e)=>
              setForm({
                ...form,
                username:e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e)=>
              setForm({
                ...form,
                password:e.target.value
              })
            }
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>

        </form>

        <div className="link-text">
          Already have an account?
          {" "}
          <Link to="/">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;