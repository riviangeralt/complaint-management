//connection to the database
const mongoose = require("mongoose");

connectToMonogo = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  });
};

module.exports = connectToMonogo;
