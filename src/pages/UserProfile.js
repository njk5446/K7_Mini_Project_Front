import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const UserProfile = ({onLogout}) => {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    //로그아웃 처리 함수
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        onLogout();
        window.location.reload();
        navigate("/"); // 로그아웃시 자동으로 홈화면으로 이동
    }

    

    // 닉네임 변경 함수
    const handleNicknameChange = async (e) => {
        e.preventDefault();

        if (!nickname) { //공백입력시 
            alert('새 닉네임을 입력하세요.')
            return;
        }

        const resp = await fetch(url + "mypage/changenick", 
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    nickname: nickname,
                }),
            }
        );

        if (resp.ok) {
            alert('닉네임이 성공적으로 변경되었습니다.');
            navigate('/mypage')
        } else {
            alert('닉네임 변경에 실패했습니다.');
        }
    };

    // 비밀번호 변경 함수
    const handlePasswordChange = async () => {
        if (!password) { //공백입력시 
            alert('새 비밀번호를 입력하세요.')
            return;
        }
        const resp = await fetch(url + "mypage/changepw",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    password: password
                })
            }
        );
        if (resp.ok) {
            alert('비밀번호가 성공적으로 변경되었습니다.')
            
        } else {
            alert('비밀번호 변경에 실패했습니다.')
        }
    }

    return (
        <div>
            <h2>회원정보</h2>

            <div className="form">
                <label>닉네임</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="새로운 닉네임 입력" />
                <button onClick={handleNicknameChange}>변경</button>
            </div>
            <div className="form">
                <label>새 비밀번호</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호" />
                <br />
                    <label>새 비밀번호 확인</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="새 비밀번호 확인" />
                <button onClick={handlePasswordChange}>변경</button>
            </div>
            
            <div>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    )
}
export default UserProfile;