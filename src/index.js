import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// fetch("http://localhost:5000/notes", {
//     method: "post",
//     body: "title=new&content=testing",
//     headers: { "Content-type": "application/x-www-form-urlencoded" },
// }).then((res) => console.log(res.json()));

ReactDOM.render(<App />, document.getElementById("root"));
