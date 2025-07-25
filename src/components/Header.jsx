import { Link, useNavigate } from 'react-router-dom';
import ApplicationLogo from '../assets/logo.png';


const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="flex justify-between items-center p-7 text-white shadow-md w-full">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
      <img src={ApplicationLogo} alt="SASS Logo" className="w-16 h-10 rounded-lg" />
      </div>
      <nav className="flex items-center space-x-6 gap-1.5">
        <Link to="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">Register</Link>
        <Link to="/login" className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-blue-900">Login</Link>
      </nav>
    </header>
  );
};

export default Header;