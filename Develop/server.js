const express = require("express");
const db = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).send(data);
        }
    })
});

app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            let newNote = req.body;
            saveNote = JSON.parse(data);
            saveNote.push(newNote);
            fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(saveNote), (err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(saveNote);
                }
            })
        }
    })
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));