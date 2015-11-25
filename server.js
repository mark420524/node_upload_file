var http = require("http"),
  url = require("url");
function start(route,handler) {
	function onRequest(request,response) {
		var pathname=url.parse(request.url).pathname;
		 // 关闭nodejs 默认访问 favicon.ico
		if (!pathname.indexOf('/favicon.ico')) {
		  return; 
		};
		 // 收到来自 pathname 的请求
		console.log("Request for " + pathname + " received.");

		// 路由器处理
		route(handler, pathname,response,request);

		
	}
	http.createServer(onRequest).listen(54321);
	console.log("Server has start at 54321!");
}

exports.start=start;