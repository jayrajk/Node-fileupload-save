const http = require('http');
const formidable = require('formidable');
const fs= require('fs');

http.createServer((req,res)=>{
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            var oldpath = files.filetoupload.path;
            var newpath = '/home/lcom18/Documents/Jayraj/Node-fileupload-save/files/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    }else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(4001);

console.log("Server started on port 4001");