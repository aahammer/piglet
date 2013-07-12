var net = require('net');
var spawn = require('child_process').spawn

var HOST = process.env.IP;
var PORT = 17000;

var shellcomand = 'echo';

function command(regexp, callback){
    
var extract    = spawn(shellcommand, [regexp]);

    extract.stdout.on('data', function (data) {
        
      console.log('stdout: ' + data);
      
      /* Here return callback data in the final version */
      //callback(data);
      callback('Hello World');
      
    });
    
    extract.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    
    extract.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });
}

net.createServer(function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);   
        command(data, function(result) { sock.write(result);})   
    });
    
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
 
 

    