//Install express server
const express = require('express');
const path = require('path');

var    bodyParser = require('body-parser'),
    request = require('request'),
    qrcode = require('qrcode-npm'),
    decode = require('salesforce-signed-request'),
    consumerSecret = process.env.CONSUMER_SECRET,

const app = express();
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