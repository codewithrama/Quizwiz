import { useEffect } from "react";

export default function EndScreen({ score, totalQuestions }) {
  useEffect(function () {
    localStorage.clear();
  }, []);
  return (
    <div className="card result" style={{ maxWidth: "800px" }}>
      <h2>🎉 Quiz Completed!</h2>
      <p>
        You scored <strong>{score}</strong> out of{" "}
        <strong>{totalQuestions}</strong> questions.
      </p>
      <button className="btn btn-ui" onClick={() => window.location.reload()}>
        Restart Quiz
      </button>
    </div>
  );
}
