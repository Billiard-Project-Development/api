const { Utils } = require("../utils/index");
const { ErrorHandler } = require("../handler/error");
const util = new Utils();
const bodyParser = require("body-parser");
const { routing } = require("../middleware/validation");
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use("/api/v1", (req, res, next) => {
    routing(req, res, app);
    next();
  });
  app.get("/", (req, res) => res.send("<h1>p</h1>"));
  app.get("/api", (req, res) => res.send("<h1>WELCOME GES</h1>"));
};
