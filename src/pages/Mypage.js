import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MyPage = ({onLogout}) => {
    //로그아웃 처리 함수
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        onLogout();
        navigate("/"); // 로그아웃시 자동으로 홈화면으로 이동
        window.location.reload();
    }


    

    return (
        <div>
            <h2>마이페이지</h2>
            <div>
                <button onClick={handleLogout}>로그아웃</button>
                <Link to="/userProfile"
                 className='flex items-center space-x-2 hover:text-blue-400'>회원정보</Link>
            </div>
        </div>
    )
}
export default MyPage;