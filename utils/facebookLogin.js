import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({});

export const facebookLogin = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
        callbackURL: "api/v1/auth/facebook/callback",
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
};
