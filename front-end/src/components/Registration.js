import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Logo from "../images/logo.png";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // set initial states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState([]);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // run register function
    Register();
  };

  const Register = async () => {
    await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confPassword: confPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => setMsg(result.message))
      .catch((error) => setMsg(error));
  };

  if (msg === "User added") {
    alert(`Successfully created profile for ${username}. Please log in.`);
    navigate("/");
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
        <div className="text-center">
          <form onSubmit={handleRegister}>
            <p className="has-text-centered">{msg}</p>
            <div className="field mt-5">
              <label className="label">Name</label>
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
              <label className="label">Email</label>
              <div className="controls">
                <input
                  type="text"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <label className="label">Confirm Password</label>
              <div className="controls">
                <input
                  type="password"
                  className="input"
                  placeholder="******"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field mt-5">
              <button className="button is-success is-fullwidth">
                Register
              </button>
            </div>
          </form>
        </div>
      </Row>
    </section>
  );
};

export default Register;
