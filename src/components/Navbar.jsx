import React from 'react';
// 1. Import the hook and new icons for the theme toggle
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from "react-icons/fi"; 
import { FaUser } from "react-icons/fa";
// import { AiFillSetting } from "react-icons/ai";

const Navbar = () => {
  // 2. Get the current theme and the function to change it
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="nav flex items-center justify-between px-4 sm:px-8 md:px-[100px] h-[90px] border-b-[1px] border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141319] text-gray-900 dark:text-white">
        <div className="logo">
          <h3 className='text-[30px] font-[700] sp-text bg-gradient-to-r from-purple-600 via-purple-400 to-pink-600'>Gen UI</h3>
        </div>
        <div className="icons flex items-center gap-[15px] text-2xl">
          {/* 3. Make the icon a button that calls toggleTheme */}
          
          {/* <div className="icon p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"><FaUser /></div>
          <div className="icon p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer"><AiFillSetting /></div> */}
        </div>
      </div>
    </>
  )
}

export default Navbar;
