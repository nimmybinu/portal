const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
passport.use(
    new GoogleStrategy(
        {
            //option gor google strategy
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3500/api/v1/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            //passport cb function
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    )
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

