import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Questions.css";

export default function Questions() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/question/all");
      const questions = await response.json();
      console.log(
        "Question IDs:",
        questions.map((question) => question)
      );

      setQuestions(questions);
    }
    fetchBooks();
    setIsLoading(false);
  }, []);

  return (
    <div id="main">
      <h1 id="sign">Question Collection</h1>

      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div id="questions-container">
          {questions.map((question) => (
              <Link to={`/question/${question.question_id}`}>
            <div key={question.question_id} id="question">
                <div id="title">
                  <h3>Title: {question.title}</h3>
                </div>
            </div>
              </Link>
          ))}
        </div>
      )}
    </div>
  );
}
