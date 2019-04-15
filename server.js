//dependencies
var express = require('express');
//express configuration

var app =express();
// port setup
var PORT = process.argv.PORT ||8080;

// express app to handle data parsing
app.use(express.urlencoded({extended:true, limit:'3mb'}));
app.use(express.json({limit:'3mb'}));
app.use(express.statis('public'));

// router
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// It will effectively starts our server
app.listen(PORT, function(){
console.log("app listening on Port : http://localhost :"+ PORT)
});