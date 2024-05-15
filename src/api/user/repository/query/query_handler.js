const { ErrorHandler } = require("../../../../handler/error");

class QueryHandler {
  constructor(db, query) {
    this.db = db;
    this.query = query;
  }
  async getAllUser() {
    const sql = "SELECT * FROM user_tb";
    try {
      const res = await this.db.query(sql);
      return res.rows[0];
    } catch (err) {
      throw new ErrorHandler.ServerError();
    }
  }
}

module.exports = QueryHandler;
