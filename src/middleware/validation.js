const utils = require("../utils");
const userRoute = require("../router/user");
const authRoute = require("../router/auth");
const validate = async (schema, req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    utils.Utils.responseForValidation(res, e);
  }
};
const routing = async (req, res, app) => {
  if (req.path.includes("/user")) {
    userRoute(app);
  }
  if (req.path.includes("/booking")) {
  }
  if (req.path.includes("auth")) {
    authRoute(app);
  }
};
module.exports = {
  validate,
  routing,
};
