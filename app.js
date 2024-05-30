const express = require("express");
require("dotenv");
const router = require("./src/router/index");
const { port } = require("./src/config/index");
const app = express();
const util = require("./src/utils/index");
const bodyParser = require("body-parser");
const { DB } = require("./src/config/db");
const db = new DB();
class App {
  static listen() {
    Promise.all([db.connect()]).then(() => {
      app.use(bodyParser.json());

      app.listen(port, (err) => {
        if (err) {
          console.log(err);
          return process.exit(1);
        }
        console.log(`server is running on ${port}`);
      });

      router(app);
    });
  }
}

App.listen();
