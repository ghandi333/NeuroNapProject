
const mongoose = require('mongoose');
// set mongoose Promise to Bluebird

let mongoUri = "mongodb://localhost:27017/UserDB";

mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

exports.connect = () => {
  console.log('Connect to mongo: ', mongoUri);
  mongoose.connect(
    mongoUri,
    {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return mongoose.connection;
};
