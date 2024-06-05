const Auth = require("../api/auth");
const QueryHandler = require("../api/user/repository/query/query_handler");
const CommandHandler = require("../api/user/repository/command/command_handler");

const { ErrorHandler } = require("../handler/error");
const { Utils, apiConstants } = require("../utils");
const queryHandler = new QueryHandler();
const commandHandler = new CommandHandler();
const util = new Utils();
const bodyParser = require("body-parser");
const auth = new Auth();
module.exports = (app) => {
  app.use(bodyParser.json());

  app.post("/api/v1/auth/login", async (req, res) => {
    try {
      var response = await auth.login(req, res);
      util.response(res, response, "Success", 200, true);
    } catch (error) {
      util.handleError(req, res, error);
    }
  });
  app.post("/api/v1/auth/register", async (req, res) => {
    try {
      var response = await auth.register(req, res);

      util.response(res, response, "Registrasi Success", 200, true);
    } catch (error) {
      util.handleError(req, res, error);
    }
  });
  app.post("/api/v1/auth/refreshToken", async (req, res) => {
    try {
      var response = await auth.refreshToken(req, res);
      util.response(res, response, "Success", 200, true);
    } catch (error) {
      util.handleError(req, res, error);
    }
  });
};
