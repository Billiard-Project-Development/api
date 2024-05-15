const errorHandler = require("../../../../handler/error").ErrorHandler;
const { validateUser, UserModel } = require("../../models/user");

class UserCommandHandler {
  constructor(command, db) {
    this.command = command;
    this.db = db;
  }
  static async createNewUser(command) {
    const { error } = validateUser(command);
    if (error) {
      throw new errorHandler.BadRequestError();
    }
    const query = "INSERT INTO user_tb(nama,email,noHp,password)";

    const { nama, email, noHp, password } = command;
    try {
      const res = await db.query(query, [nama, email, noHp, password]);

      return res.rows[0];
    } catch (err) {
      throw new errorHandler.ServerError();
    }
  }
}

module.exports = {
  CreateUserCommandHandler,
};
