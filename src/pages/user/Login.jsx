import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUsername] = useState('');
  const [password, setUserPassword] = useState('');
  const [userId, setUserId] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userId'));
    if (id > 0) {
      setUserId(id);
    }
  }, [handleSubmit]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('from edit page, handleSubmit');
    // e.preventDefault();

    const user = {
      userName,
      password,
    };

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseUserId = await response.json();
        localStorage.setItem('userId', JSON.stringify(responseUserId));
        if (responseUserId > 0) {
          navigate('/questions');
        }
      } else {
        console.error('Failed to add the question');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    setUserId(-1);
    localStorage.clear();
  }

  return userId > 0 ? (
    <form className="form" onSubmit={(e) => handleLogout(e)}>
      <h4>You are logged in! </h4>
      <button type="submit" className="btn">
        Log out
      </button>
    </form>
  ) : (
    <div className="root-layout">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h4>Login: </h4>
        <div className="form-row">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-row">
        <label htmlFor="userName" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <p>
        Not a member?
        <Link to="/register" className="member-btn">
          Register
        </Link>
      </p>
      </form>
    </div>
  );
}
