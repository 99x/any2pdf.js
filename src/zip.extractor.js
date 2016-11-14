var JSZip = require("jszip");

exports.openArrayBuffer = openArrayBuffer;

function openArrayBuffer(arrayBuffer) {
    var zipFile = new JSZip(arrayBuffer);
    function exists(name) {
        return zipFile.file(name) !== null;
    }
    
    function read(name, encoding) {
        var array = zipFile.file(name).asUint8Array();
        var buffer = new Buffer(array);
        if (encoding) {
            return promises.when(buffer.toString(encoding));
        } else {
            return promises.when(buffer);
        }
    }
    
    function write(name, contents) {
        zipFile.file(name, contents);
    }
    
    function toBuffer() {
        return zipFile.generate({type: "nodebuffer"});
    }
    
    return {
        exists: exists,
        read: read,
        write: write,
        toBuffer: toBuffer
    };
}

var fs = require('fs');
var Promise = require('promise');
var unzip = require('unzip');
var Stream = require('stream');
var XMLExtract = require('xml-extract');
var ws = new Stream;
ws.writable = true;
ws.bytes = 0;

ws.write = function(buf) {
   ws.bytes += buf.length;
}

ws.end = function(buf) {
   if(arguments.length) ws.write(buf);
   ws.writable = false;

   console.log('bytes length: ' + ws.bytes);
   console.log(bin2String(ws));
}

function openFile(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, 'utf8', function(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

//fs.createReadStream('/Users/shamal/Documents/Projects/Hello Docx.docx').pipe(unzip.Extract({ path: '/Users/shamal/Documents/Projects/' }));
fs.createReadStream('/Users/shamal/Documents/Projects/Hello Docx.docx').pipe(unzip.Parse()).on('entry', function(entry){

    if(entry.path === 'word/document.xml'){
        entry.pipe(ws);
        //console.dir(ws);

        //console.log(string);
        // XMLExtract(ws, 'w:body', false, (error, element) => {
        //     if(error){
        //         throw new Error(error);
        //     }
        //     console.log(element);

        // });
    }else{
        entry.autodrain();
    }
});

function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}



