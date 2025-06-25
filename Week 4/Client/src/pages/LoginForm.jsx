import { useState, useContext } from 'react';
import { login as loginService } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginService(form);
      login(res.user, res.token); // Save user and token in context/localStorage
      navigate('/dashboard'); // Redirect to home or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='flex justify-center items-center bg-[#eceaea] w-full h-screen'>
      <div className='flex flex-col justify-center items-center p-10 bg-[#fff] w-70 h-80 rounded-lg'>
        <h2 className='text-lg font-bold mb-5'>Login</h2>
        {error && (
          <p className='text-red-600 mb-2 text-sm'>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className='border-1 border-[#cfcbcb] w-full p-1 rounded-lg focus:outline-none text-[#555252] mb-5'
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className='border-1 border-[#cfcbcb] w-full p-1 rounded-lg focus:outline-none text-[#555252] mb-5'
          />

          <button
            type="submit"
            className='bg-[#000] text-white text-sm w-full p-2 cursor-pointer rounded-lg hover:bg-[#b4b4b4] hover:text-[#000] transition duration-400'
          >
            Login
          </button>
        </form>

        <div className='flex justify-center items-center w-full mt-3'>
          <p className='text-sm text-[#918f8f]'>Don't have an account?</p>
          <Link
            to="/signup"
            className='text-[#242424] text-sm font-bold hover:underline hover:text-[#9c9c9c] transition duration-300 ml-1'
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
