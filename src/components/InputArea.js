import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom } from "@material-ui/core";

const InputArea = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [inFocus, setFocus] = useState(false);
    const [isTyped, setTyped] = useState({
        titleTyped: true,
        contentTyped: true,
    });

    return (
        <div>
            <form className="create-note">
                {inFocus ? (
                    <div>
                        <input
                            name="title"
                            placeholder="Title"
                            maxLength={34}
                            onChange={(event) => setTitle(event.target.value)}
                            autoComplete="off"
                            value={title}
                        />
                        {!isTyped.titleTyped ? (
                            <p className="error-text">Add some title</p>
                        ) : null}
                    </div>
                ) : null}

                <div>
                    <textarea
                        name="content"
                        placeholder="Take a note..."
                        rows={inFocus ? 3 : 1}
                        onChange={(event) => setContent(event.target.value)}
                        value={content}
                        autoComplete="off"
                        onFocus={() => setFocus(true)}
                    />
                    {!isTyped.contentTyped ? (
                        <p className="error-text">
                            Add some content to your note
                        </p>
                    ) : null}
                </div>

                {inFocus ? (
                    <Zoom in={inFocus}>
                        <Fab
                            onClick={(event) => {
                                if (title && content) {
                                    props.handleClick(title, content);

                                    setTitle("");
                                    setContent("");

                                    setFocus(false);

                                    setTyped({
                                        titleTyped: true,
                                        contentTyped: true,
                                    });
                                } else {
                                    if (!title && content)
                                        setTyped({
                                            titleTyped: false,
                                            contentTyped: true,
                                        });
                                    else if (!content && title)
                                        setTyped({
                                            titleTyped: true,
                                            contentTyped: false,
                                        });
                                    else if (!title && !content)
                                        setTyped({
                                            titleTyped: false,
                                            contentTyped: false,
                                        });
                                }

                                event.preventDefault();
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Zoom>
                ) : null}
            </form>
        </div>
    );
};

export default InputArea;
