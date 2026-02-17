import React from "react";

const Navbar = () => (
  <nav
    id="navbar"
    className="fixed top-0 left-0 w-full z-50 glass-nav glass-container py-4 px-8"
    style={{
      borderBottom: "1px solid var(--glass-border-color)",
      fontSize: "1.25rem",
    }}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <a href="#welcome-section" className="glass-nav-item hover:text-orange-400 transition-colors duration-200">
          Home
        </a>
        <a href="#projects" className="glass-nav-item hover:text-orange-400 transition-colors duration-200">
          Projects
        </a>
        <a href="#contact" className="glass-nav-item hover:text-orange-400 transition-colors duration-200">
          Contact
        </a>
      </div>
      <div>
        <a
          id="profile-link"
          href="https://github.com/reverb256"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-nav-item text-orange-400 underline underline-offset-4"
        >
          GitHub
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
