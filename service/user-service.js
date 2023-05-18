const UserModel = require('../models/user-model');
const bcrrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
const TokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./token-service');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest('пользователь уже существует');
    }
    const saltRounds = 10;
    const hashPassword = await bcrrypt.hash(password, saltRounds);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email: email,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userdto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userdto });
    await TokenService.saveToken(userdto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: { ...userdto },
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Wrong Link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь не был найден');
    }
    const isPassEqual = await bcrrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userdto = new UserDto(user);
    const token = TokenService.generateToken({ ...userdto });
    await TokenService.saveToken(userdto.id, token.refreshToken);
    return {
      ...token,
      user: { ...userdto },
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnautorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken({ refreshToken });
    if (!userData || tokenFromDb) {
      throw ApiError.UnautorizedError;
    }
    const user = await UserModel.findById(userData.id);
    const userdto = new UserDto(user);
    const token = TokenService.generateToken({ ...userdto });
    await TokenService.saveToken(userdto.id, token.refreshToken);
    return {
      ...token,
      user: { ...userdto },
    };
  }
}

module.exports = new UserService();
