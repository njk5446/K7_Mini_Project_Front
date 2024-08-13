import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const UserProfile = ({onLogout}) => {

    const [nickname, setNickname] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [randomNick, setRandomNick] = useState('');



    //로그아웃 처리 함수
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        onLogout();
        navigate("/"); // 로그아웃시 자동으로 홈화면으로 이동
    }

    

    // 닉네임 변경 함수
    const handleNicknameChange = async (e) => {
        e.preventDefault();

        if (!nickname) { //공백입력시 
            alert('새 닉네임을 입력하세요.')
            return;
        }

        if (nickname.length > 16) {
            alert('닉네임 16자를 초과했습니다.')
            return;
        } 

        await fetch(url + "mypage/changenick", 
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
        )
        .then((resp) => {
            if(resp.status === 200) {
                alert('닉네임이 성공적으로 변경되었습니다.');
                navigate('/mypage')
            } else {
                alert('닉네임 변경에 실패했습니다.')
                return;
            }
        })

        
    };

    // 비밀번호 변경 함수
    const handlePasswordChange = async () => {
        if (!newPassword && !newConfirmPassword) { //공백입력시 
            alert('새 비밀번호를 입력하세요.')
            return;
        } 

        if (newPassword.length > 16) {
            alert('비밀번호 16자 이내로 입력하세요.')
            return;
        }
        
        else if (newPassword !== newConfirmPassword){
            alert('비밀번호를 확인해주세요.')
            return;
        } 
        

        await fetch(url + "mypage/changepw",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    password: newPassword
                })
            }
        ).then((resp) => {
            if(resp.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.')
            } else {
                alert('비밀번호 변경에 실패했습니다.')
                return;
            }
        })        
    }


    const generateRandomNickname = async () => {
        // async: 비동기 함수이며, 항상 Promise를 반환한다.
        const resp = await fetch(url + "mypage/randomnick");
        // 함수내에서 await을 사용해서 비동기작업의 완료를 기다린다. fetch 요청에 성공하면 Promise는 Response를 반환하며 resp에 반환된 값이 저장됨
        // 비동기작업이 완료될때까지 코드를 일시 정지시키는 것
        return await resp.text(); // 텍스트로 변환될때까지 기다리고 반환
        
    }
    
    const handleRandomNickname = async () => {
        const randomNick = await generateRandomNickname(); // 현재 randomNick에 mypage/randomnick의 text를 저장
        setNickname(randomNick); // 닉네임에 저장하면 nickName에 출력된다
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
                <button type="button" color="green" onClick={handleRandomNickname}>랜덤 닉네임</button>
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
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
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