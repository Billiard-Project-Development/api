const { apiConstants, DB_ENVIRONMENT } = require("./constant");

require("./constant");
class Utils {
  loggedInResponse(){
    var response = {
      
    }
  }
  response(res, data, message, status, success) {
    const responseObj = {
      success: success,
      status: status,
      message: message,
      data: data,
    };
    res.json(responseObj);
  }
  handleError(req, res, err) {
    if (!res) return false;
    err = err || {};

    const msg = err.message
      ? err.message
      : apiConstants.FAILED_MESSAGE.INTERNAL_SERVER_ERROR;
    const code = err.statusCode
      ? err.statusCode
      : apiConstants.RESPONSE_CODES.SERVER_ERROR;
    this.response(res, {}, msg, code, false);
  }
  responseForValidation(res, errorArray, success, code = 400) {
    const responseObj = {
      message: "Invalid Request",
      errors: errorArray,
      success: success,
      responseCode: code,
    };
    res.json(responseObj);
  }
}
module.exports = {
  Utils,
  apiConstants,
  DB_ENVIRONMENT,
};
