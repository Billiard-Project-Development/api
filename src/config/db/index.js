const pg = require("pg");
const { Pool, Client } = pg;
const fs = require("fs");
require("dotenv").config();
const { DB_ENVIRONMENT, util, apiConstants } = require("../../utils/index");

class DB {
  constructor(
    user = DB_ENVIRONMENT.DB_USER,
    host = DB_ENVIRONMENT.DB_HOST,
    database = DB_ENVIRONMENT.DB_DATABASE,
    password = DB_ENVIRONMENT.DB_PASS,
    sslPostgre = DB_ENVIRONMENT.DB_SSL,
    port = DB_ENVIRONMENT.DB_PORT
  ) {
    this.user = user;
    this.host = host;
    this.database = database;
    this.password = password;
    this.port = port;
    this.ssl = sslPostgre;
    this.db = new Pool({
      // connectionString:
      //   "postgres://avnadmin:AVNS_B_5DmtPlNcdc0nByjDd@bdp-pg-billiard-project.e.aivencloud.com:13097/defaultdb?sslmode=require",
      user: this.user,
      host: this.host,
      database: this.database,
      password: this.password,
      port: this.port,
      // ssl: {
      //   rejectUnauthorized: true,
      //   ca: this.sslPostgre,
      // },
    });
  }
  async connect() {
    try {
      await this.db.connect();
      console.log("db connected successfully");
    } catch (error) {
      console.log(error);
    }

    // this.db.connect(function (err) {
    //   if (err) throw err;
    //   this.db.query("SELECT VERSION()", [], function (err, result) {
    //     if (err) throw err;

    //     console.log(result.rows[0].version);
    //     console.log("Db succesfully connected");
    //   });
    // });
  }
}

exports.DB = DB;
