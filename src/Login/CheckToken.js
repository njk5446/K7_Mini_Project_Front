// checkToken.js

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckToken = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URLSearchParams를 사용하여 쿼리 파라미터 추출
    const parseToken = new URLSearchParams(location.search);
    const token = parseToken.get('token');

    if (token) {
      // JWT 토큰을 로컬 스토리지에 저장
      sessionStorage.setItem('token', token);

      // 토큰을 저장한 후 홈 페이지로 리다이렉트
      navigate('/');
    } else {
      // 토큰이 없는 경우 로그인 페이지로 리다이렉트
      navigate('/login');
    }
  }, [location.search, navigate]);

  return <div>Processing...</div>;
};

export default CheckToken;


