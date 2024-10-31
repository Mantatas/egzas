const Listing = require("../models/listingModel");

exports.addListing = async (req, res) => {
  try {
    const newListing = await Listing.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      image: req.body.image,
      category: req.body.category,
      user: req.user.id,
      createdAt: req.body.createdAt,
    });
    console.log(newListing);
    res.status(201).json({
      status: "success",
      data: newListing,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed to create a listing",
      message: err.message,
    });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json({
      status: "success",
      data: listings,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed to get all listings",
      message: err.message,
    });
  }
};

exports.getListing = async (req, res) => {
  const searchTerm = req.query.q;
  const categoryFilter = req.query.category;
  const locationFilter = req.query.location;
  const queryObj = {};
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" };
  }

  if (categoryFilter) {
    queryObj.category = categoryFilter;
  }

  if (locationFilter) {
    queryObj.location = locationFilter;
  }

  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: listing,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed to get a listing",
      message: err.message,
    });
  }
};

exports.removeListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({
        status: "failed",
        message: "Listing not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: listing,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed to delete a listing",
      message: err.message,
    });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!listing) {
      return res.status(404).json({
        status: "failed",
        message: "Listing not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: listing,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed to update a listing",
      message: err.message,
    });
  }
};
