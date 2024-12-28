import image from '../assets/logoUmuslim.png';
// import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='md:py-5 bg-[#006633] md:px-44 fixed top-0 min-w-full flex py-2 px-3 justify-between items-center border-b-8 border-[#FFCC00]'>
            <img src={image} alt="Logo Kampus"  className='w-16'/>
            <div className='hidden md:block'>
                <ul className='md:flex items-center gap-10 text-white '>
                    <li className='cursor-pointer'>Beranda</li>
                    <li className='cursor-pointer'>Jalur Seleksi</li>
                    <li className='cursor-pointer'>Registrasi</li>
                    <li className='cursor-pointer'>Pengumuman</li>
                    <li className='cursor-pointer'>Hubungi Kami</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar