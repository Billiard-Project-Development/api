const { ErrorHandler } = require("../handler/error");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const { routing } = require("../middleware/validation");
module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use("/v1", (req, res, next) => {
    routing(req, res, app);
    next();
  });
  app.get("/", (req, res) => res.send("<h1>p</h1>"));
  app.get("/api", (req, res) => res.send("<h1>WELCOME GES</h1>"));
};
