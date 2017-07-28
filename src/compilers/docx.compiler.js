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
        /*var document = new XmlDocument(content);
        console.log(document)
        console.log(document.children[0].children[0].children[0].children[0].val)*/
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(content, "text/xml");
        console.log(content);
        
        var wordNodes = xmlDoc.getElementsByTagName('t');

        console.log(xmlDoc.getElementsByTagName('t'));
        
        var wordLine = "";
        for (var i = 0; i < wordNodes.length; i++) {
            wordLine = wordLine + wordNodes[i].innerHTML + "<br/>";
        }

        $('#content').html(wordNodes);

        var doc = new jsPDF()

        doc.fromHTML(wordLine, 15, 15, {
            'width': 170
        });
        /*doc.fromHTML($('body').get(0), 15, 15, {
            'width': 170
        });*/

        //doc.text(wordLine, 10, 10)
        doc.save('output.pdf')


    }

    return {
        compile: compile,
        extract: extract
    }
})();





