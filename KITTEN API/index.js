const express = require("express");
const multer = require("multer")
const path = require("path")
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
// exposing upload folder public to get images data easily
app.use(express.static("upload"))
app.use(express.json());
app.use(cors());
// mongoose setup
mongoose
	.connect("mongodb://localhost/KittenAPI", {
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
	image:{
		type: String,
		required: true
	}
});
// register the schema
const Kitten = mongoose.model("Kitten", KittySchema);

// multer setup
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000
    }
})
app.use('/image', express.static('upload/images'));
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

app.post("/kittens",upload.single('image'), (req, res, next) => {
	console.log(req.file)
	console.log(req.file.path)
	const obj = {
        name: req.body.name,
        breed: req.body.breed,
		isAvailable: req.body.isAvailable,
        image: req.file.path
    }
	// const { name, breed, isAvailable } = req.body;
	// console.log(req.file)
	Kitten.create(obj)
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

// app.get("*", (req, res, next) => {
// 	res.redirect("/");
// });


function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);
app.listen(3000, () => {
	console.log("Server started at http://localhost:3000/");
});
