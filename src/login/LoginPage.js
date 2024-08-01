import React, { useState } from "react";
// React 라이브러리에서 React와 useState 훅을 가져오는 것
// useState: const[변경할 변수, 변경할값] = useState("");
import { Link, useNavigate } from "react-router-dom";
//react-router-dom 라이브러리에서 Link, useNavigate 가져오는 것

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  const navigate = useNavigate(); // useNavigate: 다른 경로(페이지) 이동 내장 객체

  const handleLogin = async (event) => {
    // 비동기: 코드가 실행되는 동안 다른 작업을 동시에 진행하는 방식
    // async(이벤트 파라미터): 비동기작업 요청 시 handleLogin함수 호출  
    event.preventDefault(); // 비동기작업요청(e).preventDefault: 비동기작업요청하면 새로고침을 막는다.
    await new Promise((r) => setTimeout(r, 1000));
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
      "로그인 서버 주소", // 요청을 보낼 서버의 URL 
      {
        method: "POST", // 데이터를 서버에 제출하기 위해서 HTTP POST 메서드 사용
        headers: {
          "Content-Type": "application/json", // 요청 본문을 json 타입임을 나타낸다
        },
        body: JSON.stringify({ // JSON.stringify를 통해 email과 password를 JSON 문자열로 변환
          email: email,
          password: password,
        }),
      }
    );
     // 서버 응답 결과
     const result = await response.json(); // 응답 데이터를 JSON 형식으로 변환

    if (response.status === 200) { // 200(성공)인지 응답 상태 확인
      setLoginCheck(false);
      // 로그인 성공하면 loginCheck가 필요없으니까 false
      // sessionStorage: 브라우저 내장 객체로서, 데이터 저장소
      sessionStorage.setItem("token", result.token); // 토큰 저장 (데이터 저장소에)
      sessionStorage.setItem("email", result.email); // email 저장 (데이터 저장소에)
      sessionStorage.setItem("role", result.role);// ROLE 저장 (데이터 저장소에)
      sessionStorage.setItem("id", result.Id); // id 저장 (데이터 저장소에)
      console.log("로그인성공, 이메일주소:" + result.email);
      navigate("/"); // 로그인 성공시 홈으로 이동
    } else {
      setLoginCheck(true); // 로그인 실패시 loginCheck가 필요하므로 true
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">이메일</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {loginCheck && (
        <label  style={{color: "red"}}>이메일 혹은 비밀번호가 틀렸습니다.</label>
        )}
        <button onClick={handleLogin}>로그인</button>

        <p className="signup-link">
          <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;