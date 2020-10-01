const mysql = require('mysql');

const getPayroll = (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'ioppractica1client'
  })

  connection.connect();
  connection.query('select * from nomina', (error, results, fields) => {
    console.log(results)
    res.send({data: results});
  })

  connection.end();
}

module.exports = { getPayroll }

