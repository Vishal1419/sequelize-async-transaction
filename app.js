//Restify is a framework of node.js to build api
const Restify = require('restify');

//Create server with restify
var server = Restify.createServer({
    name: 'testServer',
    versions: ['1.0.0']
});

//Restify middleware
server.use(Restify.plugins.acceptParser(server.acceptable));
server.use(Restify.plugins.queryParser());
server.use(Restify.plugins.bodyParser());

const index = require('./routes/index')(server);

//Start the server
server.listen(3000,function(err){
    console.log("Server Url : " + server.url);
});
