import {useState, useEffect} from "react";
import React from "react";

const Sample = () => {
    
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `${count}번 클릭했습니다.`;
    });

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                클릭
            </button>
        </div>
    );
}