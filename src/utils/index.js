const { apiConstants } = require("./constant");

require("./constant");
class Utils {
  response(res, data, message, status, success) {
    const responseObj = {
      success: success,
      status: status,
      message: message,
      data: data,
    };
    res.json(responseObj);
  }
  handleError(res, message, statusCode) {
    switch (statusCode) {
      case apiConstants.RESPONSE_CODES.SERVER_ERROR:
        return res.status(statusCode).json({
          success: false,
          message: message,
          statusCode: statusCode,
        });
      case apiConstants.RESPONSE_CODES.BAD_REQUEST:
        return res.status(statusCode).json({
          success: false,
          message: message,
          statusCode: statusCode,
        });
      default:
        return res.status(statusCode).json({
          success: false,
          message: message,
          statusCode: statusCode,
        });
    }
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
};
// module.exports = {
//   apiConstants,
//   apiEndpoints,
//   apiFailureMessage,
//   apiSuccessMessage,
//   genericConstants,
//   stringConstants,
// };
