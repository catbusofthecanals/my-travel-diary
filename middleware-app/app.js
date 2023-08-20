var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// secure app with helmet
app.use(helmet());

dotenv.config();

// connect to mongodb url
const dbConnect = require("./db/dbConnect");

// excecute database connection
dbConnect();

let { checkJWTToken } = require("../middleware-app/middleware");

const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const authRoute = require("./routes/auth");

/* search GeoDB Rapid API using GET request
app.get(`/search`, (req, res) => {
  // get search parameters from user input on front end
  const location = req.query.location;

  // fetch request to iTunes API using the term and media type input by user
  fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${location}`
  )
    .then((result) => result.json())
    .then((response) => {
      // if search was successful send response
      res.send({ response });
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve();
        }, 1100);
      });
    })

    .catch((error) => {
      // otherwise if error send error message, have to send as JSON message rather than string to avoid error
      res.send({ message: "Error" });
    });
}); */

// add routes and custom middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/pins", checkJWTToken, pinRoute);

let PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Application up and running on port: " + PORT);
});

module.exports = app;
