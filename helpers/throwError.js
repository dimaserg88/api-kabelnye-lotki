export default function (data) {
    let err = new Error()
    err.response = data
    throw err;
}