import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import DiaryItem from "../components/DiaryItem";
import Container from "react-bootstrap/Container";

import "../App.css";

const DiaryList = () => {
  // set initial states
  const [myPins, setMyPins] = useState([]);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  // declare username, admin and token passed as props
  const userUN = state.username;
  const userTkn = state.token;
  const userAdmin = state.admin;

  // use callback function to avoid dependencies error, looked up tutorial on useeffect here: https://overreacted.io/a-complete-guide-to-useeffect/
  const fetchMyPins = useCallback(async () => {
    // if the value of token isn't null then run post request
    if (token !== "") {
      // send username to backend to only fetch user's diaries
      const result = await fetch(`/api/pins/user?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          token: token,
        },
      });
      const pins = await result.json();
      // set result in todo state
      setMyPins(pins.myPins);
    }
  }, [token, username]);

  useEffect(() => {
    setUsername(userUN);
    setToken(userTkn);
    setAdmin(userAdmin);
    fetchMyPins();
  }, [userUN, userTkn, userAdmin, fetchMyPins]);

  // handle logging out by setting states to null and navigating to home page
  const handleLogOut = (e) => {
    setUsername("");
    setToken("");
    navigate("/");
  };

  // if user if logged in display user profile and todos
  if (username !== "") {
    return (
      <div>
        <NavBar
          username={username}
          token={token}
          handleLogOut={handleLogOut}
          admin={admin}
        />
        <div className="App">
          <h1>{username}'s Travel Diaries</h1>
          <Container className="container">
            {/* if my pins is empty display message */}
            {myPins === undefined ? (
              <div className="empty">
                Enter a new diary to display travel diaries list
              </div>
            ) : (
              <ul id="listSection">
                {/* map through my pin items, pass data as props through DiaryItem component */}
                {myPins &&
                  myPins.map((myPin) => (
                    <DiaryItem
                      key={myPin._id}
                      myPin={myPin}
                      username={username}
                      fetchMyPins={fetchMyPins}
                      token={token}
                    />
                  ))}
              </ul>
            )}
          </Container>
        </div>
      </div>
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

export default DiaryList;
