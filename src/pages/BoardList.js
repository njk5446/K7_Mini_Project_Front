import React, { useEffect, useState, useRef } from "react";
import axios from "axios"; // HTTP 요청을 간편하게 해주는 라이브러리
import { Link } from "react-router-dom";

const BoardList = () => {

    const selectRef = useRef();
    const inputRef = useRef();

    const [boardList, setBoardList] = useState([]); // 빈 리스트 생성
    const getBoardList = async () => {
        let url = 'http://192.168.0.126:8080/board?sno='
        let sno = 96;

        const resp = await (await axios.get(url + sno)).data
        //axios.get: 
        // 게시글 목록 데이터에 할당
        setBoardList(resp.content)
    }

    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);



    // 검색버튼 누를시 호출
    const searchBoard = async () => { // 비동기함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        let keyword = inputRef.current.value.trim();

        if(keyword.length < 2) {
            alert("2글자 이상 입력해주세요.")
            inputRef.current.focus()
            return
        }
        try {
            console.log("응답전 :"+ keyword)
            const resp = (await axios.get(`http://192.168.0.126:8080/board/search?searchType=${selectRef.current.value}&keyword=${keyword}`));
            setBoardList(resp.data.content) // resp에 가져온 데이터를 board 상태변수에 저장
            console.log("응답후 키워드 :"+ keyword)
            
        } // axios를 통해 API를 호출하고 await으로 API 응답을 기다린다.     resp 응답변수에 data 속성을 저장한다
        catch (error) {
            alert("게시판 자료를 가져오는데 실패했습니다.")
        }

        finally {
            keyword=""
            console.log("초기화 후 :"+ keyword)
            if (boardList.length == 0) {
                console.log("검색내용 없음")
                return "검색된 내용이 없습니다"
            }
        }

        

    }



    return (
        <div>
            <div>
                <label>
                    <select ref={selectRef}>
                        {/* 셀렉트 박스의 값이 변경될때  handleSearchTypeChange 함수 호출*/}
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="nickname">닉네임</option>
                    </select>
                </label>
                <input type="text" ref={inputRef}></input>
                <button onClick={searchBoard}>검색</button>
            </div>
            <div>
                {boardList.length === 0 ? (
                    <p>검색된 내용이 없습니다.</p>
                ) : (
                        <ul>
                            {boardList && boardList.map((board) => (
                                <li key={board.idx}>
                                    <li>{board.idx}</li>
                                    <Link to={`/board/view?sno=${board.station_no}&idx=${board.idx}`}>
                                        {board.title}
                                    </Link>
                                    <li>{board.nickname}</li>
                                    <li>{board.create_Date.replace('T', '/').slice(0, 16)}</li>
                                </li>
                            ))}
                           
                        </ul>
                )}
            </div>
           
        </div>
    );
};

export default BoardList;