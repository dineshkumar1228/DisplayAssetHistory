//Install express server
const express = require('express');
const path = require('path');

const app = express();


// Serve only the static files form the dist directory
app.use(express.static('./dist/sfdcApp'));



/**app.post('/signedrequest', function(req,res) {
    var json = decode(req.body.signed_request, '3B148A2F76272D9C2557037B7C15824EA977A6A53D149350BB2B1EAA5A612C1A');
});**/


app.get('/', function(req,res) {
    
    res.sendFile(path.join(__dirname,'/dist/sfdcApp/index.html'));
});

// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);

app.listen(process.env.PORT || 5000, function(){ 
    //console.log(‘listening on’, http.address().port);
});

