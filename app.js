const fs = require('fs');
const pdf = require('pdf-parse');
const testFolder = './resume/';
var keyword = ['javascript', 'angularjs', 'angular']

function checkPdf(files){
    let dataBuffer = fs.readFileSync('./resume/'+files);
    var item = pdf(dataBuffer).then(function(data) {
        var pdfVal = data.text.split(/\s+/)
        let i = 0;
        var pdfValLength = pdfVal.length; 
        var totalPoints = 0;
        for(i; i < pdfValLength; i++){
            // Remove special characters
            pdfVal[i] = pdfVal[i].replace(/[^A-Za-z]+/g, '').toLowerCase();
            if(checkKeyword(pdfVal[i])){
                totalPoints += 1;
            }
        };
        return totalPoints
    });
    return item
}

function checkKeyword(word){
    let j = 0;
    var keywordLen = keyword.length; 
    // console.log(word)
    for(j; j < keywordLen; j++){
     
        if(word == keyword[j]){
            return true
        } 
    }
}

fs.readdir(testFolder, (err, files) => {
    files.forEach(async (file) => {
      var points = await checkPdf(file)
      console.log(file + ' ' + points);
    });
});
