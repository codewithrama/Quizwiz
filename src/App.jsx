import { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { QuizCards } from "./components/QuizCards";
import useLocalStorage from "./Hooks/useLocalStorage";

export default function App() {
  const [status, setStatus] = useLocalStorage("start", "Screen"); // 'start' | 'active'
  const [quiz, setQuiz] = useLocalStorage([], "quiz");
  return (
    <div className="app">
      <div className="screen-container">
        {status === "start" && (
          <StartScreen onStart={() => setStatus("active")} setQuiz={setQuiz} />
        )}
        {status === "active" && (
          <QuizCards
            quiz={quiz}
            totalQuestions={quiz.length}
            setQuiz={setQuiz}
          />
        )}
      </div>
    </div>
  );
}
