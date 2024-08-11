import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
    //로그아웃 처리 함수
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        navigate("/"); // 로그아웃시 자동으로 홈화면으로 이동
    }

    return (
        <div>
            <h2>마이페이지</h2>
            <div>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    )
}
export default UserProfile;