var connect = require('connect');
console.log('listening..')
connect.createServer(
    connect.static(__dirname)
).listen(8080);
