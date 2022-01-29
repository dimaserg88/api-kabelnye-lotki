import UserService from "../services/UserService.js";
import FileService from "../services/FileService.js";
import User from "../models/User.js";

class UserController {
  async registration(req, res) {
    try {
      const newUser = await UserService.registration(req.body);
      res.cookie("refreshToken", newUser.tokens.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // res.cookie("refreshToken", newUser.tokens.refreshToken, {
      //   maxAge: 50 * 1000,
      //   httpOnly: true,
      // });
      return res.status(200).json({ code: "user-created", data: newUser });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      res.cookie("refreshToken", user.tokens.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // res.cookie("refreshToken", user.tokens.refreshToken, {
      //   maxAge: 50 * 1000,
      //   httpOnly: true,
      // });
      return res.status(200).json({ code: "user-login", data: user });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ code: "logout", data: token });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async activate(req, res) {
    try {
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // res.cookie("refreshToken", userData.tokens.refreshToken, {
      //   maxAge: 50 * 1000,
      //   httpOnly: true,
      // });
      return res.status(200).json({ code: "user-refresh", data: userData });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async updateProfile(req, res) {
    try {
      if (req.files) {
        console.log("ФАЙЛЫ ЕСТЬ");
        if (req.files.avatar) {
          const uploadAvatar = await UserService.updateAvatar(
            req.user.id,
            req.files.avatar
          );
          return res
            .status(200)
            .json({ code: "user-update-avatar", data: { ...uploadAvatar } });
        }
      } else {
        console.log("ФАЙЛОВ НЕТ");
      }

      return res.status(200).json({ code: "user-save-profile", data: "" });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async current(req, res) {
    try {
      console.log("UserController CURRENT");
      const user = await User.findOne({ _id: req.user.id });
      console.log(user);
      res.status(200).json({ code: "user-current", data: user });
      console.log(user);
    } catch (error) {
      console.log("UserController CURRENT ERROR ", error);
      res.status(400).json(error);
    }
  }

  async all(req, res) {
    try {
      res.status(200).json("UserContrlloer AuthMiddle ALL METHOD");
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new UserController();
