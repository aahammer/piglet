#!/usr/bin/env node

var readline = require('readline');
var count = 0;
var current_key='';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


rl.on('line', function (line) {  
    
    var key = line.split('\t')[0];
    var data = line.split('\t')[1];
   // process.stdout.write(data);
    current_key = (current_key === '') ? key : current_key;
    
    //process.stdout.write("hallo");
    
    if (current_key !== key) {
        process.stdout.write('Sequence '+ current_key + ' occured ' + count + ' time(s) \n');
        current_key = key;
        count =0;
    }

   count += 1;
  //  process.stdout.write( y.time);
});

rl.on('close', function() {
  process.stdout.write('Sequence '+ current_key + ' occured ' + count + ' time(s) \n');
});
