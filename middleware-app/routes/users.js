const User = require("../models/User");
let jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// POST method to sign up
router.post("/register", async (req, res) => {
  // get username and password/ confirm password vaules from front end
  const { username, email, password, confPassword } = req.body;
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // check if input details already exist in database
    const existingUser = await User.findOne({ username: username });
    // if in database send message
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // if password doesn't equal confirm password value send message
    else if (password !== confPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }
    // else creact new user from input details
    else {
      const userInfo = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        admin: req.body.admin,
      });
      // use save function to create a new document
      await userInfo.save();
      console.log(userInfo);
      res.status(201).json({ message: "User added", userInfo: userInfo });
    }
  } catch (error) {
    // send error message if there is an error
    console.log(error);
    res.status(500).send(error);
  }
});

// POST method to log in
router.post("/login", async (req, res) => {
  // get username and password vaules from front end
  const { username, password } = req.body;
  try {
    // find user
    const user = await User.findOne({ username: username });
    // validate password
    const validPassword = await bcrypt.compare(password, user.password);

    // if username doesn't exist
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // send response
    else if (validPassword && username == user.username) {
      let jwtToken = jwt.sign(
        {
          username: User.username,
          password: User.password,
        },
        "secretKey",
        { expiresIn: "24h" }
      );
      res.send({ message: jwtToken, user: user });
    } else {
      return res
        .status(400)
        .json({ message: "User does not exist. Please sign up." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET method to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE method to delete by ID
router.delete("/delete/:_id", async (req, res) => {
  // find user by ID and delete method
  try {
    const deletedUser = await User.findByIdAndDelete(req.params._id);
    if (!deletedUser) {
      // send error message if there is an error
      res.status(404).send("User is not found");
      return;
    }
    // else successfully delete object by ID
    else {
      res.status(200).json({
        message: "User deleted",
        user: deletedUser,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
