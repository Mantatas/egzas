const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

router.use(authController.protect);
router.get("/profile", (req, res) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

module.exports = router;
