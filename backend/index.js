import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "crud",
});

app.get("/", (req, res) => {
	res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
	const query = "SELECT * FROM books";
	db.query(query, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});
app.get("/books/:id", (req, res) => {
	const query = "SELECT * FROM books where id=?";
	const id = req.params.id;
	db.query(query, [id], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post("/books", (req, res) => {
	const query = "insert into books (`title`,`desc`,`price`,`cover`) values (?)";
	const values = [
		req.body.title,
		req.body.desc,
		req.body.price,
		req.body.cover,
	];
	db.query(query, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json("Book has been created successfully!");
	});
});

app.delete("/books/:id", (req, res) => {
	const id = req.params.id;
	const query = "delete from books where id = ?";

	db.query(query, [id], (err, data) => {
		if (err) return res.json(err);
		return res.json("Record is deleted successfully!");
	});
});

app.put("/books/:id", (req, res) => {
	const bookId = req.params.id;
	const query =
		"update books set `title`= ?, `desc`= ?, `price`= ?, `cover`= ? where id= ?";
	const values = [
		req.body.title,
		req.body.desc,
		req.body.price,
		req.body.cover,
	];
	console.log([...values, bookId]);
	db.query(query, [...values, bookId], (err, data) => {
		if (err) return res.json(err);
		return res.json("Record is updated successfully!");
	});
});

app.listen(8080, () => {
	console.log("Connected to backend!");
});
