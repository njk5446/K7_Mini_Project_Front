import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Board from "./Board";



const BoardDetail = () => {
    const navigate = useNavigate();
    const { search } = useLocation(); // 검색 url을 search 변수에 저장
    const params = new URLSearchParams(search); // URLSearchParams:search 변수에 들어있는 url 문자열의 파라미터들을 각각 인식해서 가지고 있는다. 이를 params에 저장
    const sno = params.get('sno');
    const idx = params.get('idx');


    const [loading, setLoading] = useState(true); // loading 상태변수를 정의하고 초기값을 true로 선언, 데이터를 가져오는동안 로딩상태를 나태내기위한 용도
    const [board, setBoard] = useState({}); // board 상태 변수를 정의하고 빈 객체로 선언, 가져온 게시판 데이터를 저장하기 위한 용도

    const getBoard = async () => { // 비동기함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        try {
            const resp = (await axios.get(`http://192.168.0.126:8080/board/view?sno=${sno}&idx=${idx}`));
            console.log(resp.data)
            setBoard(resp.data) // resp에 가져온 데이터를 board 상태변수에 저장
        } // axios를 통해 API를 호출하고 await으로 API 응답을 기다린다.     resp 응답변수에 data 속성을 저장한다
        catch (error) {
            alert("게시판 자료를 가져오는데 실패했습니다.")
            navigate(`/board`);
        }
        finally {
            setLoading(false); // 데이터를 board 게시판에 저장했으므로 loading상태를 false로 설정해서 로딩이 완료됨
        }
    }


    useEffect(() => {
        getBoard();
    }, [sno, idx]) // 컴포넌트의 sno, idx가 변경될때마다 getBoard 함수가 호출된다

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-600">게시물 상세</h2>
            </div>
            <ul>
                <Board
                    idx={board.idx}
                    title={board.title}
                    content={board.content}
                    sno={board.station_no}
                    nickname={board.nickname}
                    create_Date={board.create_Date.replace('T', '/').slice(0, 16)}
                />
            </ul>

        </div>
    );
};

export default BoardDetail;