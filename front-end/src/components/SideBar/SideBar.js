import React from "react";
import "./SideBar.css";
import { slide as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ username, token, handleLogOut, admin, pins }) => {
  const navigate = useNavigate();

  // function to handle navigation to add diary component, pass props as state
  const navAddDiary = (e) => {
    e.preventDefault();
    navigate("/home/add", {
      state: {
        username: username,
        token: token,
        admin: admin,
      },
    });
  };

  // function to handle navigation to diary list component, pass props as state
  const navMyDiaries = (e) => {
    e.preventDefault();
    navigate("/home/diaries", {
      state: {
        username: username,
        token: token,
        admin: admin,
      },
    });
  };

  // function to handle navigation to admin area, pass props as state
  const navAdminArea = (e) => {
    e.preventDefault();
    navigate("/home/admin", {
      state: {
        username: username,
        token: token,
        admin: admin,
        pins: pins,
      },
    });
  };
  // if user is an admin show hidden admin area
  if (admin === true) {
    return (
      <Menu>
        <h3>My Travel Diaries</h3>
        {/* navigate to add a diary component  */}
        <Link className="menu-item" onClick={navAddDiary} to="/home/add">
          Add a Travel Diary
        </Link>
        {/* navigate to my diary list component */}
        <Link className="menu-item" onClick={navMyDiaries} to="/home/diaries">
          My Travel Diaries
        </Link>
        {/* navigate to admin area component */}
        <Link className="menu-item" onClick={navAdminArea} to="/home/admin">
          Admin Area
        </Link>
        {/* call log out function */}
        <Link className="button" to="/" onClick={handleLogOut}>
          Log Out
        </Link>
      </Menu>
    );
  }
  // else return regular user side bar
  else {
    return (
      <Menu>
        <h3>My Travel Diaries</h3>
        {/* navigate to add a diary component  */}
        <Link className="menu-item" onClick={navAddDiary} to="/home/add">
          Add a Travel Diary
        </Link>
        {/* navigate to my diary list component */}
        <Link className="menu-item" onClick={navMyDiaries} to="/home/diaries">
          My Travel Diaries
        </Link>
        {/* call log out function */}
        <Link className="button" to="/" onClick={handleLogOut}>
          Log Out
        </Link>
      </Menu>
    );
  }
};

export default SideBar;
