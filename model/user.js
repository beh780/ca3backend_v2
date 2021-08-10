//NAME: BEH PEI HAO
//CLASS:DIT/1B/39
//ADMIN NO: P2037547
console.log("-----------------------------------------------------");
console.log("assigment>model>user.js");
console.log("-----------------------------------------------------");

//--------------------------------
//import
//--------------------------------

var db = require('../model/databaseConfig');

//--------------------------------
//object / functions
//--------------------------------
var user = {
   
          
    

            // loginUser: function (email,password, callback) {
        
            //     var conn = db.getConnection();
            //     conn.connect(function (err) {
            //         if (err) {
            //             console.log(err);
            //             return callback(err,null);
            //         }
            //         else {
            //             console.log("Connected!");
                
            //             var sql = 'select * from user where email=? and password=?';
                
            //             conn.query(sql, [email,password], function (err, result) {
            //                 conn.end();
                                    
            //                 if (err) {
            //                     console.log(err);
            //                     return callback(err,null);
                                        
            //                 } else {
                
            //                     var msg="{\"result\":\""+result.length+"\"}";               
            //                     return callback(null, msg);
                
            //                 }
            //             });
            //         }
            //     });
            //         },
        


 // token2
 verify: function (email, password, callback) {
  var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection gt issue!

        console.log(err);
        return callback(err, null);
      } else {

        const query = "SELECT * FROM user WHERE  email=? and password=?";

        dbConn.query(query, [email, password], (error, results) => {
          if (error) {
            callback(error, null);
            return;
          }
       else   if (results.length === 0) {
            return callback(null, null);

          } else {
            const userdetailfortoken = results[0];
            return callback(null,userdetailfortoken);
          }
        });
      }
    });
  },




    //task1
    POSTUser: function (username, email, contact, type, password, callback) {
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
   user
    (username, email,contact, type,password)
    VALUES
    (?,?,?,?,?);
`;
                conn.query(sql, [username, email, contact, type, password], function (err, result) {
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

    //task2
    GET: function (userid,username,email,contact,type,profile_pic_url,created_at,callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT userid,username,email,contact,type,profile_pic_url,created_at FROM user';
                conn.query(sql, [userid,username,email,contact,type,profile_pic_url,created_at], function (err, result) {
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



    //task 3
    GETUser: function (userid,username,email,contact,type,profile_pic_url,created_at, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT userid,username,email,contact,type,profile_pic_url,created_at FROM user WHERE userid = ?';
                conn.query(sql, [userid,username,email,contact,type,profile_pic_url,created_at], function (err, result) {
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

    //task 4
    PUTUser: function (username, email, type, contact, profile_pic_url, password, userid, callback) {
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
                user
                SET
                username= ?,
                email = ?,
                type=?,
                contact=?,
                profile_pic_url=?,
                password=?
                where 
                userid=?;

               
                
`;
                conn.query(sql, [username, email, type, contact, profile_pic_url, password, userid], function (err, result) {
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
module.exports = user


