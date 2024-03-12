
class Response {
    constructor(data, status = 200, error = null) {
        this.data = data;
        this.status = status;
        this.error = error;
    }
}

module.exports = Response;