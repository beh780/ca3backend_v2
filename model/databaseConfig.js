//NAME: BEH PEI HAO
//CLASS:DIT/1B/39
//ADMIN NO: P2037547

console.log("-----------------------------------------------------");
console.log("assigment>controller>databaseConfig.js");
console.log("-----------------------------------------------------");

//--------------------------------
//import
//--------------------------------
var mysql = require('mysql');
//--------------------------------
//objects / function
//--------------------------------
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "behpeihao",
            database: "sp_movie"
        });
        return conn;
    }
};
//--------------------------------
//export
//--------------------------------
module.exports = dbconnect
