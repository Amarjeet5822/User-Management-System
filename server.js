const express = require("express");
const morgan = require("morgan");
const path = require('path')
const dbConnect = require("./config/dbConnect");
const routes = require("./routes/indexRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(routes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  dbConnect();
  console.log(`app running at http://localhost:${PORT}`)
})