import React from "react";
import logo from "../../assets/BangladeshiIT.jpg"; // Update with your actual path

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-auto"
        />
      </div>
    </nav>
  );
};

export default Navbar;
