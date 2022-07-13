const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Mysparkspark",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {});
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Items";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log(`Server is running on 3001`);
});
