const jwt = require("jsonwebtoken");
const { apiConstants } = require("../../utils/index");
class TokenGenerator {
  constructor(user) {
    this.user = user;
  }
  async generateAccessToken() {
    return jwt.sign(this.user, apiConstants.TOKEN_SECRET.ACCESS_TOKEN, {
      expiresIn: "1h",
    });
  }
  async generateRefreshToken() {
    return jwt.sign(this.user, apiConstants.TOKEN_SECRET.REFRESH_TOKEN, {
      expiresIn: "3h",
    });
  }
  async getAuthToken() {
    const accessToken = await this.generateAccessToken();
    const refreshToken = await this.generateRefreshToken();

    let accessTokenExpDate = new Date(Date.now());
    accessTokenExpDate.setHours(accessTokenExpDate.getHours() + 1);
    let refreshTokenExpDate = new Date(Date.now());
    refreshTokenExpDate.setHours(refreshTokenExpDate.getHours() + 3);

    const response = {
      tokenType: "Bearer",
      accessToken: accessToken,
      accessTokenExpDate: Date(accessTokenExpDate),
      refreshToken: refreshToken,
      refreshTokenExpDate: refreshTokenExpDate,
    };

    return response;
  }
}
module.exports = TokenGenerator;
