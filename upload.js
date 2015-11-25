var http=require('http');
var fs=require('fs');
var formidable=require('formidable');

var firstPage=function(res){
	res.writeHead(200,{'Content-type':'text/html'});
	var html=fs.readFileSync(__dirname+'/public/form.html');
	res.end(html);
}

var resultPage=function(res,data,files){
	res.setHeader('Content-type','text/html');
	res.write('<p>thanks '+data.name+'</p>');
	res.write('<ul>');
	console.log(data);
	console.log(files);

	if(Array.isArray(files.images)){
		files.images.forEach(function(image){
			var kb=image.size/1024|0;
			res.write('<li>uploaded '+image.name+':'+kb+'kb</li>');
		});
	}else{
		var image=files.images;
		var kb=image.size/1024|0;
		res.write('<li>uploaded '+image.name+':'+kb+'kb</li>');
	}
	res.end('</ul>');
}

var server=http.createServer(function(req,res){
	if(req.method=='GET'){
		return firstPage(res);
	}
	var form = new formidable.IncomingForm;  
    var data = {};  
    var files = {};

	form.uploadDir = __dirname +'/file';  
    form.keepExtensions = true;  
  
    function ondata(name, val, data){  
        if (Array.isArray(data[name])) {//数组   
            data[name].push(val);  
        } else if (data[name]) {//同key   
            data[name] = [data[name], val];  
        } else {//第一次   
            data[name] = val;  
        }  
    }  
  
    form.on('field', function(name, val){  
        ondata(name, val, data);  
    });  
  
    form.on('file', function(name, val){  
        ondata(name, val, files);  
    });  
    form.on('end', function() {  
        resultPage(res,data,files);   
    });  
  
    form.parse(req);  
});
server.listen(12345);
console.log('server running on http://127.0.0.1:12345');