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
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">로그인</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="mx-auto mt-16 max-w-xl sm:mt-20" action="#" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" class="block text-sm font-semibold leading-6 text-gray-900">아이디</label>
            <div>
              <input class="block w-full rounded-md border-0 my-2 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                id="userId"
                value={inputUserId}
                onChange={(e) => setInputUserId(e.target.value)}
              // onChange: 입력하는동안 문자를 타이핑할때마다 onChange에서 정의한 파라미터의 e(이벤트)가 발생
              // 여기서 e.target.value는 현재 입력한 값으로, userId의 값을 현재 입력한 값으로 변경시킨다.
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" class="block text-sm font-semibold leading-6 text-gray-900">비밀번호</label>
            </div>
            <div>
              <input class="block w-full rounded-md border-0 my-2 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              id="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            </div>
          </div>
          <button class="block w-full rounded-md bg-indigo-600 my-3 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleLogin}>로그인</button>
          
          <p className="mt-10 text-center text-sm text-gray-500">
            계정이 없으신가요?
            <Link className="font-semibold leading-6 text-green-600 hover:text-green-500" to="/signup">회원가입</Link>
          </p>
        </form>
        <button class="my-2 px-5 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={handleGoogleLogin}>
            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Login with Google</span>
          </button>
      </div>
    </div>
  );
};

export default LoginPage;