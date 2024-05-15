const pg = require("pg");
const { Pool, Client } = pg;
class DB {
  constructor() {
    this.user = "postgres";
    this.host = "localhost";
    this.database = "bdp_db";
    this.password = "rahasia007";
    this.port = 5432;
    this.db = new Pool({
      user: "postgres",
      host: "localhost",
      database: "bdp_db",
      port: 5432,
      password: "rahasia007",
    });
  }
  getConfig() {
    return {
      user: this.user,
      host: this.host,
      database: this.database,
      password: this.password,
      port: this.port,
    };
  }

  async connect() {
    try {
      await this.db.connect();
      console.log("db connected successfully");
    } catch (error) {
      console.log(error);
    }
  }
}

exports.DB = DB;
