const express = require('express');
const path = require('path');
const bodyParsor = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database' + config.database);
})

const app = express();

const users = require('./routes/user');
//port number
const port = 3000;

//cors middle man
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParsor.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/user', users);

//index route
app.get('/', function(req,res){
  res.send("invalid endpoint");
});

app.get('*', (reg, res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
})


app.listen(port, () => {
  console.log('Server started on port ' + port);
});
