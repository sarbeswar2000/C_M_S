import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(props) {
  let navigate = useNavigate();
  const host = "http://localhost:8000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Loged In Successfully", "success");
      navigate("/Home");
    } else {
      props.showAlert("Invalid credentials", "danger");
      setCredentials({ email: "", password: "" });
      navigate("/login");
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
            <div className="form-group my-1">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={credentials.email}
                onChange={onChangeClick}
              />
              <small id="emailHelp" className="form-text text-muted my-1">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control my-1"
                id="password"
                placeholder="password"
                name="password"
                value={credentials.password}
                onChange={onChangeClick}
              />
            </div>

            <button type="submit" className="btn btn-primary my-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
