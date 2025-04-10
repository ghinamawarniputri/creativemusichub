const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "crefcref8549_cmh",
  password: "creativemusichub",
  database: "cref8549_creativemusichub",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/api/headers", (req, res) => {
  db.query("SELECT * FROM headers", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
