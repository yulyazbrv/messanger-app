const UserModel = require("../models/user-model");
const tokenService = require("./tocken-service");
const tockenService = require("./tocken-service");
const UserDto = require("../dtos/user-dto");
const tokenModel = require("../models/tocken-model");
class UserService {
  async login(name) {
    let candidate = await UserModel.findOne({ name });
    if (!candidate) {
      candidate = await UserModel.create({
        name,
      });
    }
    const userDto = new UserDto(candidate);
    const tokens = tockenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, candidate: userDto };
  }

  async logout(refreshToken) {
    const token = await tockenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("Token Error1");
      }

      const tokenFromDb = await tokenModel.findOne({
        refreshTocken: refreshToken,
      });
      if (!tokenFromDb) {
        throw new Error("Token Error2");
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const user = await UserModel.findById(userData.id);
      if (!user) {
        throw new Error("User not found");
      }

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();
