import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import PasswordPopUp from "./PasswordPopUp";


const MyPage = ({onLogout}) => {

    const [popUpOpen, setPopUpOpen] = useState(false);

    const handleOpenPopUp = () => {
        setPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        setPopUpOpen(false);
    };

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
                <button onClick={handleLogout}
                className="bg-green-500 text-white px-4 py-2 mx-3 rounded-md hover:bg-green-600"
                >로그아웃
                </button>
                <button
                onClick={handleOpenPopUp}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                회원정보
            </button>
            {popUpOpen && <PasswordPopUp onClose={handleClosePopUp} />}
            {/* 팝업이 켜져있을때 닫아야하니까 닫기 */}
            </div>
        </div>
    )
}
export default MyPage;