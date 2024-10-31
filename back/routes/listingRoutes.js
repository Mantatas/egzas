const express = require("express");
const listingController = require("../controllers/listingController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(listingController.getAllListings)
  .post(
    authController.protect,
    authController.restrictTo("user", "admin"),
    listingController.addListing
  );

router
  .route("/:id")
  .get(listingController.getListing)
  .patch(
    authController.protect,
    authController.restrictTo("user", "admin"),
    listingController.updateListing
  )
  .delete(
    authController.protect,
    authController.restrictTo("user", "admin"),
    listingController.removeListing
  );

module.exports = router;
