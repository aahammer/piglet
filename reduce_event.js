#!/usr/bin/env node

var readline = require('readline');
var count = 0;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var sequence = [];
var current_key='';

rl.on('line', function (line) {  
     

    var key = line.split('\t')[0];
    var data = JSON.parse(line.split('\t')[1]);
 
    current_key = (current_key === '') ? key : current_key;
    
    if (current_key !== key) {

        current_key = key;
        output();
    }
    sequence.push(data);

  //  process.stdout.write( y.time);
});

rl.on('close', function() {
    output();
});

function output(){
    
    var sortedSequence = sequence.sort(function(a,b){return a.time - b.time});
    var output ='';
    for (var i = 0; i < sortedSequence.length; i++) {
    output = output +  sortedSequence[i].activity + ' -> ';
    }
    sequence =[];
    process.stdout.write(output.substr(0,output.length - 4) + '\n');
}


