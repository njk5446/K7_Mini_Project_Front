import {useState, useEffect} from "react";
import React from "react";

const Sample = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.126:8080')
            .then((res) => {
                return res.json();
            })
            .then(function (result) {
                setData(result);
            })
    }, []);
}