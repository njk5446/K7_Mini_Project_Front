import React from 'react';
import { FaHome, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginModalAtom } from '../LoginModalAtom';
import LoginModal from './LoginModal';
import LoginPage from '../Login/LoginPage';

export default function Nav() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useRecoilState(loginModalAtom);

    const checkLogin = () => {
        if (sessionStorage.getItem("token") != null) {
            // 토큰값이 null이 아니면(로그인된 상태)
            navigate("/mypage")
        }
        else {
            setIsModalOpen(true)
        }
    }
    return (
    <>
        <header className='w-10 sm:w-20 bg-slate-300 fixed z-10 h-full flex flex-col items-center justify-between py-60'>
            <button
                onClick={() => navigate('/')}
                className='text-4xl space-x-2 transition-colors hover:text-white'>
                <FaHome />
            </button>

            <button
                onClick={() => checkLogin()}
                className='text-3xl space-x-2 transition-colors hover:text-white'>
                <FaUser />
            </button>
        </header >
        <LoginModal>
            <LoginPage />
        </LoginModal>
        </>
    )
}
