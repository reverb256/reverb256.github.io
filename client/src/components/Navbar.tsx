import React from "react";

const Navbar = () => (
  <nav
    id="navbar"
    className="fixed top-0 left-0 w-full z-50 flex items-center justify-center bg-black/60 backdrop-blur-md shadow-lg py-4 px-8"
    style={{
      borderBottom: "1px solid hsla(15, 70%, 50%, 0.15)",
      fontSize: "1.25rem",
    }}
  >
    <a href="#welcome-section" className="mx-4 text-white hover:text-orange-400 transition-colors duration-200">
      Home
    </a>
    <a href="#projects" className="mx-4 text-white hover:text-orange-400 transition-colors duration-200">
      Projects
    </a>
    <a href="#contact" className="mx-4 text-white hover:text-orange-400 transition-colors duration-200">
      Contact
    </a>
    <a
      id="profile-link"
      href="https://github.com/reverb256"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-4 text-orange-400 underline underline-offset-4"
    >
      GitHub
    </a>
  </nav>
);

export default Navbar;
