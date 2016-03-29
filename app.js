/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index'),
    auth = require('./routes/auth'),
    users = require('./routes/users');
var session = require('express-session');
//var app = e//xpress();
var bodyParser = require('body-parser');
var app = module.exports = express.createServer();
app.use(session({ secret: 'ssshhhhh' }));
// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});



app.get('/', isAuthenticated, function(req, res) {
   var sess = req.session;
   res.redirect('/home');
});


function isAuthenticated(req, res, next) {

    var sess = req.session;
    //console.log(sess);
    if (sess.username)

        next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/index1');
}
function isAuthenticated1(req, res, next) {

     sess = req.session;
    //console.log(sess);
    if (sess.username)

      return  next ();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}


app.get('/index1', auth.index1);
app.post('/insertinto', users.insertinto);
app.get('/logout', auth.logout);
app.get('/insert', users.insert);
app.get('/views', users.views);
app.get('/delete', users.delete);
app.get('/update', users.update1);
app.post('/update', users.update);

app.post('/login',auth.login);
app.get('/test', routes.test);
app.post('/add', routes.add);
app.get('/home', isAuthenticated1, users.home);

app.listen(3030, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
