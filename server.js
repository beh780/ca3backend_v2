//NAME: BEH PEI HAO
//CLASS:DIT/1B/39
//ADMIN NO: P2037547


console.log("-----------------------------------------------------");
console.log("assigment>server.js");
console.log("-----------------------------------------------------");
//--------------------------------
//import
//--------------------------------


const app = require('./controller/app');




//--------------------------------
//configuration
//--------------------------------
const hostname = 'localhost';
const port = process.env.PORT || 3002;





//--------------------------------
//main
//--------------------------------
//start the server and start listening for incoming requests
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`
    );
});
