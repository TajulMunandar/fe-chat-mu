import { Link } from 'react-router-dom';
import image from '../assets/logoUmuslim.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../features/authSlice';
import Swal from 'sweetalert2';

const Register = () => {
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(form))
      .unwrap()
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false, // Diperbaiki dari 'showconfPasswordButton'
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Registration successful"
        });

        // Redirect to login page after the toast notification
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000); // Wait for the toast notification to finish
      })
      .catch((error) => {
        console.error('Failed to register:', error);
      });
  };

  return (
    <>
      <div className='font-[poppins] flex items-center min-h-screen w-full p-6 bg-gray-50 justify-center'>
         <div className='bg-white shadow-lg rounded-lg p-5 lg:w-1/3'>
         <div className='flex flex-col items-center gap-5'>
            <img src={image} alt="logo" className='md:w-32 w-20'/>
            <h1 className='text-slate-700 font-bold text-xl'>Buat Akun Anda</h1>
          </div>
          <form onSubmit={handleSubmit}>
          
          {isError && typeof message === 'string' && (
            <p className='text-red-800 text-center text-sm'>{message}</p>
          )}

            <div className='flex flex-col my-5'>
              <label htmlFor="name" className='text-sm'>Username</label>
              <input
                 id="name"  
                 type="text"
                 name="name"
                 value={form.name}
                 onChange={handleChange}
                 placeholder="Masukkan Username"
                 required 
                 autoComplete="name" 
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6" />
            </div>
            <div className='flex flex-col my-5'>
              <label htmlFor="email" className='text-sm'>Email</label>
              <input 
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    autoComplete="current-email" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6" />
            </div>
            <div className='flex flex-col my-5'>
              <label htmlFor="password" className='text-sm'>Password</label>
              <input 
                    type="password" 
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required 
                    autoComplete="current-password" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6" />
            </div>
            <div className='flex flex-col my-5'>
              <label htmlFor="confPassword" className='text-sm'>Confirm Password</label> {/* Diperbaiki */}
              <input 
                    type="password"
                    name="confPassword"
                    value={form.confPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password" /* Diperbaiki */
                    required 
                    autoComplete="current-confPassword" 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6" />
            </div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-[#006633] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              {isLoading ? "Loading..." : "Daftar"}
            </button>
          </form>
          <Link className='float-end my-3 text-blue-500 text-sm' to="/login"> <span className='font-medium text-gray-500'>Sudah Memiliki Akun!</span> Login?</Link>
         </div>
      </div> 
    </>
  )
}

export default Register;
