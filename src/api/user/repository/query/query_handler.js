const { ErrorHandler } = require("../../../../handler/error");
const { DB } = require("../../../../config/db");
const UserQueryModel = require("./query_model");
const UserQuery = require("./query");
const { text } = require("body-parser");
class QueryHandler {
  constructor() {
    this.db = new DB();
    this.model = new UserQueryModel();
  }

  async findAll() {
    try {
      const sql = "SELECT * FROM user_tb";
      const handler = new UserQuery(this.db.db, sql);
      var response = await handler.getUser();
      return response;
    } catch (error) {
      throw new ErrorHandler.ServerError();
    }
  }

  async findUserByEmail(param) {
    const { error } = this.model.validateParamFindByEmail(param);
    if (error) {
      throw new ErrorHandler.BadRequestError(error);
    } else {
      try {
        let sql = `SELECT * FROM user_tb WHERE email = $1`;

        const querySql = {
          text: sql,
          values: [param.email],
        };
        const query = new UserQuery(this.db.db, querySql);
        var response = await query.getUser();

        return response;
      } catch (error) {
        throw new ErrorHandler.ServerError(error);
      }
    }
  }
  async findUserByNameOrEmail(param) {
    const { error } = this.model.validateParamFindByEmalOrName(param);
    if (error) {
      throw new ErrorHandler.BadRequestError(error);
    } else {
      try {
        let sql = `SELECT * FROM user_tb WHERE `;
        let count = 0;
        let value = [];
        let conditions = [];

        if (typeof param.email !== "undefined") {
          conditions.push(`email ILIKE  $${conditions.length + 1}`);
          value.push(`%${param.email}%`);
          count++;
        }
        if (typeof param.nama !== "undefined") {
          conditions.push(`nama ILIKE  $${conditions.length + 1}`);
          value.push(`%${param.nama}%`);
          count++;
        }
        sql += conditions.join(" OR ");

        const querySql = {
          text: sql,
          values: value,
        };
        const query = new UserQuery(this.db.db, querySql);
        var response = await query.getUser();
        return response;
      } catch (error) {
        throw new ErrorHandler.ServerError(error);
      }
    }
  }
}

module.exports = QueryHandler;
