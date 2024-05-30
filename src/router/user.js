const UserQuery = require("../api/user/repository/query/query");
const QueryHandler = require("../api/user/repository/query/query_handler");
const UserCommand = require("../api/user/repository/command/command");
const CommandHandler = require("../api/user/repository/command/command_handler");
const { ErrorHandler } = require("../handler/error");
const { Utils, apiConstants } = require("../utils");
const queryHandler = new QueryHandler();
const commandHandler = new CommandHandler();
const util = new Utils();
const bodyParser = require("body-parser");
const authenticator = require("../middleware/authentication");
module.exports = (app) => {
  app.use(bodyParser.json());

  app.post("/api/v1/user/create", async (req, res) => {
    try {
      const users = await commandHandler.createUser(req.body);
      util.response(
        res,
        users,
        "Success",
        apiConstants.RESPONSE_CODES.CREATED,
        true
      );
    } catch (error) {
      util.handleError(req, res, error);
    }
  });
  app.get(
    "/api/v1/user/search",
    authenticator.authenticateToken,
    async (req, res) => {
      const params = req.query;
      try {
        var users;
        users = await queryHandler.findUserByNameOrEmail(params);
        util.response(res, users, "Success", 200, true);
      } catch (error) {
        util.handleError(req, res, error);
      }
    }
  );
};
