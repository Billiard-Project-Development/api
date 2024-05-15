const { userSchema } = require("../../models/user");
const db = require("../../../../config/db/index");
class UserCommand {
  constructor() {
    this.db = db;
  }
  static async createUser(account) {
    return await userSchema;
  }
}
