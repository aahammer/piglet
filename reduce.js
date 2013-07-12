#!/usr/bin/env node

var readline = require('readline');
var count = 0;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var sequence = [];

rl.on('line', function (line) {  
    
    sequence.push(
        JSON.parse(line.split('\t')[1])
        
        );

  //  process.stdout.write( y.time);
});

rl.on('close', function() {
     var sortedSequence = sequence.sort(function(a,b){return b.time - a.time});
     var output ='';
     for (var i = 0; i < sortedSequence.length; i++) {
         output = output +  sortedSequence[i].activity + ' -> ';
     }
     process.stdout.write(output.substr(0,output.length - 4));
});


