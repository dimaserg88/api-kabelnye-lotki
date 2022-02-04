import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import throwError from "../helpers/throwError.js";
import validator from "../helpers/validator.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/UserDto.js";
import FileService from "./FileService.js";

class UserService {
  async registration(data) {
    const { email, name, password } = data;

    if (!validator.email(email)) {
      throwError(validator.error);
    }

    const candidate = await User.findOne({ email });
    if (candidate) {
      throwError({ code: "user-exist", data: candidate.email });
    }

    if (!validator.password(password)) {
      throwError(validator.error);
    }

    if (!validator.nameSurname(name)) {
      throwError(validator.error);
    }

    const salt = bcrypt.genSaltSync(5);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userRole = await Role.findOne({ value: "USER" });
    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
      roles: [userRole.value],
    });
    // await newUser.save();
    const userDto = new UserDto(newUser);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { tokens };
  }

  async login(data) {
    const { email, password } = data;

    if (!validator.email(email)) {
      throwError(validator.error);
    }

    if (!validator.password(password)) {
      throwError(validator.error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throwError({ code: "user-not-exist", data: "" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throwError({ code: "password-not-valid-hash", data: "" });
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      user: {
        id: user.id,
        status: user.status,
        name: user.name,
        surname: user.surname,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar,
      },
      tokens,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async activate() {}

  async current(user_id) {
    const user = await User.findOne({ _id: user_id });
    return {
      user: {
        id: user.id,
        status: user.status,
        name: user.name,
        surname: user.surname,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar,
      },
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throwError({ code: "refresh-token-none", data: "" });
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throwError({ code: "refresh-token-not-valid-not-find", data: "" });
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      user: {
        id: user.id,
        status: user.status,
        name: user.name,
        surname: user.surname,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar,
      },
      tokens,
    };
  }

  async updateAvatar(user, avatar) {
    const uploadAvatar = await FileService.uploadUserAvatar(user, avatar);
    const findUser = await User.findOne({ _id: user });
    findUser.avatar = uploadAvatar.name;
    findUser.save();
    return uploadAvatar;
  }

  async all() {}
}

export default new UserService();
