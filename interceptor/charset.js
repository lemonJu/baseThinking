//接口 intercept
exports.intercept = function(req, resp) {
	console.log("123");
	req.setEncoding(CONFIG.server.charset);
}
