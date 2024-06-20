const express = require("express");
const router = express.Router();
require("../config/passport-setup");
const passport = require("passport");

const {
    registerUser,
    loginUser,
    googleAuth,
    googleAuthCallback,
    googleAuthLoginFailed,
    googleAuthLoginSuccess,
    loadPage,
} = require("../controllers/userController");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// Google OAuth login route
router.route("/auth/google").get(googleAuth);

// Google OAuth callback route
router.route("/auth/google/callback").get(googleAuthCallback);

//Google OAuth login failed
router.route("/login/failed").get(googleAuthLoginFailed);
//Google OAuth login success
router.route("/login/success").get(googleAuthLoginSuccess);

module.exports = router;
