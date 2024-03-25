class ResponseBody {
	constructor(success = false, message = "", data = {}) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
	set isSuccess(value) {
		this.success = value;
	}
	set responseMessage(value) {
		this.message = value;
	}
	set objectData(value) {
		this.data = value;
	}
}

module.exports = ResponseBody;
