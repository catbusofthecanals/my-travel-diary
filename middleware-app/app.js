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

// add routes and custom middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/pins", checkJWTToken, pinRoute);

let PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Application up and running on port: " + PORT);
});

module.exports = app;
