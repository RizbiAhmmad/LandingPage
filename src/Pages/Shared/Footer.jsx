import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white shadow-inner py-4">
      <div className="container mx-auto text-center space-y-1">
        <p className="text-sm text-gray-600">
          &copy; {currentYear} Modhuka. All rights reserved.
        </p>
        <p className="text-sm text-gray-600">
          Developed by{" "}
          <a
            href="https://portfolio-rizbi.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-600 font-medium"
          >
            Rizbi Ahmmad
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;