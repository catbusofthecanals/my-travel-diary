import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../components/NavBar/NavBar";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import "../App.css";

const AddDiary = () => {
  // set initial states
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [myPins, setMyPins] = useState([]);
  const [viewState, setViewState] = React.useState({
    latitude: 55,
    longitude: -3.18,
    zoom: 4,
  });
  const { state } = useLocation();
  const navigate = useNavigate();

  // declare username, admin and token passed as props
  const userAdmin = state.admin;
  const userUN = state.username;
  const userTkn = state.token;

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
      const myPins = await result.json();
      // set result in todo state
      setMyPins(myPins.myPins);
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

  const addDiary = async (e) => {
    e.preventDefault();
    let lat = newPlace.lat;
    let long = newPlace.long;
    console.log(lat);
    console.log(long);

    if (token === "") {
      alert("Please log in to add a todo");
    } else if (lat === null || long === null) {
      alert("Please choose a location before submitting an entry");
    } else {
      // fetch function with post method and token
      const newPin = {
        username: username,
        token: token,
        title: title,
        desc: desc,
        lat: lat,
        long: long,
      };
      const res = await fetch("/add/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`,
          token: token,
        },
        body: JSON.stringify({ newPin }),
      })
        .then((res) => res.json())
        .catch((error) => console.log("Error:", error));
      setMyPins([...myPins, res]);
      setNewPlace(null);
      setTitle("");
      setDesc("");
    }
  };

  // on click of map set lat and long in new place state
  const handleAddClick = (e) => {
    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };

  // set variable for markers for pins
  const myMarkers = useMemo(() =>
    myPins.map((myPin) => (
      <Marker
        onClick={(e) => {
          /* was having an issue of the pop ups working but researched and learned that stopPropagation stops the pop ups from automatically closing
          Available here: https://github.com/visgl/react-map-gl/blob/7.1-release/examples/controls/src/app.tsx
          */
          e.originalEvent.stopPropagation();
          // set information for current pin in state
          setCurrentPlace(myPin);
          setViewState({
            ...viewState,
            latitude: myPin.lat,
            longitude: myPin.long,
          });
        }}
        key={myPin._id}
        longitude={myPin.long}
        latitude={myPin.lat}
      >
        <RoomIcon
          style={{
            fontSize: 8 * viewState.zoom,
            color: username === myPin.username ? "tomato" : "slateblue",
            cursor: "pointer",
          }}
        />
      </Marker>
    ))
  );

  return (
    <div>
      <NavBar
        username={username}
        token={token}
        handleLogOut={handleLogOut}
        admin={admin}
      />
      <div className="container">
        <Row className="space_above">
          <Col></Col>
          <Col xs={6}>
            <Container className="wb">
              <p>
                Enter a location below or click on the map to write your diary
                entry:
              </p>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                text="text"
                placeholder="Enter a location"
              />
              <button
                // onClick={handleSearch}
                className="submitButton"
                type="submit"
              >
                Search Location
              </button>
            </Container>
          </Col>
          <Col></Col>
        </Row>
        <Row className="space_above">
          <Col></Col>
          <Col>
            {" "}
            <Container>
              <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: "60vw", height: "35vh" }}
                mapStyle="mapbox://styles/catbus23/cll9po6ap00o601pigjw7ejkx"
                onDblClick={handleAddClick}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              >
                {/* if a new place has a lat long value, show pop up*/}
                {newPlace && (
                  <Popup
                    longitude={newPlace.long}
                    latitude={newPlace.lat}
                    anchor="left"
                    onClose={() => setNewPlace(null)}
                  >
                    <div>Add an entry for this location below!</div>
                  </Popup>
                )}
                {/* if there are pins, map array to display myMarkers*/}
                {myMarkers}
                {/* if a pin exists in current place state, display pop up */}
                {currentPlace && (
                  <Popup
                    longitude={currentPlace.long}
                    latitude={currentPlace.lat}
                    anchor="left"
                    onClose={() => setCurrentPlace(null)}
                  >
                    <div className="card">
                      <label>Place:</label>
                      <h4>{currentPlace.title}</h4>
                      <label>My Diary:</label>
                      <p>{currentPlace.desc}</p>
                      <span className="username">
                        Written by {currentPlace.username}
                      </span>
                    </div>
                  </Popup>
                )}
              </Map>
            </Container>
          </Col>
          <Col></Col>
        </Row>
        <Row className="space_above">
          <Col></Col>
          <Col xs={6}>
            <Container className="wb">
              <form className="form_center" onSubmit={addDiary}>
                <h4>Title</h4>
                <input
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <h4>Diary</h4>
                <textarea
                  placeholder="Enter Travel Diary entry..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <button className="submitButton" type="submit">
                  Add Travel Diary
                </button>
              </form>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};

export default AddDiary;
