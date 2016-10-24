// module.exports = {

// };

var fs = require('fs');
var Promise = require('promise');
var parseString = require('xml2js').parseString;
var XMLExtract = require('xml-extract');
var xmlreader = require('xmlreader');

var pdfCreation = require('./createPdf');
var PdfPrinter = require('pdfmake');

var text1 = "";
var text2 = "";

function openFile(path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function doFirst(data) {
	parseString(data, function (err, result) {
		if (err) { 
			console.log(err.message); 
		}
	
		var some = JSON.stringify(result);
		var json = JSON.parse(some);

		var body = json['w:document']['w:body'][0];

		for (var key in body) {

			body = body[key]; // wp

			var insideObj = body;
			//console.log(insideObj);

			for (var keykey in insideObj) {

				body = body[keykey];

				var insideinsideObj = body; //wr
				//console.log(insideinsideObj);

				for (var keykeykey in insideinsideObj) {
					//console.log(keykeykey);

					if (keykeykey == "w:r") {
						//console.log('yay');
						body = body[keykeykey];

						var insideinsideinsideObj = body; //wr

						for (var keykeykeykey in insideinsideinsideObj) {
							//console.log(insideinsideinsideObj[keykeykeykey]); //wt

							for (var wtstuff in insideinsideinsideObj[keykeykeykey]) {
								//console.log(wtstuff);

								if (wtstuff == "w:rPr") { //bold
									console.log("Bold - " + insideinsideinsideObj[keykeykeykey]["w:t"]);
									text1 = insideinsideinsideObj[keykeykeykey]["w:t"][0];
									console.log(text1);
									break;
								}
								// if (wtstuff == "w:t") {
								// 	console.log("Not Bold - " + insideinsideinsideObj[keykeykeykey][0][0]);
								// 	text2 = insideinsideinsideObj[keykeykeykey][0][0];
								// 	break;
								// }
							}
						}
					}
				}
			}
		}
	});
}
function doNext() {
	console.log('fuck -' + text1);
	var definition = pdfCreation.createPdfDocDefinition(text1, text2);

	console.log(definition);
	//pdfMake.createPdf(definition).open();

	var fonts = {
		Roboto: {
			normal: 'fonts/Roboto-Regular.ttf',
			bold: 'fonts/Roboto-Medium.ttf',
			italics: 'fonts/Roboto-Italic.ttf',
			bolditalics: 'fonts/Roboto-Italic.ttf'
		}
	};

	var printer = new PdfPrinter(fonts);

	var pdfDoc = printer.createPdfKitDocument(definition);

	pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
	pdfDoc.end();
}

openFile("E:/any2pdf.js/src/HelloWorld.docx/word/document.xml")
.then(function (data) {
	doFirst(data);
	doNext();
});



