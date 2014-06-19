/**
 * Created by Vincent on 14/06/14.
 */

'use strict';

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    exec = require("child_process").exec,
    spawn = require("child_process").spawn;

function list(response) {
    console.log("Le gestionnaire 'list' est appelé.");
    exec("find ./tmp -name '*.png' -ls",
        { timeout: 1000, maxBuffer: 20000 * 1024 },
        function(error, stdout, stderr) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(stdout);
            response.end();
        });
}

function start(response) {
    console.log("Le gestionnaire 'start' est appelé.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Transférer le fichier" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Le gestionnaire 'upload' est appelé.");

    var form = new formidable.IncomingForm();
    console.log("Récupération des éléments reçus");
    form.parse(request, function(error, fields, files) {
        console.log("Traitement terminé");

        /* En cas d'erreur sous Windows :
         tentative d'écrasement d'un fichier existant */
        fs.rename(files.upload.path, "/tmp/test.png", function(err) {
            if (err) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Image reçue :<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response, request) {
    console.log("Le gestionnaire 'show' est appelé.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}


function cat(response, request) {
    console.log("Le gestionnaire 'cat' est appelé.");
    cat = spawn('wc');

    cat.stdin.write('hello\n');

    setTimeout(function() {
        cat.stdin.end('bye\n');
    },2000)

    cat.stdout.on('data', function(data,error) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(data);
            response.end();
        }
    });

}

exports.start = start;
exports.list = list;
exports.upload = upload;
exports.show = show;
exports.cat = cat;