const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => console.log(`Connected to database ${config.database}`))
  .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Catch 440 Errors and forward them to an error handler 
app.use((req, res, next) => {
  //console.log(req);
  const err = new Error(`Route ${req.originalUrl} Not Found`);
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = err;//app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  // Respond to ourselves
  console.error(err);
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
