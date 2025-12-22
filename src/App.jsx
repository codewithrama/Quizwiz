import { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { QuizCards } from "./components/QuizCards";

export default function App() {
  const [status, setStatus] = useState("start"); // 'start' | 'active'
  const [quiz, setQuiz] = useState([]);

  return (
    <div className="app">
      <div className="screen-container">
        {status === "start" && (
          <StartScreen onStart={() => setStatus("active")} setQuiz={setQuiz} />
        )}
        {status === "active" && (
          <QuizCards quiz={quiz} totalQuestions={quiz.length} />
        )}
      </div>
    </div>
  );
}
