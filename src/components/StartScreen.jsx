import { useState } from "react";
import { Logo } from "./Logo";
import axios from "axios";

export function StartScreen({ onStart, setQuiz }) {
  const [numque, setNumQue] = useState(10);
  const [category, setCategory] = useState("General Knowledge");
  const [difficulty, setDifficulty] = useState("Easy");

  function handleStart() {
    const ApiMapping = {
      "General Knowledge": 9,
      "Science: Computers": 18,
      "Entertainment: Video Games": 15,
      Easy: "easy",
      Medium: "medium",
      Hard: "hard",
    };
    onStart();
    axios
      .get(
        `https://opentdb.com/api.php?amount=${numque}&category=${ApiMapping[category]}&difficulty=${ApiMapping[difficulty]}`
      )
      .then((val) => setQuiz(val.data.results))
      .catch((err) => console.log(err));
  }

  return (
    <div className="card">
      <Logo />

      <div className="form-group">
        <label>Number of Questions</label>
        <input
          type="range"
          min={"10"}
          max={"20"}
          value={numque}
          onChange={(e) => setNumQue(e.target.value)}
        />
        <span className="noofquestions">{numque}</span>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General Knowledge</option>
          <option>Science: Computers</option>
          <option>Entertainment: Video Games</option>
        </select>
      </div>

      <div className="form-group">
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleStart}>
        Let's Play
      </button>
    </div>
  );
}
