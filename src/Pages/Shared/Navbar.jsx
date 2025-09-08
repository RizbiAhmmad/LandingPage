import React from "react";
import logo from "../../assets/Modhuka.jpg"; 

const Navbar = () => {
  return (
    <nav className="w-full bg-white  mt-10">
      <div className="container mx-auto flex justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-30 w-auto"
        />
      </div>
    </nav>
  );
};

export default Navbar;
