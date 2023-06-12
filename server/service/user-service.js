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
        name
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
    if (!refreshToken) {
      throw new Error("Token Error1");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = tokenModel.findOne({ refreshToken });

    if (!userData || !tokenFromDb) {
      throw new Error("Token Error2");
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
