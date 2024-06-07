const ProdukQueryModel = require("./query_model");
const ProdukQuery = require("./query");
const { ErrorHandler } = require("../../../handler/error");
const { DB } = require("../../../config/db");

class ProdukQueryHandler {
  constructor() {
    this.db = new DB();
    this.model = new ProdukQueryModel();
    this.handler = new ProdukQuery(this.db.db);
  }
  async getAllAvailableProduct(params) {
    const sql = {
      text: `SELECT a.product_id,a.nama,a.deskripsi FROM product_tb a JOIN(SELECT * FROM booking_tb b WHERE b.tanggal_booking LIKE $1)b ON b.product_id <> a.product_id`,
      values: [params.tanggal],
    };
    var response;

    await this.db.db
      .query(sql)
      .then((a) => {
        response = a.rows;
      })
      .catch((e) => {
        throw new ErrorHandler.ServerError(e);
      });
    // var response = await this.handler.getProduct(sql);
    return response;
  }
  async getAll() {
    try {
      const sql = "SELECT * FROM product_tb";

      var response = await this.handler.getProduct(sql);
      return response;
    } catch (error) {
      throw new ErrorHandler.ServerError();
    }
  }
}

module.exports = ProdukQueryHandler;
