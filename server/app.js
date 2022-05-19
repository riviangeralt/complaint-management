const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToMonogo = require("./db.js");
const path = require("path");

dotenv.config();

// import routes
const login = require("./routes/login.js");
const user = require("./routes/user.js");
const complaint = require("./routes/complaint.js");
const category = require("./routes/category.js");

const app = express();
connectToMonogo()
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//using middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

//using routes
app.use("/api/v1", login);
app.use("/api/v1", user);
app.use("/api/v1", complaint);
app.use("/api/v1", category);

app.get("/", (req, res) => {
  res.send("working");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
