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
  res.render('donation/add');
});


router.post('/add', (req, res) => {

  var values = req.body;

  if (values.amount===''){
    values.amount = '0';
  }
  con2.execute('INSERT INTO Donations(donor_name, amount, transaction_date, type) VALUES (?,?,?,?)',[values.donor_name, values.amount, values.trans_date, values.type], (err, rows, fields) => {
    if(err) throw err;
    res.redirect('/');
  });
});

router.get('/view', (req, res) => {
  con.query('SELECT * FROM Donations;', (err, rows, fields) => {
    if (err) throw err;

    console.log('Donations were extracted...');
    res.render('donation/view', {donations: rows});
  });
});

router.post('/view_data', (req, res) => {
  let donor_name = "'%" + req.body.donor_name + "%'";
  let type = "'%" + req.body.type + "%'";
  let amount = req.body.amount;
  let receipt_no = req.body.receipt_no;

  let queryString = 'SELECT * FROM Donations WHERE'
  + ' donor_name LIKE ' + donor_name
  + ' AND type LIKE ' + type;

  if(amount) { queryString = queryString + ' AND amount=' + amount; }
  if(receipt_no) { queryString = queryString + ' AND receipt_no=' + receipt_no; }

  queryString = queryString + ';';

  console.log(queryString);
  con.query(queryString , (err, rows, fields) => {
    if (err) throw err;
    // console.log(JSON.stringify(rows));
    // console.log(rows[0].mname);
    res.send(JSON.stringify(rows));
  });
})

module.exports = router;
