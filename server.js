
// Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express app
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Points the server to fiels. The routes give the server a map of how to respond
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);


// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});