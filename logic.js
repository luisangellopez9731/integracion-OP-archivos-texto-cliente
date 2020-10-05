const mysql = require("mysql");
const fs = require("fs");

const getPayroll = (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3307",
    password: process.env.NODE_ENV_DB_PASSWORD,
    database: "ioppractica1client",
  });
  connection.connect();
  connection.query(
    "select ID, FirstName, LastName, AccountNumber, Salary, Document from payroll",
    (error, results) => {
      res.send({data: results});
    }
  );
  connection.end();
};

const generateCSV = (req, res) => {
  var data = req.body.post;

  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const date_ = (month < 10 ? "0" + month : month) + "" + year;
  const transactionCount = data.length;

  var header = `E,123456789,${date_},,${transactionCount}\n`;

  data = data
    .map(e => {
      return `D,${e.Document},${e.AccountNumber},,${e.Salary}`;
    })
    .join("\n");

  fs.writeFile("nomina/nomina.csv", header + data, err => {
    console.log(err);
    if (err) {
      res.send({err: "No se pudo escribir el archivo, " + err});
      return;
    }
  });
};

module.exports = {getPayroll, generateCSV};
