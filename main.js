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

  var docDefinition = {
    content: [],
    styles: {
      heading1: {
        fontSize: 22,
        bold: true
      },
      heading2: {
        fontSize: 20
      }
    }
  };

  function extract(content) {
    try {
      bundle.extractParaghraphs(content).then(function (paragraphs) {
        console.log(paragraphs);
        var text = [];
        var bulletList = [];
        paragraphs.each(function (i, p) {
          if (p['w:r']) {
            var t = {
              text: bundle.extractText(p)
            };
            var s = bundle.extractParagraphProperty(p).style;
            if (s) {
              t['style'] = s;
              if (t.style === 'listparagraph') {
                delete t.style;
                bulletList.push(t.text);
              } else if (bulletList.length > 0) {
                text.push({
                  ul: bulletList
                });
                bulletList = [];
                text.push(t);
              } else {
                text.push(t);
              }
            }
            else{
              text.push(t);
            }
          }
        });
        if (bulletList.length > 0) {
          text.push({
            ul: bulletList
          });
          bulletList = [];
        }
        docDefinition.content = text;
        print(docDefinition);
      });
    } catch (error) {
      console.log(error);
    }

  }

  function print(docDefinition) {

    pdfMake.createPdf(docDefinition).open();
  }

  return {
    compile: compile,
    extract: extract,
    print: print
  }

})();





