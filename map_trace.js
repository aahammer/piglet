#!/usr/bin/env node

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
    var output = line.slice(0,-1) +'\t1\n';
    process.stdout.write(output);

});
