import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../modalState";
import LoginPage from "../Login/LoginPage";
import SignupPage from "../Login/SignupPage";
import MyPage from "../MyPage/Mypage";
import UserProfile from "../MyPage/UserProfile";
import MyBoards from "../MyPage/MyBoards";

const ModalUser = () => {
    const [modal, setModal] = useRecoilState(modalState);
    // 어떤 컴포넌트가 열려야하는지 상태를 저장

    if (!modal.isOpen) return null; // 모달이 닫혀있는 상태이면 null 반환

    let modalContent;

    switch(modal.type) {
        case 'login':
            modalContent = <LoginPage />;
            break;
        case 'signup':
            modalContent = <SignupPage />;
            break;
        case 'mypage':
            modalContent = <MyPage />;
            break;
        case 'userProfile':
            modalContent = <UserProfile />;
            break;
        case 'myBoards':
            modalContent = <MyBoards />;
        default:
            modalContent = null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* 모달 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setModal({ isOpen: false, type: null })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* 모달 내용 */}
        <div className="mt-8">
          {modalContent}
        </div>
      </div>
    </div>
    )
}
export default ModalUser