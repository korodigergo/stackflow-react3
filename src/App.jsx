
import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="root-layout">
      <header id="header">
        <nav id="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/questions">Question Collection</NavLink>
          <NavLink to="/addquestion">Edit Collection</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
    )
}

export default App;
