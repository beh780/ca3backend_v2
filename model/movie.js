//NAME: BEH PEI HAO
//CLASS: DIT/1B/39
//ADMIN NO:P2037547

console.log("-----------------------------------------------------");
console.log("assigment>model>movie.js");
console.log("-----------------------------------------------------");

//--------------------------------
//import
//--------------------------------

var db = require('./databaseConfig');
//--------------------------------
//object / functions
//--------------------------------
var movie ={
    //task 7
    POSTMovie: function (title,description,cast,genreid,time,opening_date, callback) {
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
                movie
                (title,description,cast,genreid,time,opening_date)
                VALUES
                (?,?,?,?,?,?);
`;
                conn.query(sql, [title,description,cast,genreid,time,opening_date], function (err, result) {
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

 //task 8
 GET: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = 'SELECT * FROM movie';
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

//task 9
GETMovie: function (movieid, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = `
            SELECT a.image, a.movieid,a.title,a.description,a.cast,a.time,a.opening_date , g.genre
            FROM movie as a , genre as g
            where g.genreid = a.genreid
            and a.movieid = ? 
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


//task 10
DELETEMovie: function (movieid, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = `
            DELETE FROM
            movie
            WHERE
            movieid= ?;
            `;
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


searchMovieg: function ( genreid, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = ` SELECT 
           m.movieid, m.title,m.description,m.cast,g.genre,m.time,m.opening_date,m.genreid
                        FROM 
                            movie as m,
                            genre AS g
                        WHERE 
                             m.genreid=?
                            AND m.genreid = g.genreid;`;
            conn.query(sql, [genreid], function (err, result) {
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

searchMovie: function ( title, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = ` SELECT 
           m.movieid, m.title,m.description,m.cast,g.genre,m.time,m.opening_date
                        FROM 
                            movie as m,
                            genre AS g
                        WHERE 
                             m.title LIKE '%${title}%'
                            AND m.genreid = g.genreid;`;
            conn.query(sql, [ title], function (err, result) {
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

GETGoodMovie: function ( callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sql = `
            SELECT r.movieid,m.title,m.image, m.opening_date,round(avg(r.rating),2) as averagerating 
            FROM sp_movie.review as r, sp_movie.movie as m
            where r.movieid=m.movieid
           group by r.movieid  
           order by round(avg(rating),2) desc
           limit 3
           ;
`           
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

}





//--------------------------------
//export
//--------------------------------
module.exports = movie