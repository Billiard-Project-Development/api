const { ErrorHandler } = require("../handler/error");
const { apiConstants, util } = require("../utils");
const jwt = require("jsonwebtoken");
exports.isAuthentication = (req, res, next, app) => {
  app.use(
    session({
      secret: "Just a simple login/sign up application.",
      resave: true,
      saveUninitialized: true,
    })
  );
  passport.use(
    new LocalStrategy({ usernameField: "email" }, User.authenticate())
  );
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
exports.authenticateToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    util.handleError(req, res, new ErrorHandler.ForbiddenError());
  } else {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      util.handleError(req, res, new ErrorHandler.UnauthorizedError());

    jwt.verify(token, apiConstants.TOKEN_SECRET.ACCESS_TOKEN, (err, user) => {
      if (err) {
        util.handleError(req, res, new ErrorHandler.ForbiddenError(err));
      } else {
        next();
      }
    });
  }
};
exports.authenticateAdminToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    util.handleError(req, res, new ErrorHandler.UnauthorizedError());
  }
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    util.handleError(req, res, new ErrorHandler.UnauthorizedError());

  jwt.verify(token, apiConstants.TOKEN_SECRET.ACCESS_TOKEN, (err, user) => {
    if (err) {
      util.handleError(req, res, new ErrorHandler.UnauthorizedError(err));
    }

    if (user.role != 1) {
      util.handleError(req, res, new ErrorHandler.ForbiddenError(err));
    }
    next();
  });
};
