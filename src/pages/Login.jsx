import { useState, useEffect } from "react";
import "./Questions.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUsername] = useState("");
  const [password, setUserPassword] = useState("");
  const [userId, setUserId] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if(id > 0){
      setUserId(id);
    }
  }, [handleSubmit])

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("from edit page, handleSubmit");
    // e.preventDefault();

    const user = {
      userName,
      password,
    };

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

   
      if (response.ok) {
        const responseUserId = await response.json();
        localStorage.setItem("userId", JSON.stringify(responseUserId));
        if(responseUserId > 0){
          navigate("/questions");
        }
      } else {
        console.error("Failed to add the question");
      }
    } catch (error) {
      console.error(error);
    }
  
  };

  return userId > 0 ? (
    <div className="root-layout">
      <h2>You are logged in! </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button>Log out</button>
      </form>
    </div>
  ) : (
    <div className="root-layout">
      <h2>Login: </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
}
