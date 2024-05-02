import { Strategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config({});

// GOOGLE_OAUTH_CLIENT_ID;
// GOOGLE_OAUTH_CLIENT_SECRET;

// export const googleLogin = (passport) => {
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        let user = User.findOne({
          googleId: profile.googleId,
        });
        if (!user) {
          await User.create({
            googleId: profile.googleId,
            fullName: profile.fullName,
            email: profile.emails[0].value,
            userName: profile.emails[0].value.split("@")[0],
            image: profile.photos[0].value,
          });
        }
        cb(null, user);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
// };
