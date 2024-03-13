import { useState } from "react";

export default function EditQuestions() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    console.log("from edit page, hanndleSubmit");
    // e.preventDefault();

    const questionPost = {
      title,
      description,
    };

    try {
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
  };

  return (
    <div className="root-layout">
      <h2>Add new question: </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button>ADD QUESTION</button>
      </form>
    </div>
  );
}
