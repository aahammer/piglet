var net = require('net');

var HOST = '127.2.81.129';
var PORT = 17000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('\\w+:(\\w+)');
});

client.on('data', function(data) { 
    console.log('ReturnDATA: ' + data);
    client.destroy(); 
});

client.on('close', function() {
    console.log('Connection closed');
});