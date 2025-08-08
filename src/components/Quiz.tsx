import React, { useState, useEffect, useRef } from "react";

type Question = {
  _id: string;
  competency: string;
  level: string;
  question: string;
  options: string[];
  correctAnswer: string;
  marks: number;
};

const levelsByStep = {
  1: ["A1", "A2"],
  2: ["B1", "B2"],
  3: ["C1", "C2"],
};

const certificationRules = {
  1: (scorePercent: number) => {
    if (scorePercent < 25) return "Fail, no retake allowed";
    if (scorePercent < 50) return "A1 certified";
    if (scorePercent < 75) return "A2 certified";
    return "A2 certified + Proceed to Step 2";
  },
  2: (scorePercent: number) => {
    if (scorePercent < 25) return "Remain at A2";
    if (scorePercent < 50) return "B1 certified";
    if (scorePercent < 75) return "B2 certified";
    return "B2 certified + Proceed to Step 3";
  },
  3: (scorePercent: number) => {
    if (scorePercent < 25) return "Remain at B2";
    if (scorePercent < 50) return "C1 certified";
    return "C2 certified";
  },
};

const Quiz = ({ allQuestions }: { allQuestions: Question[] }) => {
  const [step, setStep] = useState(1);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scoreArray, setScoreArray] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const levels = levelsByStep[step];
    console.log(levels)
    const stepQuestions = allQuestions.filter((q) => levels.includes(q.level));
    setFilteredQuestions(stepQuestions);
    setCurrentIndex(0);
    setScoreArray(new Array(stepQuestions.length).fill(0));
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setTimeLeft(60);

    if (timerRef.current) clearInterval(timerRef.current);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, allQuestions]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (showResult) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, showResult]);

  const handleNext = (auto = false) => {
    setTimeLeft(60);

    setScoreArray((prev) => {
      const newScores = [...prev];

      if (!auto) {
        if (selectedOption !== null) {
          if (
            filteredQuestions[currentIndex].correctAnswer === selectedOption
          ) {
            newScores[currentIndex] = filteredQuestions[currentIndex].marks;
          } else {
            newScores[currentIndex] = 0;
          }
        }
      } else {
        // টাইম শেষ, অপশন সিলেক্ট না করলে ০ পয়েন্ট
        if (selectedOption !== null) {
          if (
            filteredQuestions[currentIndex].correctAnswer === selectedOption
          ) {
            newScores[currentIndex] = filteredQuestions[currentIndex].marks;
          } else {
            newScores[currentIndex] = 0;
          }
        } else {
          newScores[currentIndex] = 0;
        }
      }

      // স্কোর আপডেট করো এখানে
      const totalScore = newScores.reduce((acc, val) => acc + val, 0);
      setScore(totalScore);

      return newScores;
    });

    setSelectedOption(null);

    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalMarks = filteredQuestions.reduce((acc, q) => acc + q.marks, 0);
  const scorePercent = totalMarks ? (score / totalMarks) * 100 : 0;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg text-gray-800">
      {!showResult ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Step {step} - Level:{" "}
            <span className="text-indigo-600">
              {filteredQuestions[currentIndex]?.level}
            </span>
          </h3>
          <p className="mb-6 text-lg">
            {filteredQuestions[currentIndex]?.question}
          </p>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {filteredQuestions[currentIndex]?.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(opt)}
                className={`py-3 px-5 rounded-lg border text-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400
                  ${
                    selectedOption === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </p>
            <p className="text-sm font-semibold text-red-600">
              Time Left: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleNext(false)}
              disabled={selectedOption === null}
              className={`py-2 px-6 rounded-lg text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400
                ${
                  selectedOption
                    ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                    : "bg-indigo-300 cursor-not-allowed"
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Result for Step {step}</h2>
          <p className="text-lg mb-2">
            Your score:{" "}
            <span className="font-semibold text-indigo-700">
              {score} / {totalMarks} ({scorePercent.toFixed(2)}%)
            </span>
          </p>
          <p className="mb-6 text-xl font-semibold text-green-600">
            Certification Status: {certificationRules[step](scorePercent)}
          </p>
          {scorePercent >= 75 && step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Proceed to Step {step + 1}
            </button>
          )}
          {scorePercent < 75 && (
            <button
              onClick={() => {
                // Reset state properly for retry
                setShowResult(false);
                setCurrentIndex(0);
                setScoreArray(new Array(filteredQuestions.length).fill(0));
                setScore(0);
                setSelectedOption(null);
                setTimeLeft(60);
              }}
              className="mt-4 bg-gray-300 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Retry Step {step}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
