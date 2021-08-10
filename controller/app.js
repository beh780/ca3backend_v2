//NAME: BEH PEI HAO
//CLASS:DIT/1B/39
//ADMIN NO: P2037547
console.log("-----------------------------------------------------");
console.log("assigment>controller>app.js");
console.log("-----------------------------------------------------");

//--------------------------------
//import
//--------------------------------

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
var user = require('../model/user.js');
var genre = require('../model/genre11.js');
var movie = require('../model/movie.js');
var reviews = require('../model/reviews');
const { GETReview, AverageRating } = require('../model/reviews');
const genreaa = require('../model/genre11.js');

var isLoggedInMiddleWare=require('../auth/isLoggedInMiddleWare.js');
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js"); 

var cors= require ('cors');
app.options('*',cors());
app.use(cors());

app.use (express.static("public"));

//--------------------------------
//middleave function
//--------------------------------
var printDebugInfo = function (req, res, next) {
    console.log();
    console.log("-------------[Debug Info]-------------");

    console.log("Servicing" + req.url + "....");
    console.log(">req.params:" + JSON.stringify(req.params));
    console.log(">req.body:" + JSON.stringify(req.body));


    console.log("-------------[Debug Info End]-------------");
    console.log();

    next();
}

var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//--------------------------------
//middleave function configuratrion
//--------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);

//--------------------------------
//end point-----user
//--------------------------------
//token
// app.post('/login',function(req, res){
//     var email=req.body.email;
//     var password = req.body.password;

//     user.loginUser(email, password, function(err, token, result){
//         if(!err){
// 			res.statusCode = 200;
// 			  res.setHeader('Content-Type', 'application/json');
// 			  delete result[0]['password'];//clear the password in json data, do not send back to client
// 			  console.log(result);
// 			res.json({success: true, UserData: JSON.stringify(result), token:token, status: 'You are successfully logged in!'}); 
// 			res.send();
// 		}else{
//             res.status(500);
//             res.send(err.statusCode);
//         }
//     }); 
// }); 

app.post("/login/", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || email == "" || password == null || password == "") {
        res.status(400).send("Invalid login details");
    }
    user.verify(email, password, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        }
        if (user === null) {
            res.status(401).send();
            return;
        }
        const payload = {
            user_id: user.userid,
            type: user.role
        };
        jwt.sign(
            // (1) payload
            payload,
            // (2) Secret key 
            JWT_SECRET,
            // (3) Signing Algorithm 
            { algorithm: "HS256" },
            // (4) response handle (callback function)
            (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send();
                    return;
                }
                res.status(200).send({
                    token: token,
                    user_id: user.userid
                });
            })
    });
});
  

// task 1(done)
app.post('/users', printDebugInfo, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var contact= req.body.contact;
    var type = req.body.type;

    var password = req.body.password;
    user.POSTUser(username, email,contact, type,password, function (err, result) {
        if (!err) {
            var output ={ "userid" : result.insertId}


            res.status(201).send(output);
        } 
        else if(username==username || email==email){res.status(422).send("Some error")}
        else {
            res.status(500).send("Some error");
        }
    });

});


//task 2(done)
app.get('/users',isLoggedInMiddleWare, printDebugInfo, function (req, res) {
    var userid = req.params.userid;
    var username = req.body.username;
    var email = req.body.email;
    var contact= req.body.contact;
    var type = req.body.type;
    var created_at = req.body.created_at;
    var profile_pic_url = req.body.profile_pic_url;
 

    user.GET(userid,username,email,contact,type,profile_pic_url,created_at,function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});

//exp
app.get('/users/:id/post', printDebugInfo, function (req, res) {
    var id = req.params.id;
    var username = req.body.username;
    var email = req.body.email;
    var contact= req.body.contact;
    var type = req.body.type;
    var created_at = req.body.created_at;
    var profile_pic_url = req.body.profile_pic_url;
 
  
        if (isNaN(id)) {
            res.status(400).send("Unacceptable format for user specification");
            return;
        } else {
            user.GETUser(id,username,email,contact,type,profile_pic_url,created_at, function (err, result) {
                if (!err && result == "") {
                    res.status(404).send("Cannot find the requested user");
                } else if (!err && result !== null) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Some error");
                }
            });
        }
    });
//task 3(done)
app.get('/users/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    var username = req.body.username;
    var email = req.body.email;
    var contact= req.body.contact;
    var type = req.body.type;
    var created_at = req.body.created_at;
    var profile_pic_url = req.body.profile_pic_url;
 
  
        if (isNaN(id)) {
            res.status(400).send("Unacceptable format for user specification");
            return;
        } else {
            user.GETUser(id,username,email,contact,type,profile_pic_url,created_at, function (err, result) {
                if (!err && result == "") {
                    res.status(404).send("Cannot find the requested user");
                } else if (!err && result !== null) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Some error");
                }
            });
        }
    });




