var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var app = express();
//var ejsEngine = require("ejs-locals");
var controllers = require("./controllers");
var flash = require("connect-flash");

// Setup the View Engine
//app.set("view engine", "jade");
//app.engine("ejs", ejsEngine); // support master pages
//app.set("view engine", "ejs"); // ejs view engine
app.set("view engine", "vash");

// Opt into services
//app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: "PluralSightTheBoard", resave: true, saveUninitialized:true }));
app.use(flash());

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// use authentication
var auth = require("./auth");
auth.init(app);

// Map the routs
controllers.init(app);

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({name: "Rajitha", isValid: true, group: "Admin"});
});

var server = http.createServer(app);

//server.listen(3000);
server.listen(process.env.PORT);

var updater = require("./updater");
updater.init(server);