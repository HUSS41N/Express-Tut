const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// Method override
app.use(methodOverride("_method"));
// mongoose setup
mongoose
	.connect("mongodb://localhost/xpress", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log("Connected to DB "))
	.catch((err) => console.log("Error Failed to connect"));

// Mongoose schema
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String,
});

const XpressBlog = mongoose.model("XpressBlog", blogSchema);

// routes
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
	XpressBlog.find({})
		.then((posts) => {
			res.render("home", { posts });
		})
		.catch((err) => console.log("Err"));
});

app.get("/blogs/new", (req, res) => {
	res.render("new");
});

app.post("/blogs", (req, res) => {
	const { title, image, description } = req.body;
	XpressBlog.create({ title, image, description })
		.then((success) => res.redirect("/blogs"))
		.catch((err) => console.log("error"));
	
});

app.get("/blogs/:id", (req, res) => {
	const { id } = req.params;
	XpressBlog.findById(id)
		.then((post) => res.render("show", { post }))
		.catch((err) => res.redirect("/blogs"));
});

app.get("/blogs/:id/edit", (req, res) => {
	const { id } = req.params;
	XpressBlog.findById(id)
		.then((post) => res.render("edit", { post }))
		.catch((err) => res.redirect("/blogs"));
});

app.patch("/blogs/:id", (req, res) => {
	const { id } = req.params;
	const { title, image, description } = req.body;
	XpressBlog.findByIdAndUpdate(id, { title, image, description })
		.then((post) => res.redirect("/blogs/" + id))
		.catch((err) => res.redirect("/blogs"));
});

app.delete("/blogs/:id",(req,res)=>{
	const { id } = req.params
	XpressBlog.findByIdAndRemove(id)
	.then(()=>res.redirect("/blogs"))
	.catch(err=>res.redirect('/blogs'))
})

app.listen(3000, () => {
	console.log("Server started at port 3000");
});
