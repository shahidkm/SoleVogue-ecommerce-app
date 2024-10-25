// SignupPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Active:true
 
  });

  const [error, setError] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: ""
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3008/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFetchData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validation = () => {
    let valid = true;
    let newError = {
      Username: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    
    };

    // Username validation
    if (!fetchData.Username) {
      newError.Username = "Username is required!";
      valid = false;
    } else if (users.some(user => user.Username === fetchData.Username)) {
      newError.Username = "Username is already taken!";
      valid = false;
    }

    // Email validation
    if (!fetchData.Email) {
      newError.Email = "Email is required!";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(fetchData.Email)) {
      newError.Email = "Email is invalid!";
      valid = false;
    } else if (users.some(user => user.Email=== fetchData.Email)) {
      newError.Email = "Email is already registered!";
      valid = false;
    }

    // Password validation
    if (!fetchData.Password) {
      newError.Password = "Password is required!";
      valid = false;
    } else if (fetchData.Password.length < 6) {
      newError.Password = "Password must include at least six characters!";
      valid = false;
    }

    // Confirm Password validation
    if (!fetchData.ConfirmPassword) {
      newError.ConfirmPassword = "Please confirm your password!";
      valid = false;
    } else if (fetchData.Password !== fetchData.ConfirmPassword) {
      newError.ConfirmPassword = "Passwords do not match!";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const newUser = {
          Username: fetchData.Username,
          Email: fetchData.Email,
          Password: fetchData.Password,
          Active: true
        };
        await axios.post("http://localhost:3008/users", newUser);
        
        navigate("/loginpage");
      } catch (error) {
        console.error("Error saving user data:", error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* Left Side Image */}
      <div
        className="signup-container d-flex flex-column align-items-start vh-100"
        style={{
          backgroundImage: `url(https://www.superkicks.in/cdn/shop/files/White_thunder.png?v=1728482199)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: "50%"
        }}>
        <h1 style={{ marginTop: "0px", fontFamily: "Protest Strike, sans-serif", color: "white", marginLeft: "20px" }}>
          Welcome To <b style={{ color: "#3e4d3a" }}>SOLEVOGUE</b>
        </h1>
      </div>

      {/* Right Side Signup Form */}
      <div style={{ width: "50%" }}>
        <div className="container mt-4" style={{ maxWidth: "300px", backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
          <h4 className="text-center"><b>Become A Member</b></h4>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-3">
              <label className="form-label">USERNAME</label>
              <input
                type='text'
                className={`form-control ${error.Username ? 'is-invalid' : ''}`}
                value={fetchData.Username}
                name='Username'
                placeholder='Enter Username'
                onChange={handleChange}
              />
              {error.Username && <div className="invalid-feedback">{error.Username}</div>}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">EMAIL</label>
              <input
                type='email'
                className={`form-control ${error.Email ? 'is-invalid' : ''}`}
                value={fetchData.Email}
                name='Email'
                placeholder='Enter Email'
                onChange={handleChange}
              />
              {error.Email && <div className="invalid-feedback">{error.Email}</div>}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">PASSWORD</label>
              <input
                type='password'
                className={`form-control ${error.Password ? 'is-invalid' : ''}`}
                value={fetchData.Password}
                name='Password'
                placeholder='Enter Password'
                onChange={handleChange}
              />
              {error.Password && <div className="invalid-feedback">{error.Password}</div>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3">
              <label className="form-label">CONFIRM PASSWORD</label>
              <input
                type='password'
                className={`form-control ${error.ConfirmPassword ? 'is-invalid' : ''}`}
                value={fetchData.ConfirmPassword}
                name='ConfirmPassword'
                placeholder='Confirm Password'
                onChange={handleChange}
              />
              {error.ConfirmPassword && <div className="invalid-feedback">{error.ConfirmPassword}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
