# Please read the updates
**Please note that this repository was created again due to the mistakes I've made......**
_Please use express-generator to create node apps or any other generator to create apps_

# UserInterface
User Interface made using **brandi**

## IMPORTANT
- **Changes in new_member form**:
  - changing age to _DOB_
  - adding _father's name_
  - adding _correspondence address_
  - adding _permanent address_
  - adding _gender_
  - adding field for _college / university_
  - **These changes are to be put in the database as well**
- **input fields for new_member**
  - mname
  - join date
  - phone no
  - email id
  - dname
  - date of birth
  - father's name
  - corresponding address
  - permanent address
  - gender
  - college

### Mysql Stored Procedure

```mysql
delimiter //

DROP PROCEDURE IF EXISTS insertNewMember//
CREATE PROCEDURE insertNewMember
(IN name varchar(20), IN join_date date, IN phone_no varchar(10), IN email_id varchar(50), IN dname varchar(20), IN dateOfBirth date, IN fatherName varchar(50), IN correspondingAddress varchar(50), IN permanentAddress varchar(50), IN gender varchar(6), IN college varchar(50))
BEGIN
  IF NOT EXISTS (Select * FROM Department d WHERE d.dname LIKE dname) THEN
    INSERT INTO Department(dname) VALUES(dname);
  END IF;
  IF NOT EXISTS (Select * FROM Members WHERE email_id LIKE email and phone LIKE phone_no) THEN
    INSERT INTO Members (mname, joining_date, phone, email, dno, date_of_birth, father_name, corresponding_address, permanent_address, gender, college) VALUES(name, join_date, phone_no, email_id, (SELECT d.dno FROM Department d WHERE d.dname LIKE dname), dateOfBirth, fatherName, correspondingAddress, permanentAddress, gender, college);
  END IF;
END//

delimiter ;
delimiter //

DROP PROCEDURE IF EXISTS insertNewEvent//

CREATE PROCEDURE insertNewEvent (IN location varchar(20), IN budget decimal(10,0), IN ename varchar(20), IN supssn varchar(20), IN date_time datetime, IN reciept_no int)
BEGIN
  IF NOT EXISTS (SELECT * FROM Events e WHERE e.ename = ename and e.date_time=date_time) THEN
    INSERT INTO Events(location, budget, ename, supssn, receipt_no, date_time) VALUES (location, budget, ename, supssn, reciept_no, date_time);
  END IF;
END//

delimiter ;


mysql> show tables;
+--------------------+
| Tables_in_ekkPahel |
+--------------------+
| Department         |
| Donations          |
| Event_Members      |
| Events             |
| Members            |
+--------------------+
5 rows in set (0.00 sec)

mysql> desc Department;
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| dno    | int(11)     | NO   | PRI | NULL    | auto_increment |
| dname  | varchar(20) | YES  |     | NULL    |                |
| mgrssn | int(11)     | YES  | MUL | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> desc Donations;
+------------------+---------------+------+-----+---------+----------------+
| Field            | Type          | Null | Key | Default | Extra          |
+------------------+---------------+------+-----+---------+----------------+
| donor_name       | varchar(20)   | YES  |     | NULL    |                |
| amount           | decimal(10,0) | YES  |     | NULL    |                |
| transaction_date | date          | YES  |     | NULL    |                |
| receipt_no       | int(11)       | NO   | PRI | NULL    | auto_increment |
| type             | varchar(50)   | YES  |     | NULL    |                |
+------------------+---------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

mysql> desc Event_Members;
+--------+---------+------+-----+---------+-------+
| Field  | Type    | Null | Key | Default | Extra |
+--------+---------+------+-----+---------+-------+
| eid    | int(11) | NO   | PRI | NULL    |       |
| memssn | int(11) | NO   | PRI | NULL    |       |
+--------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)

mysql> desc Events;
+------------+---------------+------+-----+---------+----------------+
| Field      | Type          | Null | Key | Default | Extra          |
+------------+---------------+------+-----+---------+----------------+
| eid        | int(11)       | NO   | PRI | NULL    | auto_increment |
| location   | varchar(20)   | YES  |     | NULL    |                |
| budget     | decimal(10,0) | YES  |     | NULL    |                |
| ename      | varchar(50)   | YES  |     | NULL    |                |
| supssn     | int(11)       | YES  | MUL | NULL    |                |
| date_time  | datetime      | YES  |     | NULL    |                |
| receipt_no | int(11)       | YES  | MUL | NULL    |                |
+------------+---------------+------+-----+---------+----------------+
7 rows in set (0.00 sec)

mysql> desc Members;
+-----------------------+--------------+------+-----+---------+----------------+
| Field                 | Type         | Null | Key | Default | Extra          |
+-----------------------+--------------+------+-----+---------+----------------+
| ssn                   | int(11)      | NO   | PRI | NULL    | auto_increment |
| mname                 | varchar(60)  | YES  |     | NULL    |                |
| joining_date          | date         | YES  |     | NULL    |                |
| phone                 | varchar(10)  | YES  |     | NULL    |                |
| email                 | varchar(50)  | YES  |     | NULL    |                |
| position              | varchar(20)  | YES  |     | NULL    |                |
| dno                   | int(11)      | YES  |     | NULL    |                |
| date_of_birth         | date         | YES  |     | NULL    |                |
| father_name           | varchar(50)  | YES  |     | NULL    |                |
| corresponding_address | varchar(200) | YES  |     | NULL    |                |
| permanent_address     | varchar(200) | YES  |     | NULL    |                |
| gender                | varchar(6)   | YES  |     | NULL    |                |
| college               | varchar(200) | YES  |     | NULL    |                |
+-----------------------+--------------+------+-----+---------+----------------+
13 rows in set (0.00 sec)

delimiter //
CREATE TRIGGER

```

- Use node query to get the supssn for a new event

### Issues
- getting data from query and populating a drop down list (Could be done using angularjs _But I don't want to use it_) **Solved by looping through JSON data in ejs. _Search by typing: Loop through JSON data in ejs_**
- remove foreign_key of receipt no in Events. and add foreign key of eid in donations (Update in Schema also)
- If while removing member, all members of a dept are removed then remove the department **trigger**
- Show small snippets of the tables using ajax
- **View** Members on particular Events
- **promise-mysql** used to make sequential sql calls to get data from the Database
  - This is then populated ont he index page using the json data from the server given to ejs
- **mysql2** used to implement the good stuff like prepared statements

### Updates (17-11-2017)
- The views are segregated as per theit individual requirements and so are the javascript files
  - Look out for member, department, donation, event folders and javascript
- delete request is used for deleting records rather than post request
- _**App.js**_ is the main javascript file to be run by node from now on
