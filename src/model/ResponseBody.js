class ResponseBody {
	constructor(success = false, message = "", code = 200, data = {}) {
		this.success = success;
		this.message = message;
		this.code = code;
		this.data = data;
	}
	set isSuccess(value) {
		this.success = value;
	}
	set responseMessage(value) {
		this.message = value;
	}
	set statusCode(value) {
		this.code = value;
	}
	set objectData(value) {
		this.data = value;
	}
}

module.exports = ResponseBody;
