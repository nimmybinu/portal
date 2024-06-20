const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const passport = require("passport");

app.use(express.json());
app.use(cookieParser());

//session
const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        name: "session",
        keys: ["somesessionkey"],
        maxAge: 24 * 60 * 60 * 100,
    })
);
//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Route imports
const user = require("./routes/userRoute");

app.use("/api/v1", user);

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
