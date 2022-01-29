import JWT from "jsonwebtoken";
import Token from "../models/Token.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = JWT.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = JWT.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "15d",
    });
    // const accessToken = JWT.sign(payload, process.env.JWT_ACCESS_SECRET, {
    //   expiresIn: "10s",
    // });
    // const refreshToken = JWT.sign(payload, process.env.JWT_REFRESH_SECRET, {
    //   expiresIn: "50s",
    // });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = JWT.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = JWT.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
