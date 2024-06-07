const { util, apiConstants } = require("../utils/index");
const { ErrorHandler } = require("../handler/error");
const bodyParser = require("body-parser");
const { authenticateToken } = require("../middleware/authentication");
const BookingCommandHandler = require("../api/booking/repository/command/command_handler");
const BookingQueryHandler = require("../api/booking/repository/query/query_handler");
const commandHandler = new BookingCommandHandler();
const queryHandler = new BookingQueryHandler();
module.exports = (app) => {
  app.use(bodyParser.json());
  app.get("/v1/booking/getAll", authenticateToken, async (req, res) => {
    try {
      var response = await queryHandler.getAllBookingList();
      util.response(res, response, "Success", 200, true);
    } catch (error) {
      util.handleError(req, res, error);
    }
  });
  app.post("/v1/booking/createBook", authenticateToken, async (req, res) => {
    try {
      var response = await commandHandler.createBooking(req.body);

      util.response(res, response, "Success", 200, true);
    } catch (error) {
      util.handleError(req, res, error);
    }
  });
  app.get(
    "/v1/booking/getItemById/:orderId",
    authenticateToken,
    async (req, res) => {
      try {
        var response = await queryHandler.getTransactionById(
          req.params.orderId
        );
        util.response(res, response, "Success", 200, true);
      } catch (error) {
        util.handleError(req, res, error);
      }
    }
  );
  app.get(
    "/v1/booking/getStatus/:order_id",
    authenticateToken,
    async (req, res) => {
      try {
        var response = await queryHandler.getTransacionStatus(
          req.params.order_id
        );
        util.response(
          res,
          response,
          apiConstants.SUCCESS_MESSAGE.FETCH_SUCCESS,
          200,
          true
        );
      } catch (error) {
        util.handleError(req, res, error);
      }
    }
  );
};
