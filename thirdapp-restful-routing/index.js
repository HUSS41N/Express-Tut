const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
// app.use(express.json())

// * comments 
let comments = [
    {id:uuidv4(),username:'Hussain',comment:'Aba kadar is dope'},
    {id:uuidv4(),username:'Vivek',comment:'Aba kadar is so cool and funny'},
    {id:uuidv4(),username:'Kudri',comment:'Aba kadar ki maa ki chut'},
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

app.listen(3000,()=>{
    console.log('Server started at port 3000');
})