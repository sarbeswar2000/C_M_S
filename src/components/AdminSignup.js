import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminSignup(props) {
  let navigate = useNavigate();
  const host = "http://localhost:8000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials; // here we are doing the destructuring.
    const response = await fetch(`${host}/api/admin/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/AdminLogin");
      props.showAlert("Account Created Successfully", "success");
    } else {
      navigate("/AdminSignup");
      setCredentials({ email: "", password: "" });
      props.showAlert("Invalid  Details", "danger");
    }
  };
  const onChangeClick = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="page-content d-flex align-items-center wrapper ">
      <div className="container d-flex justify-content-center">
        <div className="container col-12 col-sm-10 rw-10">
          <big>AdminSignup</big>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                placeholder="Enter email"
                onChange={onChangeClick}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={onChangeClick}
                minLength={5}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                placeholder="cpassword"
                name="cpassword"
                value={credentials.cpassword}
                onChange={onChangeClick}
                minLength={5}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminSignup;
