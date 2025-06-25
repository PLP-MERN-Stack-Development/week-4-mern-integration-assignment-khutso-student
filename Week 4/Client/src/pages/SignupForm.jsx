import { useState } from 'react';
import { signup } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
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
      const res = await signup(form);
      login(res.user, res.token); // save user & token
      navigate('/dashboard'); // redirect to homepage or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className='flex justify-center items-center bg-[#eceaea] w-full h-screen'>
        <div className='flex flex-col justify-center items-center p-10 bg-[#fff] w-70 h-80 rounded-lg'>
            <h2 className='text-lg font-bold mb-5 '>Signup</h2>
            {error && <p style={{ color: 'red', marginBottom: '8px', fontSize: '15px' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
            <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className='border-1 border-[#cfcbcb] w-full p-1 rounded-lg focus:outline-none text-[#555252] mb-5'
            /><br />

            <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className='border-1 border-[#cfcbcb] w-full p-1 rounded-lg focus:outline-none text-[#555252] mb-5'

            /><br />

            <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className='border-1 border-[#cfcbcb] w-full p-1 rounded-lg focus:outline-none text-[#555252] mb-5'

            /><br />

            <button type="submit"
            className='bg-[#000] text-white text-sm w-full p-2 cursor-pointer rounded-lg hover:bg-[#b4b4b4] hover:text-[#000] transition duration-400'
            >Sign Up</button>
            </form>
            <div className='flex justify-center items-center w-full mt-3 '>
                <p className='text-sm text-[#918f8f]'>Have an account?</p>
                <Link to="/login"
                    className='text-[#242424] text-sm font-bold hover:underline hover:text-[#9c9c9c] transition duration-300 ml-1'>
                    Login
                </Link>
            </div>
      </div>
    </div>
  );
};

export default SignupForm;
