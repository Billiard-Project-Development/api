const { ErrorHandler } = require("../handler/error");
const { apiConstants, Utils } = require("../utils");
const util = new Utils();
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    util.handleError(req, res, new ErrorHandler.UnauthorizedError());

  jwt.verify(token, apiConstants.TOKEN_SECRET.ACCESS_TOKEN, (err, user) => {
    if (err) util.handleError(req, res, new ErrorHandler.ForbiddenError());
  });
  next();
};
