var net = require('net');
var spawn = require('child_process').spawn
var fs = require('fs');


var HOST = 'localhost';
var PORT = 17000;

var shellcommzand = 'echo';

function command(regexp, callback){
    

var event_command    =  spawn('./analyze_events.sh',['']);

    event_command.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    
    event_command.on('exit', function (code) {
      
	var trace_command = spawn('./analyze_traces.sh', ['']);
        trace_command.on('exit', function (code) {

            spawn('rm',['sequence.txt']);

             var hdsf_pull    = spawn('hadoop',['fs','-get', '/process/sequence/part-00000','sequence.txt']);

            hdsf_pull.on('exit', function (code) {
               fs.readFile('sequence.txt', function (err, data) {
                if (err) throw err;
                    callback(data);
                });
            });
	});
        console.log('child process exited with code ' + code);
    });
}

net.createServer(function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);   
        command(data, function(result) { sock.write(result);}) ;  
    });
    
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
 
 

    
