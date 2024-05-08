import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import passport from "passport";
const route = express.Router();

/* Client start ============= */
route.get("/google", passport.authenticate("google", { scope: ["profile"] }));
route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/",
  })
);
/* Google OAuth end ============= */
/* Facebook OAuth start ============= */
route.get("/facebook", passport.authenticate("facebook"));
route.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173/",
    successRedirect: "http://localhost:5173/",
  })
);
/* Facebook OAuth end ============= */

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);

export default route;
