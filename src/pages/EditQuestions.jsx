import { useState, useEffect } from "react";
import "./EditQuestions.css";

export default function EditQuestions() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if (id && id > 0) {
      setUserId(id);
    }
  }, []);

  const handleSubmit = async () => {
    console.log("from edit page, handleSubmit");

    const questionPost = {
      title,
      description,
      userId
    };

    try {
      console.log(questionPost);
      const response = await fetch("/api/question/", {
        method: "POST",
        body: JSON.stringify(questionPost),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const addedQuestion = await response.json();
        console.log("New book question", addedQuestion);
      } else {
        console.error("Failed to add the question");
      }
    } catch (error) {
      console.error(error);
    }
    setTitle("");
    setDescription("");
  };

  return (
    <div className="container">
      <div className="form">
        <div className="input-container ic1">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-container ic2 textarea">
        <label htmlFor="">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8"
            cols="80"
            required
          ></textarea>
          <br />
          <br />
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
}
