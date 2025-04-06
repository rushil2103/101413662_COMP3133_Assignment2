const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://rushiltmk:orXsX2GTzspPgw0N@cluster0.nl6g3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
