var fs1 = require('fs');
var content;
var languages = [];
var keys = [];
var parser = new (require('simple-excel-to-json').XlsParser)();
var doc = parser.parseXls2Json('MasterTranslation.xlsx');

fs1.readFile('Config.json', function read(err, data) {
    if (err) {
        throw err;
    }
    content = JSON.parse(data);

    processFile();
});

function processFile() {
    keys = content['keys'];
    languages = content['supportedLanguages'];

    for (let j = 0; j < languages.length; j++) {
        let lang = languages[j];
        let result = {};
        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = doc[0][findByKey(keys[i])][lang];
        }

        result = JSON.stringify(result);
        var fs = require("fs");
        var file = "result/" + lang + ".json";
        fs.writeFile(file, result, function (err) {
            if (err) console.log('error', err);
        });
    }
}

function findByKey(key) {
    for (let i = 0; i < doc[0].length; i++) {
        if (doc[0][i]["Keys"] == key) {
            return i;
        }
    }
}












