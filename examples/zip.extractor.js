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

fs.createReadStream('/Users/shamal/Documents/Projects/Hello Docx.docx').pipe(unzip.Extract({ path: '/Users/shamal/Documents/Projects/' }));
