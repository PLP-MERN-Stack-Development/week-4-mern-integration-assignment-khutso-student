// src/pages/Home.jsx
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div className='h-screen'>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Assignment</h1>
        <p className='text-[#575656]'>This is my first full-Stack application. </p>
      </div>
    </div>
  );
};

export default Home;
