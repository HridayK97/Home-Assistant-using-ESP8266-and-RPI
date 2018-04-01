// modules =================================================
var express        = require('express');
var app            = express();
//var bodyParser     = require('body-parser');
//var methodOverride = require('method-override');
var request = require('request-promise');




// configuration ===========================================
var baseUrl = "http://192.168.43.207";
var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
//app.use(bodyParser.json()); // parse application/json 
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override//// header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================

// 
/*app.get('/', function(req, res) {
  res.render('index')
});*/


app.get('/api/gettemp', (req, res) => {


	console.log("NICE");
	//console.log(util.inspect(req.params, {showHidden: false, depth: null}));
	request({url: baseUrl + '/measures.json',timeout:2000}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      console.log("Measurements received from ESP8266" + body) 
	      res.send(body);
	    } else {
	      //console.log(error);
	      console.log("ESP ERROR")
	      res.send({"t":"21.70","h":"29.50","pa":"984.43"});
	    }
  })
});


app.get('/api/switchled', (req, res) => {


	console.log("NICE");
	 request({url: baseUrl + '/switchled',timeout:2000}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Switched LED" + body) 
      res.send(body);
    } else {
      //console.log(error);
      console.log("Switch LED ERROR")
      res.send({});
    }
  })
});

/*app.use('/measures.json', function (req, res, next) {
  request({url: baseUrl + '/measures.json',timeout:2000}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Measurements received from ESP8266" + body) 
      res.send(body);
    } else {
      //console.log(error);
      console.log("ESP ERROR")
      res.send({"t":"21.70","h":"29.50","pa":"984.43"});
    }
  })
});

*/

/*
app.use('/switchled', function (req, res, next) {
  request({url: baseUrl + '/switchled',timeout:2000}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Switched LED" + body) 
      res.send(body);
    } else {
      //console.log(error);
      console.log("Switch LED ERROR")
      res.send({});
    }
  })
});

*/
app.listen(port);	
console.log('Home Assistant Server started on ' + port); 			// shoutout to the user
//exports = module.exports = app; 						// expose app