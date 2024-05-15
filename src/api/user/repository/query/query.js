const { DB } = require("../../../../config/db");
const { ErrorHandler } = require("../../../../handler/error");
const QueryHandler = require("./query_handler");

class UserQuery {
  constructor() {
    this.db = new DB();
    this.handlers = {};
  }
  async getAll() {
    const handler = new QueryHandler(this.db.db);

    try {
      var response = await handler.getAllUser();
      return response;
    } catch (error) {
      throw new ErrorHandler.BadRequestError();
    }
  }
  registerHandler(queryName, handler) {
    this.handlers[queryName] = handler;
  }
  async execute(query) {
    const queryName = query.constructor.name;
    const handler = this.handlers[queryName];
    if (!handler) {
      throw new ErrorHandler.NotFoundError();
    }
    return handler.handle(query);
  }
}
module.exports = UserQuery;
