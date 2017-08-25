/**
 * Created by shamal on 12/11/16.
 */

var docx = (function () {
  'use strict';

  zip.workerScriptsPath = 'lib/zipjs/';
  //Configuration files
  var configs = ['word/document.xml'];
  function compile(blob, p) {
    var files = [];
    zip.createReader(new zip.BlobReader(blob), function (reader) {
      reader.getEntries(function (entries) {
        entries.forEach(function (entry) {
          configs.forEach(function (config) {
            if (entry.filename === config) {
              files.push(entry);
            }
          });
        });

        p(files);
      });
    });
  }

  function extract(content) {
    bundle.extractParaghraphs(content, function(para){
      console.log(para);
      para.each(function(i, p){
        if(p['w:r']){
          bundle.extractText(p, function(text){
            console.log(text);
          });
        }
      });
    });
  }

  return {
    compile: compile,
    extract: extract
  }
})();





