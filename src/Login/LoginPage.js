import React, { useState } from "react";
// React 라이브러리에서 React와 useState 훅을 가져오는 것
// useState: const[변경할 변수, 변경할값] = useState("");
import { Link } from "react-router-dom";
//react-router-dom 라이브러리에서 Link, useNavigate 가져오는 것
import Loading from "../Loading";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const [inputUserId, setInputUserId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false); // 로딩중 출력


  let token = "";


  if (loading) {
    return <Loading />;
  }

  const handleGoogleLogin = () => {
    // 사용자를 Google OAuth2 인증 페이지로 리디렉션
    window.location.href = 'http://192.168.0.126.nip.io:8080/oauth2/authorization/google';
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)

    await axios.post(  //axios는 응답을 json으로 자동변환해줌
      `${url}login`,
      { // 서버로 보낼 데이터
        userid: inputUserId,
        password: inputPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json', // 요청 본문이 JSON 타입임을 명시
        }
      }
    ).then(resp => {

      if (resp.status === 200) { // 200(성공)인지 응답 상태 확인
        token = resp.headers.get("Authorization")
        // sessionStorage: 브라우저 내장 객체로서, 데이터 저장소
        sessionStorage.setItem("token", token); // 토큰 저장 (세션 저장소에)
        // 토큰만 저장한 이유? 
        // sessionStorage에 필요한 최소한의 정보만 저장하는 것이 바람직하다. 토큰만 저장하면 데이터 관리 또한 간편해진다.
        alert("로그인되었습니다.")
        window.location.href = "/"; // 홈 페이지로 이동 및 페이지 새로 고침
      } else {
        alert("아이디 혹은 비밀번호가 틀렸습니다.");
      }
    }
    ).finally(() => {
      setLoading(false) // 처리중 메시지 
    })
  }
  // 서버 응답 결과


  return (
    <div className="flex h-screen bg-white items-center justify-center overflow-hidden">
      <div className="w-full max-w-2xl bg-white rounded p-5">
        <header className="mb-5">
          <h2 className="text-3xl font-bold text-center text-gray-900">로그인</h2>
        </header>
        <form onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-slate-700" >아이디</label>
            <input
              className="w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
              type="text"
              id="username"
              value={inputUserId} // **수정됨**
              onChange={(e) => setInputUserId(e.target.value)} // **수정됨**
            />
          </div>
          <div>
            <label className="block mb-2 text-slate-700" htmlFor="password">비밀번호</label>
            <input
              className="w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
              type="password"
              id="password"
              value={inputPassword} // **수정됨**
              onChange={(e) => setInputPassword(e.target.value)} // **수정됨**
            />
          </div>
          <div>
            <button
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
              type="submit"
            >
              로그인
            </button>
          </div>
        </form>
        <footer className="flex justify-between text-sm text-slate-700">
          <a className="text-slate-500 hover:text-slate-800" href="#">비밀번호를 잊으셨나요?</a>
          <Link className="text-slate-500 hover:text-slate-800" to="/signup">회원가입</Link> {/* **수정됨** */}
        </footer>
        <button
          className="mt-4 w-full px-5 py-2 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 transition duration-150 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset
           my-2"
          onClick={handleGoogleLogin}
        >
          <img className="w-6 h-6 inline-block" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
          <span className="ml-2">Google로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;