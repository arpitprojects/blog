var express = require('express');

var app = express();

var path = require('path');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var expressValidator = require('express-validator');

var morgan = require('morgan');

var cors = require('cors');

 // Connected to the firebase.

var mongoose = require('mongoose');

var session = require('express-session');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require('cookie-parser');

var flash = require('connect-flash');

/*All pacakges*/

app.use(cookieParser());

app.use(morgan('dev'));

app.use(cors());


app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//Always use res.locals for global variables.



// passport config


mongoose.connect('mongodb://arpit:arpit@ds157723.mlab.com:57723/blog_new' , {useMongoClient: true});

var  Schema = mongoose.Schema;//Made instaces of the mongoose Schema

var adminSchema = new Schema({
    email : { type : String, required : true},
    password : {type : String , required : true}
});

var admin = mongoose.model('admin' , adminSchema);

app.use(express.static(__dirname + '/app'));

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json()); // parse application/json

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded



app.get('/' , function(request , response){
    response.send('Hello World');
});
//So we have to prepare the local strategy here

passport.use(new LocalStrategy(
    function(email , password  ,done ){
       admin.findOne({
           email : email,
           password : password
       } , function(err , data){
            if(err){return done(err);}
            if(!user){
                return done(null , false ,{message : 'Incorrect credentials'});
            }
       }) 
    }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  admin.findById(id , function(err, user) {
    done(err, user);
  });
});

app.post('/admin-login' , function(req , res , next){
    passport.authenticate('local' , function(err , data , info){
        if(err){
            return next(err);
        }
        if(!data){
            return res.status(401).json({
                err : info
            });
        }
    })
});


app.get('/admin-panel', function(request , response){
    response.send("You can only see this after you've logged in.");
});

app.listen(3000 , function(){
    console.log('App is working on the port 3000')
});