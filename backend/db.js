const mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://srisruthipopuri:Atchu77777@nykaa.8vv9hop.mongodb.net/nykaa?appName=nykaa';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

module.exports = mongoose;
