import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import LoginPage from './login/LoginPage';
import MemberPage from './member/MemberPage';
import SignupPage from './signupPage/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full max-w-screen-lg h-screen mx-auto">
        <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-slate-200'>
          <li className='mx-2 p-2 rounded-md
                         hover:bg-white hover:text-blue-600'>
              <Link to='/'>홈</Link>
          </li>
          <ul className='flex justify-center items-center text-sm'>
          <li className='mx-2 p-2 rounded-md
                         hover:bg-white hover:text-blue-600'>
              <Link to='/member'>멤버</Link>
          </li>
          </ul>
        </header>
        <main className='grow w-full flex justify-center items-center overflow-y-auto '>
          <Routes>
            <Route path='/' element={<div></div>} />
            <Route path='/member' element={<MemberPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
