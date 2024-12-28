import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../features/axiosInstance';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
const EditUsers = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '', // Pastikan ini didefinisikan
    role: 'User'
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        console.log('Fetched user data:', response.data);
        setUserData({
          name: response.data.name || '',
          email: response.data.email || '',
          password: '',
          confPassword: '', // Pastikan ini juga didefinisikan
          role: response.data.role || 'User',
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('Cannot submit form without a valid userId.');
      return;
    }

    // Pastikan password dan confPassword password sesuai sebelum dikirim
    if (userData.password !== userData.confPassword) {
      alert('Password and confPassword password do not match');
      return;
    }

    // Jika password kosong, hapus dari objek yang dikirim
    const dataToSend = { ...userData };
    if (!userData.password) {
      delete dataToSend.password;
      delete dataToSend.confPassword;
    }

    console.log('Submitting data:', dataToSend); // Debugging line

    try {
      const response = await axiosInstance.patch(`/users/${userId}`, dataToSend);
      console.log('Update response:', response.data);
      alert('User updated successfully!');
      navigate('/dashboard/user'); // Navigasi kembali setelah berhasil
    } catch (error) {
      console.error('Failed to update user', error.response?.data || error.message);
      alert('Failed to update user');
    }
  };

  return (
    <>
      <h4 className="mb-4 text-lg font-semibold text-gray-600">
        Edit Users
      </h4>
      <Link to="/dashboard/user" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-2'>
      <FaArrowLeftLong />
            <p>Back</p>
      </Link>
      <div className="px-4 py-3 mb-8 border-2 font-[poppins] rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="text-gray-700">Name</span>
            <input
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Edit name"
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700">Email</span>
            <input
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="example@gmail.com"
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700">Password</span>
            <input 
              required
              name="password"
              value={userData.password}
              onChange={handleChange}
              type="password"
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Password min 6 characters"
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700">confPassword Password</span>
            <input 
              required
              name="confPassword" // Pastikan nama ini konsisten
              value={userData.confPassword}
              onChange={handleChange}
              type="password"
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="confPassword Password"
            />
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700">Role</span>
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="block w-full mt-1 rounded-lg border-2 focus:outline-green-600 text-sm py-2 px-3 form-select"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-green-800 px-5 text-white py-1 float-right rounded text-base my-5"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUsers;
