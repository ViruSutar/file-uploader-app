const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../Models/User");
dotenv.config({ path: "./.env" });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
   User.findById(id, (err, user) => {
    done(err, user);
  });

});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3334/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        // console.log("MY Profile", profile);
        const user = await User.findOne({ email: profile._json.email });

        if (user) {
          console.log(`user already exists in the DB ${user}`);
          next(null, user);
        } else {
          await User.create({
            name: profile.displayName,
            email: profile._json.email,
          });

          next(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
