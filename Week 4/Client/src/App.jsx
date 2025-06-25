import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
