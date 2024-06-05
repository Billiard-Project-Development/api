const { DB } = require("../../../../config/db");
const { Utils, apiConstants } = require("../../../../utils");
const { ErrorHandler } = require("../../../../handler/error");
const UserQueryHandler = require("../../../user/repository/query/query_handler");
const BookingCommandModel = require("./command_model");
const MidtransClient = require("../../../../service/midtrans_handler");
const BookingCommand = require("./command");
const model = new BookingCommandModel();
const util = new Utils();

class BookingCommandHandler {
  constructor() {
    this.db = new DB();
  }

  async createBooking(body) {
    const { email, product, price, date } = body;
    const { error } = model.validate(body);
    const userhandler = new UserQueryHandler();
    const user = await userhandler.findUserByEmail(body);
    if (error) {
      throw new ErrorHandler.BadRequestError(error);
    }

    if (!user) {
      throw new ErrorHandler.ForbiddenError();
    }
    try {
      const midtrans = new MidtransClient(
        "Order-123-iko",
        price,
        "gopay",
        user[0],
        product
      );
      var status;
      var response = await midtrans
        .createTransactionSnapPrefrence()
        .then(async (val) => {
          status = await midtrans.getTransactionStatus();
        });

      console.log(status);
      var sql = {
        text: "INSERT INTO public.transaction_tb(transaction_id, user_id, tanggal_transaction, product, total_price, status_transaction)  VALUES ($1, $2, $3, $4, $5, $6)",
        values: [
          midtrans.order_id,
          user[0].user_id,
          Date(Date.now().toLocaleString()).split("GMT").first,
          [product],
          price,
          status,
        ],
      };
      const command = new BookingCommand(this.db.db, sql);
      await command.create();

      return {
        res: {
          order_id: midtrans.order_id,
          email: user[0].email,
          date_transaction: Date(Date.now().toLocaleString()).split("GMT")
            .first,
          product: [product],
          total_price: price,
          status: status,
        },
        response,
      };
    } catch (error) {
      throw new ErrorHandler.ServerError(error);
    }
  }
  async createTransaction(body) {
    const fetch = require("node-fetch");

    const url = "https://api.sandbox.midtrans.com/v2/charge";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic U0ItTWlkLXNlcnZlci1MX200RkhzV2hzbWRoWVpZUVdnSWtfWmI=`,
      },
      body: JSON.stringify({
        payment_type: "gopay",
        transaction_details: {
          order_id: "billiard-order-id-12788134",
          gross_amount: 100000,
        },
        customer_details: {
          first_name: "Budi",
          last_name: "Utomo",
          email: "budi.utomo@midtrans.com",
          phone: "081223323423",
          customer_details_required_fields: ["email", "first_name", "phone"],
        },
        custom_field1: "tes 123",
        custom_field2: "tes 123",

        custom_expiry: { expiry_duration: 60, unit: "minute" },
      }),
    };

    const response = await fetch(url, options);
    const dataTransaksi = await response.json();
    console.log(dataTransaksi);
    if (dataTransaksi.status_code != 201) {
      throw new ErrorHandler.BadRequestError();
    }
    return dataTransaksi;
  }
}
module.exports = BookingCommandHandler;
