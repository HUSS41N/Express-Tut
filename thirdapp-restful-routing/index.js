const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.set("views", (__dirname, "views"));
app.set("view engine", "ejs");
<<<<<<< HEAD
=======

// parsing the form data
// we have to tell express to encode the data we are recinving from req.body to get the data otherwise we will get undefined
app.use(express.urlencoded({ extended: true }));

// if we want to parse json
app.use(express.json());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// routes
// app.get("/", (req, res) => {
// 	res.render("index");
// });
>>>>>>> 813a7383f4fd14704d1afb791b2cfca70212e93b

// parsing the form data
// we have to tell express to encode the data we are recinving from req.body to get the data otherwise we will get undefined
app.use(express.urlencoded({ extended: true }));

// if we want to parse json
app.use(express.json());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// routes
// app.get("/", (req, res) => {
// 	res.render("index");
// });

// // Making a post request in express
// app.post("/", (req, res) => {
// 	console.log(req.body);
// 	// const {name,age} = req.body
// 	// console.log(name,age);
// 	res.send("YOU ON THE POST ROUTE");
// });

// * REST REPRESENTATIONAL STATE TRANSFER
// * Twitter example(CRUD)
// * Uniform interface(a pattern)

// *! COMMMENTS REST APP
let comments = [
<<<<<<< HEAD
	{ id: uuidv4(), username: "Hussain", comment: "Aba Kadar is Dope" },
	{ id: uuidv4(), username: "Vivek", comment: "Aba Kadar apna LEGENND H" },
	{ id: uuidv4(), username: "Kudri", comment: "Aba Kadar ki maa ki chut" },
	{ id: uuidv4(), username: "Saquib", comment: "Ye !Aba Kadar kon hh?" },
];
// * Redirect
app.get("/", (req, res) => {
	res.redirect("/comments");
});
// restful routes get/comments->show all comments
//  post/comments->make new comment
// del/comments/id -> del a comment
// patch/comments/id --> update a comment
=======
    {id:uuidv4(),username:'Hussain',comment:'Aba kadar is dope'},
    {id:uuidv4(),username:'Vivek',comment:'Aba kadar is so cool and funny'},
    {id:uuidv4(),username:'Kudri',comment:'Aba kadar'},
    {id:uuidv4(),username:'Saquib',comment:'ye Aba kadar kon h?'},
]
// * redirect to /comments
app.get('/',(req,res)=>{
    res.redirect('/comments')
})
>>>>>>> 813a7383f4fd14704d1afb791b2cfca70212e93b

app.get("/comments", (req, res) => {
	res.render("index", { comments });
});

// post route
app.post("/comments", (req, res) => {
	const { username, comment } = req.body;
	comments.push({ id: uuidv4(),username: username, comment: comment });
	// res.render('index',{comments})
	res.redirect("/comments");
});
// unique comment
app.get('/comments/:id',(req,res)=>{
    const { id } = req.params
    const comment = comments.find((comment)=> comment.id == id)
    res.render('show',{comment})
})
<<<<<<< HEAD
=======
// unique comment
app.get('/comments/:id',(req,res)=>{
    const { id } = req.params
    const comment = comments.find((comment)=> comment.id == id)
    res.render('show',{comment})
} )
>>>>>>> 813a7383f4fd14704d1afb791b2cfca70212e93b
// patch request
// patch form
app.get('/comments/:id/edit',(req,res)=>{
	const {id} = req.params
	const comment = comments.find((comment)=> comment.id == id)
	res.render('edit',{comment})

})
app.patch('/comments/:id',(req,res)=>{
	// it has accees to req.body
	const {id} = req.params
	const newCommentText = req.body.comment
	const foundComment = comments.find(comment=>comment.id === id)
	foundComment.comment = newCommentText
	res.redirect('/comments')
})
// deleting
app.delete('/comments/:id',(req,res)=>{
	const {id} = req.params
	comments = comments.filter(comment=>comment.id !== id)
	res.redirect('/comments')
})
<<<<<<< HEAD
// server setup
app.listen(3000, () => {
	console.log("Server Listing at port 3000");
});
=======
app.listen(3000,()=>{
    console.log('Server started at port 3000');
})
>>>>>>> 813a7383f4fd14704d1afb791b2cfca70212e93b
