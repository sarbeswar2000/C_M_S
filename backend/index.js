const connectToMongo = require("./db.js");
const express = require("express");
var cors = require('cors')

const app = express();
const port = 8000;
// Available Routes
app.use(cors())
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contents", require("./routes/contents"));

app.get("/", (req, res) => {
  res.send("Hello guys this Sarbeswar and this is my first backened run");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
connectToMongo();
