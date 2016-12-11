/**
 * Created by shamal on 12/11/16.
 */
var docx = (function(){
    'use strict';
    zip.workerScriptsPath = 'lib/zipjs/';
    //Configuration files
    var configs = ['docProps/core.xml', 'word/document.xml'];
    function compile(blob){
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
                return files;
            });
        });
    }

    return {
        compile : compile
    }
})();





