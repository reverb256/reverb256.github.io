import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="min-h-screen w-full glass-container relative"
    style={{
      background: "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.95) 100%)",
      overflowX: "hidden",
    }}
  >
    <Navbar />
    <main className="pt-20">{children}</main>
    {/* Spotlight effect */}
    <div
      aria-hidden="true"
      className="glass-shimmer"
      style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        width: "60vw",
        height: "60vw",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 70%)",
        zIndex: 0,
        filter: "blur(32px)",
        opacity: 0.7,
      }}
    />
  </div>
);

export default Layout;
