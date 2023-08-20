import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  let navigate = useNavigate();
  const host = "http://localhost:8000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials; // here we are doing the destructuring.
    const response = await fetch(`${host}/api/auth/createuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/Login");
      props.showAlert("Account Created Successfully", "success");
    } else {
      navigate("/Signup");
      setCredentials({ email: "", password: "" });
      props.showAlert("Invalid  Details", "danger");
    }
  };
  const onChangeClick = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div class="page-content d-flex align-items-center">
      <div class="container d-flex justify-content-center">
        <div className="container col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                name="name"
                value={credentials.name}
                onChange={onChangeClick}
              />
            </div>
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
export default Signup;
