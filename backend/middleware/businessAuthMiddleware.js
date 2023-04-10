const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Business = require("../models/businessModel");

const businessProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token - remove password from returned object.
      req.business = await Business.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized to view this page");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
});

module.exports = { businessProtect };
