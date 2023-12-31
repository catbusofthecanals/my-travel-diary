const router = require("express").Router();
const Pin = require("../models/Pin");

// POST method to create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET method to get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET method to display all pins under one username
router.get("/user", async (req, res) => {
  try {
    // use find to return all documents in collection
    /* send username to backend from frontend and used req query */
    const myPins = await Pin.find({ username: req.query.username });
    res.status(200).json({ myPins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured in retrieving the user's pins" });
  }
});

// DELETE method to delete by ID
router.delete("/delete/:_id", async (req, res) => {
  // find pin by ID and delete method
  try {
    const deletedPin = await Pin.findByIdAndDelete(req.params._id);

    if (!deletedPin) {
      // send error message if there is an error
      res.status(404).json({ message: "Pin is not found" });
      return;
    }
    // else successfully delete object by ID
    else {
      res.status(200).json({
        message: "Pin deleted",
        pin: deletedPin,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT method to update document by ID
router.put("/update/:_id", async (req, res) => {
  // find pin by ID method and update
  try {
    const updatePin = await Pin.findByIdAndUpdate(
      req.params._id,
      // get parameters from document data
      {
        title: req.body.newTitle,
        desc: req.body.newDesc,
      },
      {
        new: true,
        returnDocument: "after",
      }
    );
    // send 404 error message to indicate nothing was found
    if (!updatePin) {
      res.status(404).send("Sorry, no matching diary found");
      return;
    }
    // else successfully update object by ID
    else {
      res.status(200).json({
        message: "Diary updated",
        pin: updatePin,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
