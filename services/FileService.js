import path from "path";
import fs from "fs";
import cryptoRandomString from "crypto-random-string";
import xlsx from "node-xlsx";

class FileService {
  async uploadUserAvatar(user, file) {
    let newAvatarName = cryptoRandomString({ length: 10 }) + ".jpg";
    fs.stat(path.resolve("uploads", user, "profile"), async function (err) {
      if (!err) {
        file.mv(path.resolve("uploads", user, "profile", newAvatarName));
      } else {
        fs.mkdir(
          path.resolve("uploads", user, "profile"),
          { recursive: true },
          async (err) => {
            if (err)
              throwError({
                code: "mkdir-user-profile-avatar-upload-error",
                data: "",
              });
            file.mv(path.resolve("uploads", user, "profile", newAvatarName));
          }
        );
      }
    });
    return {
      name: newAvatarName,
    };
  }

  async uploadUserXls(file) {
    fs.stat(path.resolve("uploads", "xls"), async function (err) {
      if (!err) {
        await file.mv(path.resolve("uploads", "xls", file.name));
      } else {
        fs.mkdir(
          path.resolve("uploads", "xls"),
          { recursive: true },
          async (err) => {
            if (err) {
              throwError({
                code: "mkdir-xls-upload-error",
                data: "",
              });
            }
            await file.mv(path.resolve("uploads", "xls", file.name));
          }
        );
      }
    });
    return file.name;
  }
}

export default new FileService();