//task 4(done)
app.put('/users/:userid', printDebugInfo, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var contact= req.body.contact;
    var type = req.body.type;
    var profile_pic_url = req.body.profile_pic_url;
    var password = req.body.password;
    var userid = req.params.userid;
    if (isNaN(userid)) {
        res.status(400).send("Unacceptable format for user specification");
        return;
    }else{

    user.PUTUser(username,email,type,contact,profile_pic_url,password,userid, function (err, result) {
        if (!err&&result.affectedRows==0){
            res.status(404).send("Cannot find the requested user");
        }
        else  if (!err) {
            res.send(result);
        } 
        else if(username==username){res.status(422).send("username already exsits")}
        else {
            res.status(500).send("Some error");
        }
    });
    }
});

//--------------------------------
//end point------genre
//--------------------------------
//task 5(done)
app.post('/genre', printDebugInfo, function (req, res) {
    var genre = req.body.genre;
    var description = req.body.description;
  
    genreaa.postgenre( genre,description, function (err, result) {
        if (!err) {
        

            res.status(204).send(result);
        }
        else if(genre==genre){res.status(422).send("genre already exsits")}
        else {
            res.status(500).send("Some error");
        }
    });

});

//task 6(done)
app.get('/genre', printDebugInfo, function (req, res) {


    genreaa.GET(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});
//--------------------------------
//end point------movie
//--------------------------------
//task 7
app.post('/movie', isLoggedInMiddleWare,printDebugInfo, function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var cast= req.body.cast;
    var genreid = req.body.genreid;
    var time = req.body.time;
    var opening_date = req.body.opening_date;
    movie.POSTMovie(title,description,cast,genreid,time,opening_date, function (err, result) {
        if (!err) {
            var output ={ "movieid" : result.insertId}


            res.status(201).send(output);
        } else {
            res.status(500).send("Some error");
        }
    });

});

// task 8(done)
app.get('/movie', printDebugInfo, function (req, res) {


    movie.GET(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});

//
app.get('/goodmovie', printDebugInfo, function (req, res) {


    movie.GETGoodMovie(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});


//task 9(done)
app.get('/movies/:id', printDebugInfo, function (req, res) {
    var movieid = req.params.id;
    if (isNaN(movieid)) {
        res.status(400).send("Unacceptable format for user specification");
        return;
    } else{
    movie.GETMovie(movieid, function (err, result) {
        if (!err && result == "") {
            res.status(404).send("Cannot find the requested user");}
        else  if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Some error");
        }
    });
    }
});

//task 10(done)
app.delete('/movie/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;

    movie.DELETEMovie(id, function (err, result) {
        if (result.affectedRows==0){var output ={"result":"invalid id"}
        res.status(404).send(output);
        }
        
        else if (!err) {
            res.status(204).send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});



//--------------------------------
//end point------review
//--------------------------------
//task 11
app.post('/movie/:id/review/', printDebugInfo, function (req, res) {
    var userid = req.body.userid;
    var rating = req.body.rating;
    var review=req.body.review;
 
    reviews.POSTReview(userid,rating,review, function (err, result) {
        if (!err) {
            var output ={ "reviewid" : result.insertId}
   res.status(201).send(output);
        } else {
            res.status(500).send("Some error");
        }
    });

});

//task 12
app.get('/movie/:id/reviews', printDebugInfo, function (req, res) {
    var movieid = req.params.id;

    GETReview(movieid, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});

app.post('/search2', printDebugInfo, function (req, res) {

    var genreid = req.body.genreid;


    movie.searchMovieg(genreid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});
app.post('/search', printDebugInfo, function (req, res) {

    var title = req.body.title;


    movie.searchMovie( title, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.post('/user/:uid/movie/:mid/review', printDebugInfo, isLoggedInMiddleWare, function (req, res) {
    var data = {
        review: req.body.review,
        rating: req.body.rating,
        userid: req.params.uid,
        movieid: req.params.mid
    };

    console.log(req.params.uid)
    console.log(req.decodedToken.user_id)
    // Authorisation check
    if (req.params.uid != req.decodedToken.user_id) {
        res.status(403).send("Not authorized to add reviews for other users");
        return;
    }
    reviews.addReview(data, function (err, result) {
        if (!err) {
            console.log(result);
            var output = {
                "reviewid": result.insertId
            };
            res.status(201).send(output);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});


app.get('/movie/:id/avgrating', printDebugInfo, function (req, res) {
    var movieid = req.params.id;

    AverageRating(movieid, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Some error");
        }
    });

});


//--------------------------------
//exports
//--------------------------------
module.exports = app;
