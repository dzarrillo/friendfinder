// recieve information back in json form
var bodyParser = require('body-parser')
// makes routing easier 
var express = require('express')

var path = require('path');
var app = express()
var PORT = process.env.PORT || 8080 


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRouts.js')(app);

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});