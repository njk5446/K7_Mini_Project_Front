import {useState, useEffect} from "react";
import React from "react";

const ShowData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080')
            .then((res) => {
                return res.json();
            })
            .then(function (result) {
                setData(result);
            })
    }, []);
}