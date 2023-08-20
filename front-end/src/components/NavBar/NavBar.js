import React from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import home from "../../images/home.svg";
import SideBar from "../SideBar/SideBar";
import Search from "../Search";
import Logo from "../../images/logo.png";

const NavBar = ({ username, token, handleLogOut, admin, pins }) => {
  const navigate = useNavigate();

  // use navigate to link to home and pass props through state
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/home", {
      state: {
        username: username,
        token: token,
        admin: admin,
      },
    });
  };

  return (
    <div id="outer-container">
      {/* pass admin state and other props to Sidebar component */}
      <SideBar
        username={username}
        token={token}
        admin={admin}
        handleLogOut={handleLogOut}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        pins={pins}
      />
      <div id="page-wrap" className="navbar_barContent">
        <Row>
          <Col xs={3}>
            {" "}
            <img
              className="navbar-logo"
              src={Logo}
              width="150px"
              alt="logo icon"
            />
          </Col>
          <Col className="t-left" xs={2}>
            <Search pins={pins} />
          </Col>
          <Col xs={4}></Col>
          <Col xs={3} className="t-right" style={{ display: "flex" }}>
            {/* display welcome message to current user */}
            <span>Welcome {username}</span> {/* navigate to home */}
            <Link onClick={handleHome} to="/home">
              <img
                className="navbar_img"
                src={home}
                width="25px"
                alt="home icon"
              />
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NavBar;
