const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const router = require("express").Router();

/* followed a tutorial for integrating Google login here https://dev.to/shaancodes/how-to-implement-google-authentication-in-your-react-applications-jb6 */
const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
});
// POST method to authenticate user
router.post("/", async (req, res) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audient: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();
  try {
    // check if google details already exist in database
    const existingUser = await User.findOne({ email: payload?.email });
    // if in database send message
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      userInfo = await new User({
        email: payload?.email,
        username: payload?.name,
      });
      await userInfo.save();
      console.log(userInfo);
      res.status(201).json({ message: "User added", userInfo: userInfo });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
