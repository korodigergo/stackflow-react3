import { useState, useEffect } from "react";
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

  const handleDrop = async (e, id) => {
    //  e.preventDefault();
    try {
      const response = await fetch(`/api/question/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const deletedQuestion = await response.json();
        setQuestions((questions) => {
          return questions.filter((question) => question.question_id !== id);
        });
        console.log(deletedQuestion);
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <div key={question.question_id} id="question">
              <div id="title">
                <h3>Title: {question.title}</h3>
              </div>
              <div id="descr">
                <h3>Description: {question.description}</h3>
              </div>
              <span
                id="close-button"
                onClick={(e) => handleDrop(e, question.question_id)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
