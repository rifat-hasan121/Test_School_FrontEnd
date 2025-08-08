import React, { useState } from "react";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Props {
  questions?: Question[]; // Optional রাখলাম, safety এর জন্য
}

const QuestionsMCQ: React.FC<Props> = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    console.log(questions)

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow text-center">
        <p className="text-lg text-gray-500">No questions available.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Test Finished!</h2>
        <p className="mb-4  text-black">
          Your score is{" "}
          <span className="font-semibold text-black">{score}</span> out of{" "}
          {questions.length}
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setIsFinished(false);
          }}
          className="px-4 py-2 bg-blue-600  text-black rounded hover:bg-blue-700"
        >
          Restart Test
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6  text-black bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="text-lg mb-6">{currentQuestion.question}</p>

      <div className="space-y-4">
        {currentQuestion.options.map((opt, idx) => (
          <label
            key={idx}
            className={`block p-3 border rounded cursor-pointer 
              ${
                selectedOption === opt
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selectedOption === opt}
              onChange={() => setSelectedOption(opt)}
              className="mr-3 text-black"
            />
            {opt}
          </label>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedOption}
        className={`mt-6 px-6 py-2 rounded text-white ${
          selectedOption
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {currentIndex + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default QuestionsMCQ;
