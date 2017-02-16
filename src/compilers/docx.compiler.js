/**
 * Created by shamal on 12/11/16.
 */
var docx = (function(){
    'use strict';
    zip.workerScriptsPath = 'lib/zipjs/';
    //Configuration files
    var configs = ['word/document.xml'];
    function compile(blob, p){
        var files = [];
        zip.createReader(new zip.BlobReader(blob), function(reader){
            reader.getEntries(function(entries){
                entries.forEach(function(entry){
                    configs.forEach(function (config) {
                        if(entry.filename === config){
                            files.push(entry);
                        }
                    });
                });

                p(files);
            });
        });
    }

    function extract(content){
        var document = new XmlDocument(content);
        console.log(document)
        console.log(document.children[0].children[0].children[0].children[0].val)

    }

    return {
        compile: compile,
        extract: extract
    }
})();





