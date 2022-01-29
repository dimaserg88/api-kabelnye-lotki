import validator from 'validator';


class Validator {
    error = {}

    nameSurname = (val) => {
        if (!validator.isAlpha(val, 'en-US') &&
            !validator.isAlpha(val, 'ru-RU')) {
            this.error = { code: 'not-valid-namesurname', data: val }
            return false
        }
        if (val.length < 1) {
            this.error = { code: 'not-valid-namesurname-length-min', data: val }
            return false
        }
        if (val.length > 15) {
            this.error = { code: 'not-valid-namesurname-length-max', data: val }
            return false
        }
        return val
    }

    username = (val) => {
        if (!validator.isAlphanumeric(val, 'en-US', { ignore: '_.' })) {
            this.error = { code: 'not-valid-username', data: val }
            return false
        }
        if (val.length < 4) {
            this.error = { code: 'not-valid-username-length-min', data: val }
            return false
        }
        if (val.length > 14) {
            this.error = { code: 'not-valid-username-length-max', data: val }
            return false
        }
        return true
    }

    email = (val) => {
        if (!validator.isEmail(val)) {
            this.error = { code: 'not-valid-email', data: val }
            return false
        }
        return true
    }

    password = (val) => {
        if (!validator.isAlphanumeric(val, 'en-US', { ignore: '_!.' })) {
            this.error = { code: 'not-valid-password', data: val }
            return false
        }
        if (val.length < 6) {
            this.error = { code: 'not-valid-password-length-min', data: val }
            return false
        }
        if (val.length > 50) {
            this.error = { code: 'not-valid-password-length-max', data: val }
            return false
        }
        return true
    }
}

export default new Validator()