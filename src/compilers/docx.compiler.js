var xmlreader = require('xmlreader');
var xmldoc = require('xmldoc');
var Q = require('q');

var extractParaghraphs = function (xml) {
    var deferred = Q.defer();
    var document = new xmldoc.XmlDocument(xml);
    console.log(document.toString());

    xmlreader.read(document.toString(), function (err, res) {
        if (err) deferred.reject(err);
        //console.log(res['w:document']);
        deferred.resolve(res['w:document']['w:body']['w:p']);
        //cb(res['w:document']['w:body']['w:p']);
    });
    return deferred.promise;
};

var extractText = function(para){
    //cb(para['w:r']['w:t'].text());
    return para['w:r']['w:t'].text();
}

module.exports = {
    extractParaghraphs: extractParaghraphs,
    extractText: extractText    
}









