import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../images/logo.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import Facebook from "./Facebook";
import "../App.css";

const Login = () => {
  // set initial states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState([]);
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  const handleAuthenticate = (e) => {
    e.preventDefault();
    // run register function
    Authenticate();
  };

  const Authenticate = async () => {
    await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((result) => {
        setMsg(result.message);
        setAdmin(result.user.admin);
      })

      .catch((error) => setMsg(error));
  };

  if (msg.includes("ey")) {
    alert("Login successful");

    navigate("/home", {
      state: {
        username: username,
        token: msg,
        admin: admin,
      },
    });
    setMsg([]);
  }

  return (
    <section>
      <Row className="header">
        <div className="text-center">
          <img
            className="header-img"
            src={Logo}
            width="150px"
            alt="logo icon"
          />
          <h2>My Travel Diary</h2>
        </div>
      </Row>
      <Row className="space-above">
        <Col xs={6}>
          <form onSubmit={handleAuthenticate} className="box">
            <p className="has-text-centered">{msg}</p>
            <div className="field mt-5">
              <label className="label">Username</label>
              <div className="controls">
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="field mt-5">
              <label className="label">Password</label>
              <div className="controls">
                <input
                  type="password"
                  className="input"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field mt-5">
              <button className="button is-success is-fullwidth">Login</button>
            </div>
          </form>
        </Col>
        <Col xs={1}></Col>
        <Col xs={4}>
          {/* was following instructions to provide Fb/Google logins but found these have currently been depreciated as of earlier this year */}
          <div className="LoginCard">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
              <Google />
            </GoogleOAuthProvider>
            <Facebook />
          </div>
        </Col>
      </Row>
      <Row className="space-above">
        {" "}
        <div className="container">
          <p>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </p>
        </div>
      </Row>
    </section>
  );
};

export default Login;
