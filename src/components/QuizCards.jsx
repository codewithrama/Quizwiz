import { all } from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import EndScreen from "./EndScreen";

export function QuizCards({ quiz, setQuiz }) {
  if (!quiz || quiz.length === 0) {
    return <p>Loading quiz...</p>;
  }

  const quizTime = 150;

  const [currentIndex, setCurrentIndex] = useLocalStorage(
    0,
    "currentQuestionIndex"
  );
  const [timeLeft, setTimeLeft] = useLocalStorage(quizTime, "quizTime"); // 2:30
  const [score, setScore] = useLocalStorage(0, "score");
  const totalQuestions = quiz.length;

  useEffect(
    function () {
      if (timeLeft <= 0 || currentIndex >= totalQuestions) return;
      const tID = setInterval(() => {
        setTimeLeft((pre) => pre - 1);
      }, 1000);

      return () => clearInterval(tID);
    },
    [timeLeft]
  );

  useEffect(() => {
    if (timeLeft === 0 && currentIndex < totalQuestions) {
      setCurrentIndex((pre) => pre + 1);
      setTimeLeft(quizTime); // reset timer for next question
    }
  }, [timeLeft, currentIndex, totalQuestions]);

  useEffect(() => {
    if (currentIndex >= totalQuestions) {
      document.title = `Result ${score}`;
      return;
    }
    document.title = quiz[currentIndex].question;
  }, [currentIndex, totalQuestions]);

  return (
    <div>
      <QuizCard
        quiz={quiz}
        index={currentIndex}
        totalQuestions={totalQuestions}
        timeLeft={timeLeft}
        key={currentIndex}
        score={score}
        setScore={setScore}
        setQuiz={setQuiz}
      />
    </div>
  );
}

function QuizCard({
  quiz,
  index,
  totalQuestions,
  timeLeft,
  setScore,
  score,
  setQuiz,
}) {
  const [selectedAnswer, setSelectedAnswer] = useLocalStorage(
    null,
    `selectedAnswer-${index}`
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useLocalStorage(
    false,
    "isAnswerCorrect"
  );
  const [options, setOptions] = useLocalStorage([], "options");
  const result = new Date(timeLeft * 1000).toISOString().slice(14, 19);

  function handleClick(answer) {
    setSelectedAnswer(answer);
    if (answer === quiz[index].correct_answer) {
      setScore((sc) => sc + 1);
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  }

  // useEffect(() => {
  //   if (index > totalQuestions) {
  //     setIsAnswerCorrect(false);
  //     setScore(0);
  //     setquiz([]);
  //     setCurrentIndex(0);
  //     setSelectedAnswer(null);
  //     setIsAnswerCorrect(false);
  //   }
  // }, [index]);

  useEffect(() => {
    if (selectedAnswer) return;
    localStorage.removeItem(`selectedAnswer-${index - 1}`);
    setSelectedAnswer(null);
    setIsAnswerCorrect(false);
  }, [index]);

  const alphabetMap = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  useEffect(
    function () {
      if (index >= totalQuestions || (options.length !== 0 && selectedAnswer))
        return;

      const alloptions = [
        quiz[index].correct_answer,
        ...quiz[index].incorrect_answers,
      ];

      const shuffled = alloptions
        .map((opt) => ({ opt, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ opt }) => opt);

      setOptions(shuffled);
    },
    [index, totalQuestions]
  );

  return (
    <>
      {index < totalQuestions ? (
        <div className="card" style={{ maxWidth: "800px", textAlign: "left" }}>
          <div className="quiz-header">
            <span>{`Question ${index + 1} / ${totalQuestions}`}</span>
            <div className="timer">{`⏱ ${result}`}</div>
          </div>

          <h2>{quiz[index].question}</h2>
          <div className="options-list">
            {options.map((opt, i) => (
              <button
                onClick={() => handleClick(opt)}
                key={i}
                className={`btn btn-option ${
                  selectedAnswer === opt
                    ? isAnswerCorrect
                      ? "btn-right-answer"
                      : "btn-wrong-answer"
                    : ""
                }`}
                value={opt}
                disabled={selectedAnswer !== null}
              >
                {`${alphabetMap[i]}. ${opt}`}
              </button>
            ))}
            {/* <button
              className={`btn btn-option ${
                selectedAnswer === quiz[index].incorrect_answers[0]
                  ? isAnswerCorrect
                    ? "btn-right-answer"
                    : "btn-wrong-answer"
                  : ""
              }`}
              value={quiz[index].incorrect_answers[0]}
              disabled={selectedAnswer !== null}
            >
              A. {quiz[index].incorrect_answers[0]}
            </button>
            <button
              className={`btn btn-option ${
                selectedAnswer === quiz[index].incorrect_answers[1]
                  ? isAnswerCorrect
                    ? "btn-right-answer"
                    : "btn-wrong-answer"
                  : ""
              }`}
              value={quiz[index].incorrect_answers[1]}
              disabled={selectedAnswer !== null}
            >
              B. {quiz[index].incorrect_answers[1]}
            </button>
            <button
              className={`btn btn-option ${
                selectedAnswer === quiz[index].incorrect_answers[2]
                  ? isAnswerCorrect
                    ? "btn-right-answer"
                    : "btn-wrong-answer"
                  : ""
              }`}
              value={quiz[index].incorrect_answers[2]}
              disabled={selectedAnswer !== null}
            >
              C. {quiz[index].incorrect_answers[2]}
            </button>
            <button
              className={`btn btn-option ${
                selectedAnswer === quiz[index].correct_answer
                  ? "btn-right-answer"
                  : ""
              }`}
              value={quiz[index].correct_answer}
              disabled={selectedAnswer !== null}
            >
              D.{quiz[index].correct_answer}
            </button> */}
          </div>
        </div>
      ) : (
        <EndScreen score={score} totalQuestions={totalQuestions} />
      )}
    </>
  );
}
