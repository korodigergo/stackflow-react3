import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./QuestionPage.css";

const fetchQuestion = async (id) => {
  const res = await fetch(`/api/question/${id}`);
  return await res.json();
};

const fetchAnswers = async (id) => {
  const res = await fetch(`/api/answer/${id}/all`);
  return await res.json();
};

const fetchUser = async (id) => {
  const res = await fetch(`/api/user/${id}`);
  return await res.json();
};

export default function QuestionPage() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  const [answerPosters, setAnswerPosters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user_id, setUserId] = useState(-1);
  const [questionPoster, setQuestionPoster] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetchQuestion(id).then((question) => {
      setQuestion(question);
      fetchUser(question.user_id).then((user) => {
        setQuestionPoster(user);
      });
    });
  
    fetchAnswers(id).then((answers) => {
      setAnswers(answers);
      const fetchUserPromises = answers.map((answer) => fetchUser(answer.user_id));
  
      Promise.all(fetchUserPromises)
        .then((users) => {
          setAnswerPosters(users.map((user) => user.userName));
        })
        .catch((error) => {
          console.error("Error fetching users for answers", error);
        });
    });
  }, [id]);
  

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if (id && id > 0) {
      setUserId(id);
    }
  }, []);

  const handleDelete = async (e, id) => {
    try {
      const response = await fetch(`/api/question/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const deletedQuestion = await response.json();
        setQuestion((questions) => {
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


  const deleteAnswer = async (e, id) => {
    try {
      const response = await fetch(`/api/answer/${user_id}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const isAnswerDeleted = await response.json();
        if(isAnswerDeleted){
          setAnswers((answers) => {
            return answers.filter((answer) => answer.answer_id !== id);
          });
          console.log("deleted answer ", isAnswerDeleted);
        }
        
      } else {
        console.error("Failed to delete answer");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  async function handleAddAnswer(e, question_id) {
    console.log("from edit page, handleSubmit");
    const answerPost = {
      message,
      user_id,
      question_id,
    };

    try {
      const response = await fetch(`/api/answer/${question_id}`, {
        method: "POST",
        body: JSON.stringify(answerPost),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const addedAnswer = await response.json();
        console.log("New answer added", addedAnswer);
      } else {
        console.error("Failed to add the answer");
      }
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <div className="title-container">
      <div>
        <h2 className="user-name">by: {questionPoster.userName}</h2>
      </div>
      <div>
        <h2 className="title">{question.title}</h2>
        <span className="description">({question.description})</span>
        <Link to={`/questions`}>
        {question.user_id == user_id && (<span
            id="close-button"
            onClick={(e) => handleDelete(e, question.question_id)}
          >
            &times;
          </span>)}
        </Link>

        <hr className="separator" />

        <span id="plus-button" onClick={() => setShowForm(true)}>
          &#43;
        </span>
        {showForm && (
          <form
            id="answerform"
            onSubmit={(e) => handleAddAnswer(e, question.question_id)}
          >
            <h2>New Answer</h2>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />{" "}
            <br />
            <button type="submit">Submit Answer</button>
          </form>
        )}
      </div>
      <div id="answers">
        <h2>ANSWERS</h2>
        {answers.map((answer, i) => (
          <div key={answer.answer_id}>
            <h2>{answer.message}</h2>
            <h2>by: {answerPosters[i]}</h2>
            {answer.user_id == user_id && (<span
              id="answer-delete"
              onClick={(e) => deleteAnswer(e, answer.answer_id)}
            >
             &times;
            </span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
