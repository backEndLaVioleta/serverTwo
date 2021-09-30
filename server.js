import http from 'http';
import { Transform } from 'stream';

const server = http.createServer();

// recordr que http es una instancia de EVENTEMITTER
// con lo cual podemos utilizr los métodos de EventEmitter (a repasar)
const pongStr = new Transform({
    transform(chunk, encoding, cb){
        
        if(chunk.toString().includes('PING'))
        this.push('PONG');
        cb();
    }
})
server.on('request',( request, response) =>{
    if(request.method === 'GET') response.end('Hello Me');
    response.statusCode=418;
    if(request.method === 'POST') request.pipe(pongStr).pipe(response);
}).listen(8000);

console.log('Listening in 8000');