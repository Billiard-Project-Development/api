const { DB } = require("../../../config/db");
const { ErrorHandler } = require("../../../handler/error");
const { util } = require("../../../utils");
const ProdukCommand = require("./command");
const ProdukCommandModel = require("./command_model");
const errorHandler = ErrorHandler;
class ProdukCommandHandler {
  constructor() {
    this.db = new DB();
    this.model = new ProdukCommandModel();
  }
  async addProduk(body) {
    const { error } = this.model.validateUserInput(body);
    if (error) {
      throw new errorHandler.BadRequestError(error);
    } else {
      const sql = {
        text: util.commandInsertSQL("produk"),
        values: [body.nama, body.harga, body.deskripsi],
      };
      const command = new ProdukCommand(this.db.db, sql);
      try {
        await command.create().catch((err) => {
          throw new errorHandler.ServerError(err);
        });
        return {
          nama: body.nama,
          email: body.email,
        };
      } catch (error) {
        throw new errorHandler.ServerError(error);
      }
    }
  }
}

module.exports = ProdukCommandHandler;
