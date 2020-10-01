const mysql = require('mysql');

const getPayroll = (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3307',
    password: '9teio2oa',
    database: 'ioppractica1client'
  })

  connection.connect();
  connection.query('select ID, FirstName, LastName, AccountNumber, Salary, Document from payroll', (error, results, fields) => {
    res.send({data: results});
  })

  connection.end();
}

module.exports = { getPayroll }

