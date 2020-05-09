import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import InputArea from "./InputArea";
import { Button } from "@material-ui/core";

const App = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [notesArr, setNotesArr] = useState([]);
    const [noteClicked, setNoteClicked] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [noteId, setNoteId] = useState("");

    useEffect(() => {
    fetch("https://noteskeeperapp.herokuapp.com/notes")
        .then((res) => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setNotesArr(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, []);

    // for adding notes to notesArr
    const addNote = (titleText, contentText) => {
        if (contentText && titleText) {
            fetch("https://noteskeeperapp.herokuapp.com/notes", {
                method: "post",
                body: "title=" + titleText + "&content=" + contentText,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log(result);

                        setNotesArr((prevNotesArr) => {
                            return [...prevNotesArr, result];
                        });
                    },
                    (error) => {
                        console.log(error);

                        setNotesArr((prevNotesArr) => {
                            return prevNotesArr;
                        });
                    }
                );
        } else {
            setNotesArr((prevNotesArr) => {
                return prevNotesArr;
            });
        }
    };

    // for deleting notes from notesArr
    const deleteNote = (id) => {
        fetch(`https://noteskeeperapp.herokuapp.com/note/${id}`, {
            method: "delete",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    fetch("https://noteskeeperapp.herokuapp.com/notes")
                        .then((res) => res.json())
                        .then(
                            (result) => {
                                setIsLoaded(true);
                                setNotesArr(result);
                            },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                            }
                        );
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const searchFor = (searchTerm) => {
        fetch(`https://noteskeeperapp.herokuapp.com/notes/${searchTerm}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setNotesArr(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    const showEditDiv = (id) => {
        setNoteClicked(true);

        fetch(`https://noteskeeperapp.herokuapp.com/note/${id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setTitle(result.title);
                    setContent(result.content);
                    setNoteId(id);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    const saveEdit = (noteIdToEdit) => {
        if (noteIdToEdit) {
            fetch(
                `https://noteskeeperapp.herokuapp.com/note/${noteIdToEdit}`,
                {
                    method: "post",
                    body: "title=" + title + "&content=" + content,
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded",
                    },
                }
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setNoteClicked(false);

                        fetch("https://noteskeeperapp.herokuapp.com/notes")
                            .then((res) => res.json())
                            .then(
                                (result) => {
                                    setIsLoaded(true);
                                    setNotesArr(result);
                                },
                                (error) => {
                                    setIsLoaded(true);
                                    setError(error);
                                }
                            );
                    },
                    (error) => {
                        console.log(error);

                        setNotesArr((prevNotesArr) => {
                            return prevNotesArr;
                        });
                    }
                );
        }
    };

    return (
        <div>
            {noteClicked ? (
                <div className="edit-container">
                    <div className="input-cont">
                        <input
                            name="title"
                            placeholder="Title"
                            maxLength={34}
                            autoComplete="off"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <textarea
                            name="content"
                            placeholder="Take a note..."
                            autoComplete="off"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            rows={5}
                        />

                        <div className="btn-cont">
                            <button
                                onClick={() => {
                                    setNoteClicked(false);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    saveEdit(noteId);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <Header handleSearch={searchFor} />

            <div className="note-container">
                <InputArea handleClick={addNote} />

                <p className="your-notes">Your notes</p>
                <div className="all-notes">
                    {error ? (
                        <p className="try-again-btn">
                            Uhuhh...We searched high and low but couldn't find
                            your notes!
                            <Button>
                                <a href="/">Reload notes</a>
                            </Button>
                        </p>
                    ) : !isLoaded ? (
                        <h1 className="loading">Loading...</h1>
                    ) : (
                        notesArr.map((note, index) => (
                            <Note
                                key={index}
                                id={note._id}
                                title={note.title}
                                content={note.content}
                                handleClick={deleteNote}
                                handleEdit={showEditDiv}
                            ></Note>
                        ))
                    )}
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default App;
