import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import { Zoom } from "@material-ui/core";

const Note = (props) => {
    return (
        <div className="note">
            <Zoom in={true}>
                <h1>{props.title}</h1>
            </Zoom>
            <Zoom in={true}>
                <p>{props.content}</p>
            </Zoom>

            <Zoom in={true}>
                <button className="edit-icon" onClick={() => props.handleEdit(props.id)}>
                    <EditIcon />
                </button>
            </Zoom>

            <Zoom in={true}>
                <button
                    onClick={() => {
                        props.handleClick(props.id);
                    }}
                >
                    <HighlightOffIcon />
                </button>
            </Zoom>
        </div>
    );
};

export default Note;
