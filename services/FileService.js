import User from '../models/User.js';
import path from 'path';
import fs from 'fs';
import cryptoRandomString from "crypto-random-string";


class FileService {
    async uploadUserAvatar(user, file) {
        let newAvatarName = cryptoRandomString({ length: 10 }) + '.jpg'
        fs.stat(path.resolve('uploads', user, 'profile'), async function (err) {
            if (!err) {
                file.mv(path.resolve('uploads', user, 'profile', newAvatarName))
            } else {
                fs.mkdir(path.resolve('uploads', user, 'profile'), { recursive: true }, async (err) => {
                    if (err) throwError({ code: 'mkdir-user-profile-avatar-upload-error', data: '' })
                    file.mv(path.resolve('uploads', user, 'profile', newAvatarName))
                })
            }
        })
        return {
            name: newAvatarName,
        }
    }
}

export default new FileService();