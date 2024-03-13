
import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="root-layout">
      <header id="header">
        <nav id="navbar">
          <NavLink to="/questions">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/questions">Questions</NavLink>
          <NavLink to="/addquestion">Ask a Question</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
    )
}

export default App;
