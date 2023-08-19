import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "../components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import "../App.css";

const Home = () => {
  // set initial states
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = React.useState({
    latitude: 55,
    longitude: -3.18,
    zoom: 4,
  });

  // declare state via useLocation to use username and token props
  const { state } = useLocation();
  const navigate = useNavigate();

  // declare username and token passed as props
  const userUN = state.username;
  const userTkn = state.token;
  const userAdmin = state.admin;

  // use callback function to avoid dependencies error, looked up tutorial on useeffect here: https://overreacted.io/a-complete-guide-to-useeffect/
  const fetchPins = useCallback(async () => {
    // if the value of token isn't null then run request
    if (token !== "") {
      console.log(admin);
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
        console.log(pins);
        setPins(pins);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token, admin]);

  // add dependencies
  useEffect(() => {
    setUsername(userUN);
    setToken(userTkn);
    setAdmin(userAdmin);
    // run fetch pins function
    fetchPins();
  }, [userUN, userTkn, userAdmin, fetchPins]);

  // handle logging out by setting states to null and navigating to home page
  const handleLogOut = (e) => {
    setAdmin("");
    setUsername("");
    setToken("");
    navigate("/");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let lat = newPlace.lat;
    let long = newPlace.long;

    const newPin = {
      username: username,
      token: token,
      title: title,
      desc: desc,
      long: long,
      lat: lat,
    };

    console.log(newPin);

    try {
      const res = await fetch("/api/pins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}`,
          token: token,
        },
        body: JSON.stringify(newPin),
      });
      setPins([...pins, res]);
      setNewPlace(null);
      setTitle("");
      setDesc("");
    } catch (err) {
      console.log(err);
    }
  };

  // if user if logged in display user profile and todos
  if (username !== "") {
    return (
      <div className="App">
        <NavBar
          username={username}
          token={token}
          handleLogOut={handleLogOut}
          admin={admin}
          pins={pins}
        />
        <Container className="container">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: "90vw", height: "70vh" }}
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
                <div>
                  <form className="form" onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Diary</label>
                    <textarea
                      placeholder="Enter Travel Diary entry..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <button className="submitButton" type="submit">
                      Add Travel Diary
                    </button>
                  </form>
                </div>
              </Popup>
            )}
            {/* if there are pins, map array to display marker and pop up*/}
            {pins &&
              pins.map((pin) => (
                <>
                  <Marker key={pin._id} longitude={pin.long} latitude={pin.lat}>
                    <RoomIcon
                      style={{
                        fontSize: 8 * viewState.zoom,
                        color:
                          username === pin.username ? "tomato" : "slateblue",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleMarkerClick(pin._id, pin.lat, pin.long)
                      }
                    />
                  </Marker>
                  {currentPlaceId === pin._id && (
                    <Popup
                      longitude={pin.long}
                      latitude={pin.lat}
                      anchor="left"
                      onClose={() => setCurrentPlaceId(null)}
                    >
                      <div className="card">
                        <label>Place:</label>
                        <h4>{pin.title}</h4>
                        <label>My Diary:</label>
                        <p>{pin.desc}</p>
                        <span className="username">
                          Written by {pin.username}
                        </span>
                      </div>
                    </Popup>
                  )}
                </>
              ))}
          </Map>

          <button className="button" onClick={handleLogOut}>
            Log Out
          </button>
        </Container>
      </div>
    );
  }

  // else if not logged in display buttons to navigate to login or sign up pages
  else {
    return (
      <div>
        <Container className="container">
          <div>
            Please log in or sign up to create a My Travel Diary account:
          </div>
          <Link to="/">
            <button>Log In</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </Container>
      </div>
    );
  }
};

export default Home;
