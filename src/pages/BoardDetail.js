import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Board from "./Board";

const BoardDetail = () => {
    const { sno } = useParams(); //url 경로에 포함된 매개변수를 가져온다
    const { idx } = useParams(); //
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    return (
        <div>
            게시판 상세보기가 표시됩니다.
        </div>
    );
};

export default BoardDetail;