const express = require("express");
const router = express.Router();
const passport = require("passport");



router.get("/login/success", (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  }
});

router.get("/login/failure", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.LOGOUT_REDIRECT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.LOGOUT_REDIRECT_URL,
    failureRedirect: "/login/failure",
  })
);

module.exports = router;
