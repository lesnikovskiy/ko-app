var http = require('http');
var path = require('path');
var express = require('express');

var app = module.exports = express();

var engine = require('ejs-locals');

app.configure(function() {
	app.engine('ejs', engine);

	app.set('port', process.env.port || 3000);
	app.set('views', path.join(__dirname, '/views'));
	app.set('view engine', 'ejs');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, '/public')));
	app.use(app.router);
	app.use(express.errorHandler({
		dumpExceptions: true, showStack: true
	}))
});

app.get('/', function(req, res) {
	res.redirect('/home');
});

app.get('/home', function(req, res) {
	res.render('index', {
		title: 'CheeseLux'
	});
})

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});