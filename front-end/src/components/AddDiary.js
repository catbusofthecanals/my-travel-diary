import React, { useState, useEffect, useCallback } from "react";
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
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
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

  const handleSearch = (e) => {
    e.preventDefault();
    userSearch();
  };

  // use API to get lat long co-ordinates from input location
  async function userSearch() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "67e9cf954dmsha2b8bd42556b4b2p11357bjsn57ff88883aae",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${location}`,
      options
    )
      .then((res) => res.json())
      .then(
        (res) => {
          //assigned the information needed to variables

          setNewPlace({
            lat: res.data[0].latitude,
            long: res.data[0].longitude,
          });

          return new Promise(function (resolve, reject) {
            setTimeout(() => {
              resolve();
            }, 1100);
          });
        },
        (error) => {
          console.log(error);
        }
      );

    alert(newPlace.lat);
    alert(newPlace.long);
    setViewState({
      ...viewState,
      latitude: newPlace.lat,
      longitude: newPlace.long,
    });
    setLocation("");
  }

  const handleAddDiary = (e) => {
    e.preventDefault();
    addDiary();
  };

  // handle logging out by setting states to null and navigating to home page
  const handleLogOut = (e) => {
    setUsername("");
    setToken("");
    navigate("/");
  };

  const addDiary = async () => {
    let lat = newPlace.lat;
    let long = newPlace.long;

    if (token === "") {
      alert("Please log in to add a todo");
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
          "Authorization": `Bearer ${token}`,
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

  // when clicking on a marker, set current place and viewstate to current lat and long
  const handleMarkerClick = (_id, lat, long) => {
    setCurrentPlaceId(_id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

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
                onClick={handleSearch}
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
                {/* if there are pins, map array to display marker and pop up*/}
                {myPins &&
                  myPins.map((myPin) => (
                    <>
                      <Marker
                        key={myPin._id}
                        longitude={myPin.long}
                        latitude={myPin.lat}
                      >
                        <RoomIcon
                          style={{
                            fontSize: 8 * viewState.zoom,
                            color: "tomato",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleMarkerClick(myPin._id, myPin.lat, myPin.long)
                          }
                        />
                      </Marker>
                      {currentPlaceId === myPin._id && (
                        <Popup
                          longitude={myPin.long}
                          latitude={myPin.lat}
                          anchor="left"
                          onClose={() => setCurrentPlaceId(null)}
                        >
                          <div className="card">
                            <label>Place:</label>
                            <h4>{myPin.title}</h4>
                            <label>My Diary:</label>
                            <p>{myPin.desc}</p>
                            <span className="username">
                              Written by {myPin.username}
                            </span>
                          </div>
                        </Popup>
                      )}
                    </>
                  ))}
              </Map>
            </Container>
          </Col>
          <Col></Col>
        </Row>
        <Row className="space_above">
          <Col></Col>
          <Col xs={6}>
            <Container className="wb">
              <form className="form_center" onSubmit={handleAddDiary}>
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
