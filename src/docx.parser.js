// module.exports = {
	
// };

var fs = require('fs');
var Promise = require('promise');
var xml2js = require('xml2js');
var XMLExtract = require('xml-extract');

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

openFile("/Users/shamal/Documents/Hello Docx.docx/word/document.xml").then(function(data){
	//console.log(data);
	// xml2js.parseString(data, function(err, result){
	// 	console.dir(result);

	// });
	XMLExtract(data, 'w:body', false, (error, element) => {
			if(error){
				throw new Error(error);
			}
			console.log(element);

		});
});



