import React, { useState } from "react";
import "../App.css";

const DiaryItem = ({ token, myPin, fetchMyPins, username }) => {
  // set initial states
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // get id from item id
  const id = myPin._id;
  const userToken = myPin.token;

  const updatePin = async (e) => {
    // fetch PUT method with data variable filled with the new title value
    e.preventDefault();
    if (token === userToken) {
      await fetch(`/api/pins/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`,
          token: token,
        },
        body: JSON.stringify({
          username: username,
          newTitle: newTitle,
          newDesc: newDesc,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      alert("Diary updated");
      // set edit back to false
      setEdit(false);
      // call fetch todo to return updated todo
      fetchMyPins();
    } else {
      alert("You can only edit your own posts");
      // set edit back to false
      setEdit(false);
      // call fetch todo to return updated todo
      fetchMyPins();
    }
  };

  const deletePin = async () => {
    if (token === userToken) {
      await fetch(`api/pins/delete/${id}`, {
        method: "DELETE",
        headers: {
          // "Authorization": `Bearer ${token}`,
          token: token,
        },
      });
      alert("Diary removed");
      fetchMyPins();
    } else {
      alert("You can only delete your own diaries");
      fetchMyPins();
    }
  };

  const handleDeletePin = (e) => {
    e.preventDefault();
    // run delete function
    deletePin();
  };

  // if edit state is true than display fields to edit values for project
  if (edit) {
    return (
      <div className="Card">
        <form className="form_center">
          <h4>Title</h4>
          <input
            id="editTitle"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit diary title"
          />
          <h4>Diary</h4>
          <textarea
            id="editDesc"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Edit diary entry"
          />
          <button
            className="btn btn-primary mb-2"
            onClick={updatePin}
            type="submit"
            id="submitButton"
          >
            Update
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="Card">
      <div className="Card--text">
        <h4>
          <strong>{myPin.title}</strong>
        </h4>
        <span>
          <em>
            latitude {myPin.lat}, longitude {myPin.long}
          </em>
        </span>
        <p className="Card--diary">{myPin.desc}</p>
        <span>
          written by <em>{myPin.username}</em>
        </span>
      </div>
      <div className="Card--button">
        <button className="button" onClick={(e) => setEdit(true)}>
          Edit
        </button>
        <button onClick={handleDeletePin} className="button">
          Delete
        </button>
      </div>
    </div>
  );
};
export default DiaryItem;
