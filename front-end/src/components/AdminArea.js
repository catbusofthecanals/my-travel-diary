import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../App.css";

const AdminArea = () => {
  // set initial states
  const [pins, setPins] = useState([]);
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  // declare username, admin, pins and token passed as props
  const userUN = state.username;
  const userTkn = state.token;
  const userAdmin = state.admin;
  const allPins = state.pins;

  // use callback function to avoid dependencies error, looked up tutorial on useeffect here: https://overreacted.io/a-complete-guide-to-useeffect/
  const fetchUsers = useCallback(async () => {
    try {
      // GET method to fetch pins
      const result = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}`,
          token: token,
        },
      });
      const users = await result.json();
      // set result in pins state
      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    setUsername(userUN);
    setToken(userTkn);
    setAdmin(userAdmin);
    setPins(allPins);
    fetchUsers();
  }, [userUN, userTkn, userAdmin, allPins, fetchUsers]);

  // handle logging out by setting states to null and navigating to home page
  const handleLogOut = (e) => {
    setUsername("");
    setToken("");
    navigate("/");
  };

  const fetchPins = async () => {
    try {
      // GET method to fetch pins
      const result = await fetch("/api/pins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}`,
          token: token,
        },
      });
      const pins = await result.json();
      // set result in pins state
      setPins(pins);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEntry = async (e, _id) => {
    e.preventDefault();
    let pinId = _id;
    await fetch(`/api/pins/delete/${pinId}`, {
      method: "DELETE",
      headers: {
        // "Authorization": `Bearer ${token}`,
        token: token,
      },
    });
    alert("Diary removed");
    fetchPins();
  };

  const deleteUser = async (e, _id) => {
    e.preventDefault();
    let userId = _id;
    await fetch(`/api/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        // "Authorization": `Bearer ${token}`,
        token: token,
      },
    });
    alert("User removed");
    fetchUsers();
  };

  // if user if logged in display user profile and todos
  if (username !== "" && admin === true) {
    return (
      <div>
        <NavBar
          username={username}
          token={token}
          handleLogOut={handleLogOut}
          admin={admin}
        />
        <div className="App">
          <Row className="space_above">
            <h1>Admin Area</h1>
          </Row>
          <Row className="space_above">
            <Col xs={1}></Col>
            <Col xs={4}>
              <h3>Current Users</h3>
              <Container className="container">
                {/* if users is empty display message */}
                {users === undefined ? (
                  <div className="empty">There are currrently no users</div>
                ) : (
                  <ul id="listSection">
                    {/* map through pin items, pass data as props through DiaryItem component */}
                    {users &&
                      users.map((user) => (
                        <li className="left">
                          Name: {user.username},<br />
                          Email: {user.email}{" "}
                          <button
                            onClick={(e) => {
                              deleteUser(e, user._id);
                            }}
                            className="button"
                          >
                            Delete User
                          </button>{" "}
                        </li>
                      ))}
                  </ul>
                )}
              </Container>
            </Col>
            <Col xs={7}>
              <h3>All Entries</h3>
              <Container className="container">
                {/* if pins is empty display message */}
                {pins === undefined ? (
                  <div className="empty">No users have submitted diaries</div>
                ) : (
                  <ul id="listSection">
                    {/* map through pin items, pass data as props through DiaryItem component */}
                    {pins &&
                      pins.map((pin) => (
                        <div className="Card">
                          <div className="Card--text">
                            <h4>
                              <strong>{pin.title}</strong>
                            </h4>
                            <span>
                              <em>
                                latitude {pin.lat}, longitude {pin.long}
                              </em>
                            </span>
                            <p className="Card--diary">{pin.desc}</p>
                            <span>
                              written by <em>{pin.username}</em>
                            </span>
                          </div>
                          <div className="Card--button">
                            <button
                              onClick={(e) => {
                                deleteEntry(e, pin._id);
                              }}
                              className="button"
                            >
                              Delete User's Post
                            </button>
                          </div>
                        </div>
                      ))}
                  </ul>
                )}
              </Container>
            </Col>
          </Row>
        </div>
      </div>
    );
  } else if (username !== "" && admin !== true) {
    return (
      <Container className="container">
        <NavBar username={username} token={token} handleLogOut={handleLogOut} />
        <Row className="space_above">
          <div>Only admins can access this page</div>
        </Row>
      </Container>
    );
  }
  // else if not logged in display buttons to navigate to login or sign up pages
  else {
    return (
      <Container className="container">
        <div>Please log in or sign up to create a My Travel Diary account:</div>
        <Link to="/">
          <button>Log In</button>
        </Link>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </Container>
    );
  }
};

export default AdminArea;
