const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// mongoose setup
mongoose
	.connect("mongodb://localhost/crudAPI", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log("Connected to the DB"))
	.catch((err) => console.log("Failed to connect to DB"));

//* schema
const KittySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	isAvailable: {
		type: Boolean,
		default: true,
	},
});
// register the schema
const Kitten = mongoose.model("Kitten", KittySchema);

// routes
app.get("/", (req, res, next) => {
	res.redirect("/kittens");
});

app.get("/kittens", (req, res, next) => {
	const msg = "Something Went wrong";
	Kitten.find({})
		.then((all) => res.json({ all }))
		.catch((err) => res.json({ msg }));
});

app.post("/kittens", (req, res, next) => {
	const { name, breed, isAvailable } = req.body;
	console.log(name, breed, isAvailable);
	Kitten.create({ name, breed, isAvailable })
		.then((created) => res.json({ created }))
		.catch((err) => res.redirect("/"));
});

app.get("/kittens/:id", (req, res, next) => {
	const { id } = req.params;
	Kitten.findById(id)
		.then((found) => res.json({ found }))
		.catch((err) => console.log(err));
});

app.put("/kittens/:id", (req, res, next) => {
	const { id } = req.params;
	const { name, breed, isAvailable } = req.body;
	Kitten.findByIdAndUpdate(id, { name, breed, isAvailable })
		.then((updated) => res.json({ updated }))
		.catch((err) => console.log(err));
});
app.delete("/kittens/:id", (req, res, next) => {
	const { id } = req.params;
	Kitten.findByIdAndDelete(id)
		.then((deleted) => res.json(deleted))
		.catch((err) => console.log(err));
});

app.get("*", (req, res, next) => {
	res.redirect("/");
});

app.listen(3000, () => {
	console.log("Server started at http://localhost:3000/");
});
