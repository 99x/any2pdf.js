var xmlreader = require('xmlreader');
var xmldoc = require('xmldoc');

var extractParaghraphs = function (xml, cb) {
    var document = new xmldoc.XmlDocument(xml);
    console.log(document.toString());

    xmlreader.read(document.toString(), function (err, res) {
        if (err) return console.log(err);
        //console.log(res['w:document']);
        cb(res['w:document']['w:body']['w:p']);
    });
};

var extractText = function(para, cb){
    cb(para['w:r']['w:t'].text());
}



module.exports = {
    extractParaghraphs: extractParaghraphs,
    extractText: extractText    
}









