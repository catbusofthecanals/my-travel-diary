import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "../App.css";

const Help = () => {
  // set initial states
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const { state } = useLocation();

  // declare username, admin and token passed as props
  const userUN = state.username;
  const userTkn = state.token;
  const userAdmin = state.admin;

  useEffect(() => {
    setUsername(userUN);
    setToken(userTkn);
    setAdmin(userAdmin);
  }, [userUN, userTkn, userAdmin]);

  // if user if logged in display user profile and todos
  if (username !== "") {
    return (
      <div>
        <NavBar username={username} token={token} admin={admin} />
        <div className="App">
          <Row className="space-above">
            <h3>Help</h3>
          </Row>
          <Row>
            <div className="help-container">
              <div className="help">
                <h4>Placing a marker</h4>
                <p>
                  To place a pin on the map, double click on the location you
                  would like to write your entry about.
                </p>
                <p>
                  To move the map to your location, click and drag to move the
                  current viewstate. You can also zoom in and out to pinpoint
                  your location.
                </p>
                <p>
                  Once you've double clicked a pop up will appear asking you to
                  input a title and a diary entry. Fill in these and click the
                  Add a Diary button to submit your diary entry.
                </p>
                <p>
                  Once submitted, a pin should appear on the map where you
                  entered your entry.
                </p>
              </div>
              <div className="help">
                <h4>Viewing an entry</h4>
                <p>
                  To view a diary entry, click on any marker on the map and a
                  pop up will appear. The pop up will display the title, diary
                  entry and the username of the user that submitted it.
                </p>
                <p>
                  To close, click the x button in the top right of the pop up or
                  click elsewhere on the map
                </p>
                <p>
                  Red markers indicate ones that you submitted yourself whereas
                  blue markers indicate an entry was written by another user
                </p>
              </div>
              <div className="help">
                <h4>Adding an entry via entering a location</h4>
                <p>
                  Open the sidebar, by selecting the burger menu icon in the top
                  left and select "Add a Travel Diary".
                </p>
                <p>
                  Here there is an input which autofills suggested locations
                  based off the users input location. To choose the relevant
                  location, select the entry which matches the location you want
                  to enter a diary about.
                </p>
                <p>
                  There is also a map on this page which only displays your own
                  markers. To add a location via the map, see instructions
                  above.
                </p>
                <p>
                  Once a location has been selected either via the input field
                  or the map, a pop up will appear inviting user's to enter the
                  details in the Title and Diary fields beneath the map. To
                  submit a new entry, complete these fields and press the "Add a
                  Travel Diary" button.
                </p>
                <p>
                  If a location has not been selected before entering a
                  submission, an alert will pop up telling you to select a
                  location first.
                </p>
              </div>
              <div className="help">
                <h4>To view your own entries</h4>
                <p>
                  Open the sidebar, by selecting the burger menu icon in the top
                  left and select "My Travel Diaries.
                </p>
                <p>
                  Here you will see all of your diary entries listed as blog
                  posts, with a title, diary entry, the co-ordinates and buttons
                  to edit/delete an entry.
                </p>
                <p>
                  If you want to edit an entry, select the edit button for that
                  entry and fields will appear asking you to re-submit a title
                  and diary entry. Once completed, select update and a pop up
                  will confirm that the diary has been updated.
                </p>
                <p>
                  To delete an entry, press delete. Once pressed, a pop up will
                  confirm that the entry has been deleted.
                </p>
              </div>
            </div>
          </Row>
          <Container className="container"></Container>
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

export default Help;
