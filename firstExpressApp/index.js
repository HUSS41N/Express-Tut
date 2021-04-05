// * Getting the express pakage from node modules
const express = require("express");

// * App --> express app setuo krte h
const app = express();

// * Routes
app.get("/", (req, res) => {
	// console.log(res);
	// * To display something on screen
	res.send("<h1>Hello World</h1>");
});

app.get("/dogs", (req, res) => {
	res.send("I am a DOG PAGE");
});

// app.get("/dogs/Tommy", (req, res) => {
// 	res.send("I am Tommy");
// });
app.get("/dogs/:dogname", (req, res) => {
	// we use req.prams to get the data from the url
	const dogname = req.params.dogname;
	res.send(`I am ${dogname}`);
});

// Another example of dynamic routing
// we create a pattern for url and user should match the routing pattern to get desired results
app.get("/posts/:postname/:postid", (req, res) => {
	const postname = req.params.postname;
	const postid = req.params.postid;
	res.send(`${postname} ${postid}`);
});

//  * Query term search
app.get("/search", (req, res) => {
	const { q } = req.query;
	// database-->q->>>database-->desired results ->>return
	res.send(`Search results for ${q}`);
});

// * Uniservsal route
// Basic error handling for not found pages
// this will only execute on routes you havent defined
// this should always be your last route
app.get("*", (req, res) => {
	res.send("<h1>NOT FOUND ERROR 404</h1>");
});

// you can install nodemon npm install -g nodemon
//  so you dont have to restart your server manully aafter every change

// * App listen
// setup the localhost
app.listen(3000, () => {
	console.log("Server has started");
});
