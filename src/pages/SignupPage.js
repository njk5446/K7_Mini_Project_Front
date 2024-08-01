import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
    // useState로 값을 변화시킴
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate(); // 다른 경로로 이동할때 사용

    const handleSignup = async (e) => {
        e.preventDefault(); // 새로고침 막기

        // 회원가입 처리 로직 구현

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }

        const payload = { // 서버로 보내는 데이터 묶음
            password: password,
            name: username,
            role: role,
        };

        // 회원가입에 필요한 서버 통신 
        try {
            const response = await fetch( 
                "요청 주소",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload) // JSON 타입으로 변환해서 서버에 응답
                }
            )

            const data = await response.json();

            if (response.status === 201) {
                navigate("/login");
            } else if (response.status === 400) {
                alert('회원가입 실패: ${data.email}');
            }
        } catch (error) {
            console.error("오류 발생:", error)
        }
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="username">사용자명</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} //입력 필드의 값이 변경될때 바디 안의 함수를 호출한다(실시간으로 감지하고 처리)
                />

                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                />


                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // e는 입력된 값인데 e.target.value로 현재 입력된 값을 뽑아와 useState를 통해 현재의 confirmPassword에 값을 변경한다
                />

                <div className="role-selection">
                    <label>회원 유형</label>
                    <div>
                        <input
                            type="radio"
                            id="user"
                            value="user"
                            checked={role === "user"}
                            onChange={() => setRole("user")}
                        // 사용자가 라디오버튼 누를때 Role은 user로 바뀐다
                        />
                        <label htmlFor="customer">사용자</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="manager"
                            value="manager"
                            checked={role === "manager"}
                            onChange={() => setRole("manager")}
                        />
                        <label htmlFor="manager">매니저</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="admin"
                            value="admin"
                            checked={role === "admin"}
                            onChange={() => setRole("admin")}
                        />
                        <label htmlFor="admin">운영자</label>
                    </div>
                </div>

                <button id="signup-button" onClick={handleSignup}>
                    회원가입
                </button>

                <p className="login-link">
                    <Link to="/login">로그인</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;