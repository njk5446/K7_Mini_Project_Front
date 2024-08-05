import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
    // useState로 값을 변화시킴
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [idChecked, setIDChecked] = useState(false);

    const idRef = useRef("");

    const MAX_LENGTH = 16;

    const navigate = useNavigate(); // 다른 경로로 이동할때 사용

    useEffect(() => {
        console.log("입력")
        setIDChecked(false)
    },[idRef.current.value])

    const handleDuplicate = async (e) => {
        e.preventDefault();

        const checkIDPayload = {
            userid: userId
        }

        if (!userId) {
            alert('ID를 입력하세요.')
            return;
        }

        await fetch(
            "http://192.168.0.126:8080/signup/checkid",
            {
                method: "POST",


                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkIDPayload) // JSON 타입으로 변환해서 서버에 응답
            }
        ).then(resp => {
            if (resp.status === 200) {
                setUserId(idRef.current.value);
                alert("사용 가능한 ID 입니다.");
                setIDChecked(true)
            } else {
                alert("중복된 ID 입니다.");
                setIDChecked(false)
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault(); // 새로고침 막기

        // 회원가입 처리 로직 구현

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        } 
        if (!idChecked) {
            alert("ID 중복 체크를 해주세요.")
            return;
        }

        const payload = { // 서버로 보내는 데이터 묶음
            userid: userId,
            password: password,
            nickname: userNickname
        };
        // 회원가입에 필요한 서버 통신 
        await fetch(
            "http://192.168.0.126:8080/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            }
        )

            .then(resp => {
                if (resp.status === 200) {
                    alert("회원가입이 완료되었습니다.")
                    navigate("/login");
                } else {
                    alert('회원가입 실패');
                }
            }
            )
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-600">회원가입</h2>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" onSubmit={handleSignup}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">아이디</label>
                                <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={handleDuplicate}>중복 확인</button>
                            </div>
                            <div>
                                <input input placeholder="아이디" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    type="text"
                                    id="userId"
                                    value={userId}
                                    ref={idRef}
                                    onChange={(e) => setUserId(e.target.value)} //입력 필드의 값이 변경될때 바디 안의 함수를 호출한다(실시간으로 감지하고 처리)
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                            </div>
                            <div>
                                <input placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">비밀번호 확인</label>
                            </div>
                            <div>
                                <input placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} // e는 입력된 값인데 e.target.value로 현재 입력된 값을 뽑아와 useState를 통해 현재의 confirmPassword에 값을 변경한다
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">닉네임</label>
                            </div>
                            <div>
                                <input placeholder="6자 이내로 입력하세요" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    maxLength={MAX_LENGTH}
                                    type="text"
                                    id="nickname"
                                    value={userNickname}
                                    onChange={(e) => setUserNickname(e.target.value)}
                                />
                            </div>
                        </div>

                        <button id="signup-button" onClick={handleSignup}>
                            회원가입
                        </button>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
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