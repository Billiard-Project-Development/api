const userRoute = require("../router/user");
const authRoute = require("../router/auth");
const bookingRoute = require("../router/booking");
const productRoute = require("../router/produk");
const { util } = require("../utils");
const validate = async (schema, req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    util.responseForValidation(res, e);
  }
};
const routing = async (req, res, app) => {
  if (req.path.includes("/user")) {
    userRoute(app);
  }
  if (req.path.includes("/booking")) {
    bookingRoute(app);
  }
  if (req.path.includes("/auth")) {
    authRoute(app);
  }
  if (req.path.includes("/product")) {
    productRoute(app);
  }
};
module.exports = {
  validate,
  routing,
};
