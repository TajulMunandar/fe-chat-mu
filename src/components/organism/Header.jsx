// import React from 'react';
import ButtonLogout from '../atoms/ButtonLogout';

const Header = ({ toggleSideMenu, handleLogout }) => (
  <header className="z-10 py-4 bg-white shadow-md ">
    <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600">
      <button
        className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
        onClick={toggleSideMenu}
        aria-label="Menu"
      >
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="flex justify-between flex-1 items-center">
        <div className="relative w-full max-w-xl mr-6 focus-within:text-black text-white">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            className="w-full pl-8 pr-2 py-3 text-sm text-slate-800 font-[poppins] placeholder-white bg-green-600 border-0 rounded-md  focus:placeholder-green-500 focus:bg-white form-input"
            type="text"
            placeholder="Search for projects"
            aria-label="Search"
          />
        </div>
        <ButtonLogout onLogout={handleLogout} />
      </div>
    </div>
  </header>
);

export default Header;