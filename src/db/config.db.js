const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to database!');
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = {
  dbConnection,
};
