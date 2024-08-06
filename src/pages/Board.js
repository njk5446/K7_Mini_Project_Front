import React from "react";

const Board = ({ idx, title, content, create_Date, nickname, station_no } ) => {
    return (
        <div>
            <h2>{idx}</h2>
            <h2>{title}</h2>
            <h2>{create_Date}</h2>
            <h2>{nickname}</h2>      
            <p>{content}</p>
        </div>
    );
};

export default Board;