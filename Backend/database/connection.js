// const mysql = require("mysql");

// // create a connection to the database
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:null,
//     database:'housie-game',
// })

// // connect to database
// connection.connect((error) => {
//     if(error){
//         console.error(`An error occured while connecting to the database ${error.message}`);
//         return;
//     }
//     console.log("Connected successfully to MySQL database");
// })

// $query = "SELECT * FROM users WHERE userName = 'Hassaan'";

// connection.query($query,(err,rows,fields) => {
//     if(err){
//         console.error(`An error occured while executing the query ${err.message}`);
//         return;
//     }

//     console.log("Query executed successfully executed : ",rows);
//     // console.log("Query executed successfully executed : ",fields);
// })


const mysql = require('mysql');
const { Passport } = require('passport');

// create connection 
const connection = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:null,
    database:'housie-game'
});

// connect to database 
connection.connect((e) => {
    if(e){
        console.error(`An error occured while connecting to the database ${error.messsage}`);
        return ;
    }
    console.log(`Connected successfully to MySQL database`);
});

$query = "SELECT * FROM users WHERE userName = 'Hassaan'";

connection.query($query,(error,rows,fields) => {
    if(error){
        console.error(`An error occured ${error.messsage}`);
        return ;
    }

    console.log(`Query executed successfully:`,rows);
})