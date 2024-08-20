import React from 'react';
import ReactDOM from 'react-dom';
import { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginModalAtom } from '../LoginModalAtom'; // Recoil 상태 관리 파일을 임포트

const LoginModal = ({ children }) => {
  const [isOpen, setIsOpen] = useRecoilState(loginModalAtom);
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false); // 모달 닫기
    }
  };

  useEffect(() => {
    // 마운트 시 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    
    // 언마운트 시 클릭 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='pl-10 sm:pl-20 w-full h-full bg-black bg-opacity-50 fixed flex justify-center items-center'>
      <div ref={modalRef} className='w-11/12 h-5/6 xl:h-4/6 shadow-lg' style={modalContentStyle}>
        {children}
      </div>
    </div>,
    document.body // 모달을 body 태그에 렌더링합니다.
  );
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  position: 'relative',
};

export default LoginModal;
