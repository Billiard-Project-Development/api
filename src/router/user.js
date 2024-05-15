const UserQuery = require("../api/user/repository/query/query");
const QueryHandler = require("../api/user/repository/query/query_handler");
const { ErrorHandler } = require("../handler/error");
const { Utils } = require("../utils");
const query = new UserQuery();
const queryHandler = new QueryHandler();
query.registerHandler("GetAllUser", QueryHandler);
const util = new Utils();
const { DB } = require("../config/db/index");
const db = new DB();
module.exports = (app) => {
  app.post("/api/user/create/new", async (req, res) => {
    validator.validate;
  });
  app.get("/api/user/get/all", async (req, res) => {
    try {
      const users = await query.getAll();
      util.response(res, users, "Success", 200, true);
    } catch (error) {
      util.handleError(res, error.message, 400);
    }
  });
};
