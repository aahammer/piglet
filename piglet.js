var net = require('net');
var spawn = require('child_process').spawn
var fs = require('fs');


var HOST = process.env.IP;
var PORT = 17000;

var shellcommzand = 'echo';

function command(regexp, callback){
    

var event_command    = spawn('./analyze_events.sh');

    event_command.stdout.on('data', function (data) {
      
       var trace_command = spawn('./analyze_traces.sh');
       
       trace_command.stdout.on('data', function (data) {
            
            spawn('rm',['sequence.txt']);
           
            var hdsf_pull    = spawn('hadoop',['fs','-pull /process/sequence/part-00000 sequence.txt']);
            hdsf_pull.stdout.on('data', function (data) {
                fs.readFile('./local_test_client/process.log', function (err, data) {
                if (err) throw err;
                    callback(data);
                });
            });
            fs.readFile('./local_test_client/process.log', function (err, data) {
                if (err) throw err;
                    callback(data);
            });
            
        });
    });
    
    event_command.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    
    event_command.on('exit', function (code) {
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
 
 

    