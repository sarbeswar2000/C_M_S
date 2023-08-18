import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentState from "./context/contents/ContentState";
import Alert from "./components/Alert";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <ContentState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert} />
          <div className="container my3">
            <Routes>
              <Route exact path="/Home" element={<Home />}></Route>
              <Route
                exact
                path="/Login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/Signup"
                element={<Signup showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </ContentState>
    </>
  );
}

export default App;
