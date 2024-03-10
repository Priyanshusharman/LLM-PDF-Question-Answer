import React from "react";
import "../css/query.css";
const Query = () => {
    return (
        <div className="Question-box">
            <div id="question-bar">
                <input type="text" id="question-input" placeholder="Ask a question..." />
                <button id="ask-button">Ask</button>
            </div>
            <div id="answer-container"></div>

        </div>
    )
}

export default Query;