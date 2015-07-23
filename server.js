// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
// var keys = require('./models/keys.js');


// App definition
var app = express();


// Serving app
app.use(express.static(__dirname + '/'));


// Middleware
app.use(cors());


// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Controllers
var Calendar = require('./controllers/CalendarController.js');
var Lesson = require('./controllers/LessonController.js')
var User = require('./controllers/UserController.js')

////////////////////////////////////
//////////// REST API //////////////
////////////////////////////////////

// Lessons
app.post('/api/lessons', Lesson.create);

app.get('/api/lessons', Lesson.get);

app.put('/api/lessons', Lesson.update);

app.delete('/api/lessons', Lesson.delete);


// Users
app.get('/api/user/:id', User.get);
app.post('/api/user', User.post);
app.put('/api/user/:id', User.put);


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