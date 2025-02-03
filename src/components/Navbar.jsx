import { useState } from "react";


import { useTheme } from "../context/Themecontext";
import { Link } from "react-scroll";

const Navbar = ({ tabs = ["Home", "About", "Skills", "Projects", "Contact"] }) => {
  
const {theme , setTheme} = useTheme() ;
 const [isActiveBtn, setisActiveBtn] = useState(null)

   

 

  return (
 
    // ${darkMode ? 'bg-black' : 'bg-gray-900'} this is for dark and light mode in the nav tag
    <nav className={`fixed top-0 left-0 right-0 z-50 px-48 flex bg-bg bg-opacity-50  justify-between items-center p-2 text-white shadow-xl`}>

      
      {/* Logo */}
       
      <div className={`text-xl font-bold text-white bg-border p-4 top-0 border rounded-b-lg  hover:cursor-pointer`}>MH</div>
       
   {/* Tab */}

     <div className={`hidden md:flex justify-center   px-8 py-2 rounded-3xl border-2 border-border  text-lg`}>
        {tabs.map((tab, index) => (
          <NavbarItem 
           key={index}  
           label={tab}
           isActive={isActiveBtn === tab}
           onClick={() => setisActiveBtn(tab)}
           />
          ))}
      </div>
      
      
      { /* select mode light dark and default*/}

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className=" px-4 py-2 text-diffcolor  rounded-lg ml-4 bg-bg border-2 border-border "
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="blue">Blue</option>
      </select>
      
      
    </nav>

    
  );
};


const NavbarItem = ({ label ,isActive,onClick }) => {
  return (
    <Link to={`${label.toLowerCase()}`}  
      smooth={true}
      duration={500} 
      className={`hover:text-borde hover:cursor-pointer mx-3 font-medium ${isActive ? "text-border underline" : "text-diffcolor"}`} onClick={onClick}>
      {label}
    </Link>
  );
};

export default Navbar;
