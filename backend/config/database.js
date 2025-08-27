const mongoose = require('mongoose');

module.exports.connect = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set');
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('✅ Connected to MongoDB');
};

module.exports.disconnect = async () => {
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
};
