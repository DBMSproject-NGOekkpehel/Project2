var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql2 = require('mysql2');
var promise_mysql = require('promise-mysql');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');

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

var con2 = mysql2.createConnection({
  host: "localhost",
  user: "divyaksh",
  password: "password",
  database: "ekkPahel"
});

con.connect( function (err) {
  if (err) throw err;
  console.log("Mysql Database Connected!")
});

router.get('/add', (req, res) => {
  // console.log('showing add page...');
  res.render('events/add');
});

router.get('/remove', (req, res) => {
  res.render('events/remove');
});

router.post('/add', (req, res) => {

  var add_event_data = "'" + req.body.location + "'"
  + ',' + "'" + req.body.budget + "'"
  + ',' + "'" + req.body.event_name + "'"
  + ',' + "'" + req.body.supssn + "'"
  + ',' + "'" + req.body.date_time + "'"
  + ',' + req.body.receipt_no ;
  console.log(req.body);

  con.query('call insertNewEvent (' + add_event_data + ');', function(err, result, fields) {
    if (err) {
      // Testing to send and handle errors in inserting the data
      console.log(err);
      // res.render('add_event', {data: req.body, errors: });
    }
    else {
      res.redirect('/');
    }
  });
});

router.post('/remove', (req, res) => {

  con2.execute('DELETE FROM Events WHERE ename LIKE ?',[req.body.event_name], (err, rows, fields) => {
    if(err) throw err;

    res.redirect('/');
  });

});

router.get('/view', (req, res) => {
  con.query('SELECT * FROM Events e, Members m WHERE e.supssn=m.ssn;', (err, rows, fields) => {
    if (err) throw err;

    console.log('Events were extracted...');
    res.render('events/view', {events: rows});
  });
});

module.exports = router;
