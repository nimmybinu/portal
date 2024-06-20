const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const passport = require("passport");
require("../config/passport-setup");
//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, mobile } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        mobile,
    });
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success: true,
    //     token
    // });
    sendToken(user, 200, res);
});
//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Enter email & password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid  email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  email or password", 401));
    }

    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success: true,
    //     token
    // });
    sendToken(user, 200, res);
});
// Google OAuth login
exports.googleAuth = catchAsyncErrors(async (req, res, next) => {
    passport.authenticate("google", { scope: ["email", "profile"] });
});
// Google OAuth callback
exports.googleAuthCallback = catchAsyncErrors(async (req, res, next) => {
    passport.authenticate("google", {
        successRedirect: "http://localhost:4500/api/v1/login/success",
        failureRedirect: "http://localhost:4500/api/v1/login/failed",
    });
});
exports.googleAuthLoginFailed = catchAsyncErrors(async (req, res, next) => {
    return next(new ErrorHandler("google Auth Login failure", 401));
});
exports.googleAuthLoginSuccess = catchAsyncErrors(async (req, res, next) => {
    return next(new ErrorHandler("google Auth Login success", 200));
});
