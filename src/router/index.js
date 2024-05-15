const { UserModel } = require("../api/user/models/user");
const validator = require("../middleware/validation");
const userRoute = require("./user");

module.exports = (app) => {
  app.use("/api", (req, res, next) => {
    if (req.path.includes("/user")) {
      userRoute(app);
    }
    next();
  });
  app.get("/", (req, res) => res.send("<h1>WELCOME GES</h1>"));
  app.get("/api", (req, res) => res.send("<h1>WELCOME GES</h1>"));
};
