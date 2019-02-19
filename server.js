//Install express server
var express  = require('express'),
  bodyParser = require('body-parser'),
  app        = express(),
  path       = require('path'),
  CryptoJS   = require("crypto-js");

// Serve only the static files form the dist directory
app.use(express.static('./dist/sfdcApp'));

app.use(bodyParser.json()); // create application/json parser
app.use(bodyParser.urlencoded({ entended: true })); //create application/x-www-urlencoded parser

app.get('/', function(req,res) {
    
    res.sendFile(path.join(__dirname,'/dist/sfdcApp/index.html'));
});

app.post('/', function(req,res) {

     // Desk secret key	
  var shared = "3B148A2F76272D9C2557037B7C15824EA977A6A53D149350BB2B1EAA5A612C1A";
  // Grab signed request
  var signed_req = req.body.signed_request;
  // split request at '.'
  var hashedContext = signed_req.split('.')[0];
  var context = signed_req.split('.')[1];
  // Sign hash with secret
  var hash = CryptoJS.HmacSHA256(context, shared); 
  // encrypt signed hash to base64
  var b64Hash = CryptoJS.enc.Base64.stringify(hash);
  if (hashedContext === b64Hash) {
    res.sendFile(path.join(__dirname,'/dist/sfdcApp/index.html'));
  } else {
    res.send("authentication failed");
  };  		

});



// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);

app.listen(process.env.PORT || 5000, function(){ 
    //console.log(‘listening on’, http.address().port);
});

