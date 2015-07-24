// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
// var keys = require('./models/keys.js');
var session = require('express-session');

// App definition
var app = express();


// Serving app
app.use(express.static(__dirname + '/'));


// Middleware
app.use(cors());



var isAuthed = function(req, res, next) {
  //TODO: check for admin priviledges
  if (!req.isAuthenticated()) return res.status(403).send("authorized users only");
  return next();
};


// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Controllers
var Calendar = require('./controllers/CalendarController.js');
var Lesson = require('./controllers/LessonController.js');
var User = require('./controllers/UserController.js');
var passport = require('./services/passport.js');

////////////////////////////////////
//////////// REST API //////////////
////////////////////////////////////

// Lessons
app.post('/api/lessons', Lesson.create);

app.get('/api/lessons', Lesson.get);

app.put('/api/lessons', Lesson.update);

app.delete('/api/lessons', Lesson.delete);


// Users
// app.get('/api/users', User.getAll);
// app.post('/api/user', User.post);
// app.put('/api/user/:id', User.put);

// DEPRECATED
// app.get('/api/user/:id', User.get);


// Authentication
app.use(session({
  secret: 'devkittensRus',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/user', User.register);
app.get('/api/user', isAuthed, User.me);
app.put('/api/user', isAuthed, User.update);


app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/dashboard'
  // failureRedirect: '/#login',
  // faliureFlash: 'Invalid username or password.'
}));

app.get('/api/logout', function(req, res) {
  req.logout();
  return res.redirect('/#home');
});


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////


// Connections
var portNum = 3000;

var mongooseUri = 'mongodb://localhost/devkittens';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose listening to your soul on:', mongooseUri);
});


app.listen(portNum, function () {
    console.log('Making some pancakes on port:', portNum);
});
