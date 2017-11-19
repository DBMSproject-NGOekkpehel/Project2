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

// // tell node where to look for site resources
// router.use(express.static(__dirname + '/public'));
// router.use(express.static(__dirname + '/public/font'));
//
// // tell node and configure express to read post data
// router.use(bodyParser.urlencoded({encoded: true}));
//
// router.set('view engine', 'ejs');

router.get('/new', (req, res) => {

	res.render('member/add', {data: null, errors: null});
});

router.post('/data',[
  check('member_name').not().isEmpty().not().isNumeric().trim(),
  check('joiningDate').not().isEmpty(),
  check('PhoneNo').not().isEmpty().isMobilePhone('any').trim(),
  check('EmailId').not().isEmpty().isEmail().trim(),
  check('dname').not().isEmpty().not().isNumeric().trim(),
  check('dob').not().isEmpty(),
  check('fatherName').not().isEmpty().not().isNumeric().trim(),
  check('corrAddr').not().isEmpty().not().isNumeric().trim(),
  check('permAddr').not().isEmpty().not().isNumeric().trim(),
  check('gender').not().isEmpty().not().isNumeric().trim(),
  check('collegeName').not().isEmpty().not().isNumeric().trim()
] , (req, res) => {

  var errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.log('_______________________________________________________________________');
    console.log(errors.mapped());
    res.render('member/add', {errors: errors.mapped()});
  }
  else{

    var new_member_data = "'" + req.body.member_name + "'"
    + ',' + "'" + req.body.joiningDate + "'"
    + ',' + "'" + req.body.PhoneNo + "'"
    + ',' + "'" + req.body.EmailId + "'"
    + ',' + "'" + req.body.dname + "'"
    + ',' + "'" + req.body.dob + "'"
    + ',' + "'" + req.body.fatherName + "'"
    + ',' + "'" + req.body.corrAddr + "'"
    + ',' + "'" + req.body.permAddr + "'"
    + ',' + "'" + req.body.gender + "'"
    + ',' + "'" + req.body.collegeName + "'"
    console.log(req.body);

    con.query('call insertNewMember (' + new_member_data + ');', function(err, result, fields) {
      if (err) {
        // Testing to send and handle errors in inserting the data
        console.log('SQL Error');
        // res.render('new_member', {data: req.body, errors: });
      }
      else {
        res.redirect('/');
      }
    });
  }
});

router.get('/remove', (req, res) => {
  res.render('member/remove');
});

router.post('/remove', (req, res) => {

  con2.execute('DELETE FROM Members WHERE mname = ? AND email = ?',
                [req.body.member_name, req.body.EmailId], (err, results, fields) => {
    console.log('Data deleted');
    res.redirect('/');
  })
});

module.exports = router;
