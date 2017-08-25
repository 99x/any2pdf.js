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

  // function extract(content) {
  //   bundle.extractParaghraphs(content, function (para) {
  //     console.log(para);
  //     para.each(function (i, p) {
  //       if (p['w:r']) {
  //         bundle.extractText(p, function (text) {
  //           console.log(text);
  //         });
  //       }
  //     });
  //   });
  // }

  function extract(content) {
    bundle.extractParaghraphs(content).then(function (paragraphs) {
      console.log(paragraphs);
      var text = [];
      paragraphs.each(function (i, p) {
        if (p['w:r']) {
          text.push(bundle.extractText(p));
        }
      });
      var docDefinition = {content: text};
      print(docDefinition);
    });
  }

  function print(docDefinition) {
    // var doc = new jsPDF({
    //   orientation: 'p',
    //   unit: 'mm',
    //   format: 'a4',
    // });
    // doc.text(content, 10, 10);
    // doc.save('output.pdf');
    pdfMake.createPdf(docDefinition).open();
  }

  return {
    compile: compile,
    extract: extract,
    print: print
  }

})();





