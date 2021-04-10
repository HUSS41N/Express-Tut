const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.set("views", (__dirname, "views"));
app.set("view engine", "ejs");

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

// * comments 
let comments = [
    {id:uuidv4(),username:'Hussain',comment:'Aba kadar is dope'},
    {id:uuidv4(),username:'Vivek',comment:'Aba kadar is so cool and funny'},
    {id:uuidv4(),username:'Kudri',comment:'Aba kadar'},
    {id:uuidv4(),username:'Saquib',comment:'ye Aba kadar kon h?'},
]
// * redirect to /comments
app.get('/',(req,res)=>{
    res.redirect('/comments')
})

// * list all comments
app.get('/comments',(req,res)=>{
    res.render('index',{comments})
})

// * post a new comment
// we are submitig our form to this resuest and after that req.body is generated
//  getting our data from request.body and appending it to our comments array 
//  and redirecting to /comments get page
app.post('/comments',(req,res)=>{
    const {username,comment} = req.body
    // const username = req.body.username
    // const comment = req.body.comment
    comments.push({id:uuidv4(),username:username,comment:comment})
    res.redirect('/comments')
})
// unique comment
app.get('/comments/:id',(req,res)=>{
    const { id } = req.params
    const comment = comments.find((comment)=> comment.id == id)
    res.render('show',{comment})
} )
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
app.listen(3000,()=>{
    console.log('Server started at port 3000');
})
