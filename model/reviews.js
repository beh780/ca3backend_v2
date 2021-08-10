//NAME: BEH PEI HAO
//CLASS: DIT/1B/39
//ADMIN NO:P2037547



console.log("-----------------------------------------------------");
console.log("assigment>model>review.js");
console.log("-----------------------------------------------------");

//--------------------------------
//import
//--------------------------------

var db = require('./databaseConfig');
//--------------------------------
//object / functions
//--------------------------------
var reviews = {
//TASK 11
    POSTReview: function (userid,rating,review, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                INSERT INTO REVIEW
                (userid,rating,review)
                VALUES
                (?,?,?);
`;
                conn.query(sql, [userid,rating,review], function (err, result) {
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

    //task 12
    GETReview: function (movieid,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `SELECT m.movieid , u.userid, r.review,r.rating,u.username,r.created_at
                FROM review as r , user as u,movie as m
                where u.userid=r.userid
                and m.movieid=r.movieid
                and m.movieid = ?
                ;`;
                conn.query(sql, [movieid], function (err, result) {
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


    addReview: function (data, callback) {
        var review      = data.review;
        var rating      = data.rating;
        var userid       = data.userid;
        var movieid    = data.movieid;

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
                    review
                    (review, rating, userid, movieid)
                VALUES
                    (?, ?, ?, ?);
                    `;

                conn.query(sql, [review, rating, userid, movieid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },


    AverageRating: function (movieid,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                SELECT movieid,round(avg(rating),2) as averagerating  
                FROM review
                where movieid=?
                group by movieid 
                ;`;
                conn.query(sql, [movieid], function (err, result) {
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
module.exports = reviews