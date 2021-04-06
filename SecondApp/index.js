const express = require('express')
const path = require('path')
const app = express()
const data = require('./data.json')

// * Templateing setup
// views directory setup
// ejs is embeded javascript it will be the templating we will be using
app.set('view engine','ejs')
// * better practice to start server from other than root directory
app.set('views',path.join(__dirname,'views'))

// * static files setup code
app.use(express.static('public'))

// routes
app.get('/',(req,res)=>{
    res.render('index')
})

// * passing data into template
app.get('/user/:username',(req,res)=>{
    const {username} = req.params
    // console.log(username);
    // * we must pass the data as an object and use <%=%> this tag to unfold in template
    res.render('user',{username})
})

app.get('/random',(req,res)=>{
    const randomNumber = Math.floor(Math.random()*10) + 1
    res.render('random',{randomNumber})
})

// more complex
app.get('/search/:term',(req,res)=>{
    const term = req.params.term
    const result = data[term]
    res.render('results',{result})
})


app.listen(3000,()=>{
    console.log('Server has Started at post 3000')
})