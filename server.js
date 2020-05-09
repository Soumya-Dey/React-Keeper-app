const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Set static folder
app.use(express.static("build"));

// database setup
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) console.log(err);
        else console.log("Database connected");
    }
);

// database schema
const noteSchema = mongoose.Schema({
    title: String,
    content: String,
});

// data model
const Note = mongoose.model("note", noteSchema);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

/*
------------------------------------------------------------------------------------------------------------------------------------------------
all notes
------------------------------------------------------------------------------------------------------------------------------------------------
*/

app.route("/notes")
    // gets all the notes
    .get((req, res) => {
        Note.find({}, (err, results) => {
            if (err) res.send(JSON.stringify(err));
            else res.send(JSON.stringify(results));
        });
    })
    // adds a new note with the provided values
    .post((req, res) => {
        if (req.body.title && req.body.content) {
            const newNote = Note({
                title: req.body.title,
                content: req.body.content,
            });

            newNote.save((err) => {
                if (err) res.send(JSON.stringify(err));
                else res.send(JSON.stringify(newNote));
            });
        } else {
            res.send(
                JSON.stringify({
                    error: "'title' and 'content' both need to specified",
                })
            );
        }
    })
    // delets all the notes
    .delete((req, res) => {
        Note.deleteMany((err) => {
            if (err) res.send(JSON.stringify(err));
            else
                res.send(
                    JSON.stringify({
                        success: "all notes deleted successfully",
                    })
                );
        });
    });

app.route("/notes/:searchText")
    // gets the notes where the searchText is in the title
    .get((req, res) => {
        Note.find(
            {
                title: {
                    $regex: req.params.searchText,
                    $options: "i", // ignores case sensivity
                },
            },
            (err, results) => {
                if (err) res.send(JSON.stringify(err));
                else {
                    if (results) res.send(JSON.stringify(results));
                    else
                        res.send(
                            JSON.stringify({
                                error: "no note found with that title!",
                            })
                        );
                }
            }
        );
    });

/*
------------------------------------------------------------------------------------------------------------------------------------------------
specific note
------------------------------------------------------------------------------------------------------------------------------------------------
*/

app.route("/note/:noteId")
    // gets the notes where the searchText is in the title
    .get((req, res) => {
        Note.findById(req.params.noteId, (err, result) => {
            if (err) res.send(JSON.stringify(err));
            else {
                if (result) res.send(JSON.stringify(result));
                else
                    res.send(
                        JSON.stringify({
                            error: "no note found with that id!",
                        })
                    );
            }
        });
    })
    // delets the specific note
    .delete((req, res) => {
        Note.findByIdAndRemove(req.params.noteId, (err, result) => {
            if (err) res.send(JSON.stringify(err));
            else res.send(JSON.stringify(result));
        });
    })
    // updates the new value of title or content or both to the corresponding fields
    // of the specific note
    .post((req, res) => {
        if (req.body.title || req.body.content) {
            Note.findByIdAndUpdate(
                req.params.noteId,
                { $set: req.body },
                (err, result) => {
                    if (err) res.send(JSON.stringify(err));
                    else res.send(JSON.stringify(result));
                }
            );
        } else {
            res.send(
                JSON.stringify({
                    error: "'title' or 'content' need to specified",
                })
            );
        }
    });

// listining to port set by process.env or 3000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
