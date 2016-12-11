"use strict";

var fs = require("fs");
var JSZip = require("jszip");

fs.readFile("HelloWorld.docx", function (err, data) {
    JSZip.loadAsync(data).then(function (zip) {

        var coreXml = zip.files['docProps/core.xml'].data;
        //var file = coreXml._data.toString('utf8');
        console.log(coreXml);
    });
});























/*// or
new JSZip.external.Promise(function (resolve, reject) {
    fs.readFile("HelloWorld.zip", function(err, data) {
        if (err) {
            reject(e);
        } else {
            resolve(data);
        }
    });
}).then(function (data) {
    return JSZip.loadAsync(data);
})
.then(...)


// read a file and add it to a zip
fs.readFile("picture.png", function(err, data) {
    if (err) throw err;
    var zip = new JSZip();
    zip.file("picture.png", data);
});
// or
var contentPromise = new JSZip.external.Promise(function (resolve, reject) {
    fs.readFile("picture.png", function(err, data) {
        if (err) {
            reject(e);
        } else {
            resolve(data);
        }
    });
});
zip.file("picture.png", contentPromise);


// read a file as a stream and add it to a zip
var stream = fs.createReadStream("picture.png");
zip.file("picture.png", stream);*/