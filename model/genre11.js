//NAME: BEH PEI HAO
//CLASS: DIT/1B/39
//ADMIN NO:P2037547

console.log("-----------------------------------------------------");
console.log("assigment>model>gerne.js");
console.log("-----------------------------------------------------");

//--------------------------------
//import
//--------------------------------

var db = require('./databaseConfig');
//--------------------------------
//object / functions
//--------------------------------
var genreaa = {

    //task 5
    postgenre: function (genre,description, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
            INSERT INTO
genre
(genre,description)
VALUES
(?,?);
`;
                conn.query(sql, [genre,description], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },


 //task 6
 GET: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = 'SELECT * FROM genre';
            conn.query(sql, [], function (err, result) {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    return callback(null, result);
                }
            });
        }
    });
},


    POSTCategory: function (catname, description, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                INSERT INTO
    category
    (catname, description)
    VALUES
    (?,?);
`;
                conn.query(sql, [catname, description], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    PUTCategory: function (catname, description, categoryid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                UPDATE 
                category
                SET
                catname= ?,
                description = ?;
               
                
`;
                conn.query(sql, [catname, description, categoryid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

}





//--------------------------------
//export
//--------------------------------
module.exports = genreaa