import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="root-layout">
      <header id="header">
        <div className="menu-logo" onClick={toggleMenu}>
        <div className={menuOpen ? "open bar1" : "bar1"}></div>
          <div className={menuOpen ? "open bar2" : "bar2"}></div>
          <div className={menuOpen ? "open bar3" : "bar3"}></div>
        </div>
        <nav id="navbar" className={menuOpen ? "open" : ""}>
          <NavLink to="/" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/login" onClick={toggleMenu}>
            Login
          </NavLink>
          <NavLink to="/register" onClick={toggleMenu}>
            Register
          </NavLink>
          <NavLink to="/questions" onClick={toggleMenu}>
            Question Collection
          </NavLink>
          <NavLink to="/addquestion" onClick={toggleMenu}>
            Edit Collection
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
