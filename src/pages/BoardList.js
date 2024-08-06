import React, {useEffect, useState} from "react";
import axios from "axios"; // HTTP 요청을 간편하게 해주는 라이브러리

const BoardList = () => {
    const [boardList, setBoardList] = useState([]); // 빈 리스트 생성
    const getBoardList = async () => {
        let url = 'http://192.168.0.126:8080/board?sno='
        let sno = 96;

        const resp = await (await axios.get(url+sno)).data 
        //axios.get: 
        // 게시글 목록 데이터에 할당
        setBoardList(resp.content)
    }

    useEffect(()=> {
        console.log(boardList)
    },[boardList])

    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);

    return (
        <div>
            <ul>
                {boardList && boardList.map((board) => (
                    <li key={board.idx}>
                        <li>{board.idx}</li>
                        <li><a href={`/board?sno=${board.station_no}&idx=${board.idx}`}>{board.title}</a></li>
                        <li>{board.nickname}</li>
                        <li>{board.create_Date.replace('T', '/').slice(0, 16)}</li>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;