#!/usr/bin/env node

var readline = require('readline');
var count = 0;


console.log("Runnnjinngn");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
    
    var error;
    var regexp;
    try {
        regexp = new RegExp('\\w+:(\\w+)', 'g');
    }
    catch (e) {
        return;
    }
    finally {}
  
    var value = {};
    value.time = regexp.exec(line)[1];
    var trace = regexp.exec(line)[1];
    value.activity =regexp.exec(line)[1];
    
    var output = trace + '\t' + JSON.stringify(value) + '\n';
    process.stdout.write(output);

});
