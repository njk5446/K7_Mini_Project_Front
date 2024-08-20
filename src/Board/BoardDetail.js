import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

import { snoSel } from '../SnoAtom';
import { useRecoilValue } from 'recoil';

const url = process.env.REACT_APP_API_URL;


const BoardDetail = () => {

    const sno = useRecoilValue(snoSel);
    const navigate = useNavigate();
    const { search } = useLocation(); // 검색 url을 search 변수에 저장
    const params = new URLSearchParams(search); // URLSearchParams:search 변수에 들어있는 url 문자열의 파라미터들을 각각 인식해서 가지고 있는다. 이를 params에 저장
    const idx = params.get('idx');


    const [loading, setLoading] = useState(true); // loading 상태변수를 정의하고 초기값을 true로 선언, 데이터를 가져오는동안 로딩상태를 나태내기위한 용도
    const [board, setBoard] = useState({}); // board 상태 변수를 정의하고 빈 객체로 선언, 가져온 게시판 데이터를 저장하기 위한 용도

    const getBoard = async () => { // 비동기함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        try {
            const resp = (await axios.get(`${url}board/view?idx=${idx}`));
            setBoard(resp.data) // resp에 가져온 데이터를 board 상태변수에 저장
        } // axios를 통해 API를 호출하고 await으로 API 응답을 기다린다.     resp 응답변수에 data 속성을 저장한다
        catch (error) {
            alert("해당 게시물을 가져오는데 실패했습니다.")
            navigate(`/`);
        }
        finally {
            setLoading(false); // 데이터를 board 게시판에 저장했으므로 loading상태를 false로 설정해서 로딩이 완료됨
        }
    }


    useEffect(() => {
        getBoard();
    }, [idx, sno])

    if (loading) {
        return <Loading />;
    }

    const handleUpdate = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: { 'Authorization': sessionStorage.getItem("token") }
            });
            if (resp.status === 200) {
                navigate(`/edit?sno=${sno}&idx=${idx}`);
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('게시물 작성자가 아니므로 해당 게시물을 수정 할 수 없습니다.');
                return;
            }
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: { 'Authorization': sessionStorage.getItem("token") }
            });
            if (resp.status === 200 && window.confirm('게시글을 삭제하시겠습니까?')) {
                const delResp = await axios.post(`${url}delete?sno=${sno}&idx=${idx}`, '', {
                    headers: { 'Authorization': sessionStorage.getItem("token") }
                });
                if (delResp.status === 200) {
                    alert('게시물이 삭제되었습니다.');
                    navigate(-1);
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('게시물 작성자가 아니므로 해당 게시물을 삭제할 수 없습니다.');
            }
        }
    };

    const handleList = () => {
        navigate(-1);
    }



    return (
<div className="flex h-screen bg-white items-center justify-center overflow-hidden">
    <div className="w-full max-w-2xl bg-white rounded p-5">
        <header className="mb-5">
            <h2 className="text-3xl font-bold text-center text-gray-900">게시물 상세</h2>
        </header>
        <form>
            <div className="post-container mb-6 border rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-14rem)]">
                <div className="flex flex-wrap items-start text-xl mb-2">
                    <span className="mr-2 font-semibold">제목:</span>
                    <h2 className="text-xl">{board.title}</h2>
                </div>

                <div className="flex flex-wrap items-center text-xl mb-2">
                    <span className="mr-2 font-semibold">닉네임:</span>
                    <span>{board.nickname}</span>
                </div>
                
                <div className="flex flex-wrap items-center text-xl mb-2">
                    <span className="mr-2 font-semibold">날짜:</span>
                    <span>{board.create_Date.replace('T', '/').slice(0, 16)}</span>
                </div>

                <div className="flex flex-wrap items-center text-xl mb-2">
                    <span className="mr-2 font-semibold">내용:</span>
                    <span>{board.content}</span>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                    type="button"
                    onClick={handleUpdate}
                >
                    수정
                </button>
                <button
                    className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                    type="button"
                    onClick={handleDelete}
                >
                    삭제
                </button>
                <button
                    className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                    type="button"
                    onClick={handleList}
                >
                    목록
                </button>
            </div>
        </form>
    </div>
</div>

    );
};

export default BoardDetail;