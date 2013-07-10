#!/usr/bin/env node

var readline = require('readline');
var count = 0;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  console.log(count+ ':'+line );
  count++;
});


