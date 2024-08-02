import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
    // useState로 값을 변화시킴
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    
    
    const MAX_LENGTH = 6;

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
            id: userId,
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
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-600">회원가입</h2>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" action="#" onSubmit={handleSignup}>
                        <div>
                            <div class="flex items-center justify-between">
                                <label htmlFor="userId" class="block text-sm font-medium leading-6 text-gray-900">아이디</label>
                            </div>
                            <div>
                                <input input placeholder="아이디" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    type="text"
                                    id="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)} //입력 필드의 값이 변경될때 바디 안의 함수를 호출한다(실시간으로 감지하고 처리)
                                />
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                                <label htmlFor="password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                            </div>
                            <div>
                                <input placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label htmlFor="confirm-password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호 확인</label>
                            </div>
                            <div>
                                <input placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} // e는 입력된 값인데 e.target.value로 현재 입력된 값을 뽑아와 useState를 통해 현재의 confirmPassword에 값을 변경한다
                                />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label htmlFor="nickname" class="block text-sm font-medium leading-6 text-gray-900">닉네임</label>
                            </div>
                            <div>
                                <input placeholder="6자 이내로 입력하세요" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    maxLength={MAX_LENGTH}
                                    type="text"
                                    id="nickname"
                                    value={userNickname}
                                    onChange={(e) => setUserNickname(e.target.value)}
                                />
                            </div>
                        </div>




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

                        <p class="mt-10 text-center text-sm text-gray-500">
                        <a href="#" class="font-semibold leading-6 text-green-600 hover:text-green-500">
                            <Link to="/login">이미 회원이신가요?</Link>
                        </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;