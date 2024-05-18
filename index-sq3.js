const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./testcrud.db');
//replace query w/ get, run, ?

app.get("/", (req,res) => {
 res.send("your momma");
});


app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.run(
    "INSERT INTO employees (name, age, country, position, wagey) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.all("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
console.log(result);
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.run(
    "UPDATE employees SET wagey = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.listen(3001, () => {
  console.log("The hills are alive");
});