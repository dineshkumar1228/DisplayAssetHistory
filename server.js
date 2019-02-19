//Install express server
var express = require('express');
var path = require('path');

var    bodyParser = require('body-parser'),
    request = require('request'),
    qrcode = require('qrcode-npm'),
    decode = require('salesforce-signed-request'),
    consumerSecret = '3B148A2F76272D9C2557037B7C15824EA977A6A53D149350BB2B1EAA5A612C1A'
    app = express();
app.set('view engine', 'ejs');
app.use(bodyParser()); // pull information from html in POST
// Serve only the static files form the dist directory
app.use(express.static('./dist/sfdcApp'));

app.post('/signedrequest', function(req,res) {
    var signedRequest = decode(req.body.signed_request, consumerSecret),
    context = signedRequest.context,
    oauthToken = signedRequest.client.oauthToken,
    instanceUrl = signedRequest.client.instanceUrl,
    contactRequest = {
        headers: {
            'Authorization': 'OAuth ' + oauthToken
        }
    };


    request(contactRequest, function(err, response, body) {
        res.sendFile(path.join(__dirname,'/dist/sfdcApp/index.html'));
    });
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);