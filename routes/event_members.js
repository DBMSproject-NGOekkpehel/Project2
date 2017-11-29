var express = require('express');
var mysql = require('mysql');
var promise_mysql = require('promise-mysql');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var mysql2 = require('mysql2');

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');

var router = express.Router();

// Handling mysql using Promise
var connection = promise_mysql.createPool({
  host: "localhost",
  user: "divyaksh",
  password: "password",
  database: "ekkPahel"
});

// Handling the mysql Database
var con = mysql.createConnection ( {
  host: "localhost",
  user: "divyaksh",
  password: "password",
  database: "ekkPahel"
});

con.connect( function (err) {
  if (err) throw err;
  console.log("Mysql Database Connected!")
});


// Connection to use mysql2 library (improved over mysql)
var con2 = mysql2.createConnection({
  host: "localhost",
  user: "divyaksh",
  password: "password",
  database: "ekkPahel"
});

router.get('/view', (req, res)=> {
  con.query('SELECT ename, mname FROM Events e, Members m, Event_Members em where e.eid=em.eid and m.ssn=em.memssn', (err, rows, fields) => {
    if (err) throw err;

    res.render('event_members/view', {events: rows});
  });
});

// router.post('/view_members',(req, res)=> {
//   con.query('SELECT ename, mname FROM Events e, Members m, Event_Members em where e.eid=em.eid and m.ssn=em.memssn')
// });

  module.exports = router;
