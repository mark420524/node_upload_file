var server=require('./server');
var router=require('./route');
var requestHandlers=require('./requestHandler');

var handle = {};

handle["/"] = requestHandlers.toUpload;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

// 传入路由模块方法, 路径处理方法
server.start(router.route, handle);