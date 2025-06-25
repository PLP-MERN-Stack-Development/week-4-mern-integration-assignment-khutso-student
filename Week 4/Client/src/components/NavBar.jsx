// src/components/NavBar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex fixed justify-between w-full p-4 bg-gray-200">
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      ) : (
        <>
        <div className='p-1'>
            <a href="/" className='text-lg text-[#000] font-bold border-b-2 border-[#000]'>My Assignent</a>
        </div>

        <div className='p-2 '>
            <Link
                to="/login"
                className="bg-[#000] px-5 py-1.5 mr-4 text-white text-sm rounded-lg cursor-pointer hover:bg-white hover:text-black transition duration-500"
            >
                Login
            </Link>
            <Link
                to="/signup"
                className="bg-[#fff] px-5 py-1.5 mr-4 text-black text-sm rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-500"
            >
                Signup
            </Link>
        </div>

        </>
      )}
    </nav>
  );
};

export default NavBar;
