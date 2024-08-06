import React, { useState } from "react";
// React 라이브러리에서 React와 useState 훅을 가져오는 것
// useState: const[변경할 변수, 변경할값] = useState("");
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
//react-router-dom 라이브러리에서 Link, useNavigate 가져오는 것

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  let token = "";
  const navigate = useNavigate(); // useNavigate: 다른 경로(페이지) 이동 내장 객체

  const handleLogin = async (event) => {
    // 비동기: 코드가 실행되는 동안 다른 작업을 동시에 진행하는 방식
    // async(이벤트 파라미터): 비동기작업 요청 시 handleLogin함수 호출  
    event.preventDefault(); // 비동기작업요청(e).preventDefault: 비동기작업요청하면 새로고침을 막는다.
    // await: 비동기 작업 요청의 응답을 기다리는 키워드
    // Promise: 비동기 요청의 응답 성공 or 실패 반환
    // r은 비동기 요청의 응답값
    // setTimeout(비동기 요청의 응답값, 기다리는 시간)
    // 1초 대기 후 비동기 요청의 응답을 반환

    // 서버 요청의 응답
    const response = await fetch(
      // fetch: 서버에 HTTP 요청을 보내는 함수
      // fetch 함수는 Promise를 반환하고 
      // await는 fetch 요청에서 Promise를 통해 성공적으로 반환하면 reponse 함수로 들어간다
      'http://192.168.0.126:8080/login', // 요청을 보낼 서버의 URL 
      {
        method: "POST", // 데이터를 서버에 제출하기 위해서 HTTP POST 메서드 사용
        headers: {
          "Content-Type": "application/json", // 요청 본문을 json 타입임을 나타낸다
          // "Autorization": sessionStorage.getItem("token")
        },
        body: JSON.stringify({ // JSON.stringify를 통해 email과 password를 JSON 문자열로 변환
          userid: userId,
          password: password,
        }),
      }
    ).then(resp => {

      if (resp.status === 200) { // 200(성공)인지 응답 상태 확인
        token = resp.headers.get("Authorization")
        // sessionStorage: 브라우저 내장 객체로서, 데이터 저장소
        sessionStorage.setItem("token", token); // 토큰 저장 (데이터 저장소에)
        navigate("/"); // 로그인 성공시 홈으로 이동
      } else {
        alert("로그인 실패했습니다.");
      }
    }

    );
  }
    // 서버 응답 결과


    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-600">로그인</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">아이디</label>
              <div>
                <input required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
              </div>
              <div><input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
            </div>
            {loginCheck && (
              <label style={{ color: "red" }}>아이디 혹은 비밀번호가 틀렸습니다.</label>
            )}
            <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={handleLogin}>로그인</button>

            <p className="mt-10 text-center text-sm text-gray-500">
              계정이 없으신가요?
              <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500"><Link to="/signup">회원가입</Link></a>
            </p>
          </form>
        </div>
      </div>
    );
  };

  export default LoginPage;