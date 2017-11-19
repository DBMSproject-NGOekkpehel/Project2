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
// // router.use(express.static(__dirname + '/font'));
//
// // tell node and configure express to read post data
// router.use(bodyParser.urlencoded({encoded: true}));
//
// router.set('view engine', 'ejs');

router.get('/assign-manager', (req, res) => {

  /*con.query('SELECT d.dno, m.mname, m.ssn FROM Department d, Members m WHERE mgrssn=ssn;', (err, result, field) => {
    if (err) throw err;
    else {
      // console.log(JSON.stringify(result));
      var managed_departments = result;
      con.query('SELECT * FROM Department;', (err, result, field) => {
        if (err) throw err;
        else {
          var departments = result;
          res.render('assign_manager', {departments: departments, managers: managed_departments});
          console.log("Department:");
          console.log(JSON.stringify(departments));
          console.log("Managers:");
          console.log(JSON.stringify(managed_departments));
        }
      });
    }
  });*/

  var [err, managed_departments] = con2.query('SELECT d.dno, m.mname, m.ssn FROM Department d, Members m WHERE mgrssn=ssn;');
  if (err) throw err;
  var [err, departments] = con2.query('SELECT * FROM Department;');
  if (err) throw err;
  res.render('assign_manager', {departments: departments, managers: managed_departments});
  console.log("Department:");
  console.log(JSON.stringify(departments));
  console.log("Managers:");
  console.log(JSON.stringify(managed_departments));
});

module.exports = router;
