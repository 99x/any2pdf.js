var xmlreader = require('xmlreader');
var xmldoc = require('xmldoc');
var Q = require('q');

var extractParaghraphs = function (xml) {
    var deferred = Q.defer();
    var document = new xmldoc.XmlDocument(xml);
    console.log(document.toString());

    xmlreader.read(document.toString(), function (err, res) {
        if (err) deferred.reject(err);
        deferred.resolve(res['w:document']['w:body']['w:p']);
    });
    return deferred.promise;
};

var extractText = function (para) {
    return para['w:r']['w:t'].text();
}

var extractParagraphProperty = function (para) {
    var paragraphProperty = {
        style: null,
    }
    if(para['w:pPr'] && para['w:pPr']['w:pStyle'])
        paragraphProperty.style = para['w:pPr']['w:pStyle'].attributes()['w:val'].toLowerCase();
    return paragraphProperty;
}

module.exports = {
    extractParaghraphs: extractParaghraphs,
    extractText: extractText,
    extractParagraphProperty: extractParagraphProperty
}









