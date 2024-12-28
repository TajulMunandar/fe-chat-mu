import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../features/axiosInstance';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
const InputUsers = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const [role, setRole] = useState('User');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const ss = sessionStorage.getItem('user');
    if (!ss) {
      setMsg("ANDA HARUS LOGIN DULU");
      navigate('/login');
    }
  }, [navigate]);

  const saveUser = async (e) => {
    e.preventDefault();

    // const ss = sessionStorage.getItem('user');
    // const loginStatus = !!ss;

    if (password !== confPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post('/users', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword, // Pastikan nama field ini sesuai
        role: role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) { // Pastikan status sesuai dengan yang diharapkan
        navigate("/dashboard/User");
      } else {
        setMsg("Failed to add user");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Terjadi kesalahan.");
      } else {
        setMsg("Terjadi kesalahan.");
      }
    }
  };

  return (
    <>
      <h4 className="mb-4 text-lg font-semibold text-green-700">
        Add Users
      </h4>
      <Link to="/dashboard/user" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-2'>
      <FaArrowLeftLong />
            <p>Back</p>
      </Link>
      {msg && <p className="text-red-500 text-sm">{msg}</p>}
      <form onSubmit={saveUser}>
        <div className="px-4 py-3 mb-8 font-[poppins] bg-white border-2 rounded-lg shadow-md">
          <label className="block text-sm">
            <span className="text-green-700">Username</span>
            <input
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700 dark:text-gray-400">Email</span>
            <input
              type="email"
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700 dark:text-gray-400">Password</span>
            <input
              type="password"
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700 dark:text-gray-400">confPassword Password</span>
            <input
              type="password"
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="confPassword password"
              value={confPassword}
              onChange={(e) => setconfPassword(e.target.value)}
              required
            />
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Role</span>
            <select
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>
          <button type="submit" className='bg-slate-400 px-5 text-white py-1 float-right rounded text-base my-5'>Save</button>
        </div>
      </form>
    </>
  );
};

export default InputUsers;