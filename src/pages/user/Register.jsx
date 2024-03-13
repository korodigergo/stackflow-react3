import { Link } from "react-router-dom";
import FormRow from "../../components/FormRow";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addUser(userName, password);

    setUserName("");
    setPassword("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4>Register</h4>
      <div className="form-row">
        <label htmlFor="userName" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          className="form-input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
      <p>
        Already a member?
        <Link to="/login" className="member-btn">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;

async function addUser(userName, password) {
  console.log(userName);
  console.log(password);
  const userToAdd = {
    userName,
    password,
  };

  try {
    const addUserResponse = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify(userToAdd),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (addUserResponse.ok) {
      const addedUser = await addUserResponse.json();
      console.log("registered: " + addedUser);
    } else {
      const errorMessage = await addUserResponse.text();
    }
  } catch (error) {
    console.log(error);
  }
}
