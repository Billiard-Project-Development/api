const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const QueryHandler = require("../user/repository/query/query_handler");
const CommandHandler = require("../user/repository/command/command_handler");
const queryHandler = new QueryHandler();
const commandHandler = new CommandHandler();
const { ErrorHandler } = require("../../handler/error");
const { apiConstants } = require("../../utils/index");
const TokenGenerator = require("./token");

class Auth {
  constructor() {}
  async register(req, res) {
    const existingUser = queryHandler.findUserByEmail(req);

    if (existingUser) {
      throw new ErrorHandler.BadRequestError("Email Already Registered");
    } else {
      try {
        await commandHandler.createUser(req.body);
      } catch (error) {
        ErrorHandler.ServerError(error);
      }
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    try {
      var user = await queryHandler.findUserByEmail(req.body);
      if (!user) {
        throw new ErrorHandler.BadRequestError(
          "Email or Password is Incorrect"
        );
      }
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        throw new ErrorHandler.BadRequestError(
          "Email or Password is Incorrect"
        );
      }
      const tokenGenerator = new TokenGenerator({ email: user[0].email });

      var response = tokenGenerator.getAuthToken();
      return response;
    } catch (error) {
      throw new ErrorHandler.ServerError(error);
    }
  }
  async refreshToken(req, res) {
    const { token, email } = req.body;

    try {
      if (token == null)
        throw new ErrorHandler.UnauthorizedError("Token Expired");
      const verifyToken = jwt.verify(
        token,
        apiConstants.TOKEN_SECRET.REFRESH_TOKEN,
        (err, user) => {
          if (err) throw new ErrorHandler.ForbiddenError("Forbidden, Invalid Token");
          return user;
        }
      );
      const tokenGenerator = new TokenGenerator({ email: verifyToken.email });
      const accessToken = await tokenGenerator.generateAccessToken();
      return { newToken: accessToken };
    } catch (error) {
      throw new ErrorHandler.ServerError(error);
    }
  }
}

module.exports = Auth;
