import axios from 'axios';
import { Alert } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function LoginPage() {
    let navigate = useNavigate();
    const [details, setDetails] = useState([]); 
    const [error, setError] = useState({
        Email: "",
        Password: "",
        Active:''
    });

    const [info, setInfo] = useState({
        Email: "",
        Password: ""
    });

    const changeForm = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3008/users');
                setDetails(response.data); 
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, []); 

    const validation = () => {
        let valid = true;
        let newError = {
            Email: "",
            Password: "",
            Active:""
        };


        const matchedUser = details.find(user => user.Email === info.Email);
        
    


        if (!info.Email) {
            newError.Email = "Email required";
            valid = false;
        } else if (!matchedUser) {
            newError.Email = "Email doesn't match any registered user";
            valid = false;
        }

        if (!info.Password) {
            newError.Password = "Password required";
            valid = false;
        } else if (info.Password === "123456" && info.Email === "admin@gmail.com") {
            navigate("/adminpage");
            return valid; 
        } else if (!matchedUser || matchedUser.Password !== info.Password) {
            newError.Password = "Password didn't match";
            valid = false;
        }
        if(matchedUser && !matchedUser.Active){
          
            newError.Active = "Admin Blocked You";
            valid = false;
        }

        setError(newError);
        return valid; 
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (validation()) {
      
            console.log("Login successful");
            const matchedUser = details.find(user => user.Email === info.Email);
            if (matchedUser) {
                localStorage.setItem("Username", matchedUser.Username); // Store the username in local storage
            }
            navigate("/"); // Redirect to the home page
        } else {
            console.log("Validation failed");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="signup-container d-flex flex-column align-items-start vh-100"
                style={{
                    backgroundImage: `url(https://www.superkicks.in/cdn/shop/files/COLLECTION-BANNER_2_600x790.webp?v=1725528817)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "50%"
                }} >
                <h1 style={{ marginTop: "20px", fontFamily: "Protest Strike, sans-serif", color: "white", marginLeft: "20px" }}>Welcome To <b style={{ color: "#F3E5AB" }}>SOLEVOGUE</b></h1>
            </div>
            <div style={{ width: "50%" }}>
                <div className="container mt-5" style={{ maxWidth: "300px", backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                    <h2 className="text-center" style={{ marginBottom: '20px', color: '#333' }}><b>Enter Realm</b></h2>
                    <form onSubmit={handleSubmit} className="d-flex flex-column">
                        {details.Active===false && alert("You are blocked by ADMIN")}
                        <label className="form-label" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>EMAIL</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='Email'
                            value={info.Email}
                            onChange={changeForm}
                            className="form-control mb-3"
                        />
                        {error.Email && <span className="text-danger mb-2" style={{ fontSize: '12px' }}>{error.Email}</span>}
                        {error.Active&& <span className="text-danger mb-2" style={{ fontSize: '12px' }}>{error.Active}</span>}
                        <label className="form-label" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>PASSWORD</label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='Password'
                            value={info.Password}
                            onChange={changeForm}
                            className="form-control mb-3"
                        />
                        {error.Password && <span className="text-danger mb-2" style={{ fontSize: '12px' }}>{error.Password}</span>}

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px',marginBottom:"10px" }}>Login</button>
                      <p> New User ? <Link to="/signuppage">Create Account</Link></p> 
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
