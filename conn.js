var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "hanif",
  password: "7Bionic.",
  database: "ereminderschool"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;
