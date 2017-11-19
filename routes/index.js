var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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

con.connect( function (err) {
  if (err) throw err;
  console.log("Mysql Database Connected!")
});

// // tell node where to look for site resources
// router.use(express.static(__dirname + '/public'));
// // router.use(express.static(__dirname + '/font'));
//
// // tell node and configure express to read post data
// router.use(bodyParser.urlencoded({encoded: true}));
//
// router.set('view engine', 'ejs');

router.get('/', function(req, res) {

  var flag = 1;
  var members, departments, donations, events, event_members;
  // Query to get latest added members
  connection.query('SELECT m.mname, d.dname FROM Members m, Department d WHERE d.dno=m.dno ORDER BY m.ssn DESC LIMIT 5;').then((rows) => {
    // connection.query('SELECT mname, ssn FROM Members ORDER BY ssn DESC LIMIT 5;').then((rows) => {

    // Members preview data
    console.log(JSON.stringify(rows));
    members = rows;
    flag += 1;

    // Query to get latest added departments
    return connection.query('SELECT d.dname, m.mname FROM Department d, Members m WHERE d.mgrssn=m.ssn ORDER BY d.dno ASC LIMIT 5;')
  }).then((rows) => {

    // Departments Preview data
    console.log(JSON.stringify(rows));
    departments = rows;
    flag += 1;

    // Query to get latest added donations
    return connection.query('SELECT donor_name, type FROM Donations ORDER BY receipt_no DESC LIMIT 5;')
  }).then((rows) => {

    // Donations Preview data
    console.log(JSON.stringify(rows));
    donations = rows;
    flag += 1;

    // Query to get latest added Events
    return connection.query('SELECT ename, location FROM Events ORDER BY eid DESC LIMIT 5;')

  }).then((rows) => {

    // Events Preview data
    console.log(JSON.stringify(rows));
    events = rows;
    flag += 1;

    // Query to get the event members
    return connection.query('SELECT ename, mname FROM Events e, Members m, Event_Members em where e.eid=em.eid and m.ssn=em.memssn LIMIT 5;')

    // res.render('index', {departments: departments, members: members, donations: donations, events: events});

  }).then((rows) => {

    // Event Members Preview data
    console.log(JSON.stringify(rows));
    event_members = rows;

    res.render('index', {departments: departments, members: members, donations: donations, events: events, event_members: event_members});
  });
});


module.exports = router;
