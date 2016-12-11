module.exports = {
    createPdfDocDefinition: function (text1, text2) {

/*                var docDefinition = {
                    content: [
                        { text: 'This is a header', style: 'header' },
                        'No styling here, this is a standard paragraph',
                        { text: 'Another text', style: 'anotherStyle' },
                        { text: 'Multiple styles applied', style: ['header', 'anotherStyle'] }
                    ],
        
                    styles: {
                        header: {
                            fontSize: 22,
                            bold: true
                        },
                        anotherStyle: {
                            italics: true,
                            alignment: 'right'
                        }
                    }
                };*/
        function createStyle(styleParams) {

            var styleParamString = "";
            for (var i in styleParams) {
                val = styleParams[i];
                styleParamString = styleParamString + "," + val;
            }

            styleParamString = styleParamString.slice(1, styleParamString.length)

         return  styleParamString;
        }

        function createIndividualContent(textToShow, nameOfStyle) {
            return {
                text: textToShow,
                style: nameOfStyle
            };
        }

        function createContent() {

            var contentBody = "dewdwe";

            return {
                content: [
                    createIndividualContent(text1, "header"),
                    createIndividualContent(text2, "anotherStyle")
                ],
                styles: {
                    header: createStyle(['fontSize: 22', 'bold: true']),
                    anotherStyle: createStyle(["italics: true" , "alignment: right"])
                }
            }
        }

        docDefinition = createContent();

        return docDefinition;
    }
}