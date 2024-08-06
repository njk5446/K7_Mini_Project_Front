import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MemberPage from './pages/MemberPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import BoardList from './pages/BoardList';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full max-w-screen-lg h-screen mx-auto">
        <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-green-400'>
          
          <ul className='flex justify-center items-center text-sm'>
          <li className='mx-2 p-2 rounded-md
                         hover:bg-white hover:text-blue-600'>
              <Link to='/'>홈</Link>
          </li>
          <li className='mx-2 p-2 rounded-md
                         hover:bg-white hover:text-blue-600'>
              <Link to='/member'>멤버</Link>
          </li>
          <li className='mx-2 p-2 rounded-md
                         hover:bg-white hover:text-blue-600'>
              <Link to='/board'>게시판</Link>
          </li>
          </ul>
        </header>
        <main className='grow w-full flex justify-center items-center overflow-y-auto '>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/member' element={<MemberPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/board' element={<BoardList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
