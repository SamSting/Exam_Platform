import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(1200); // 20 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedQuestions = [
      {
        id: 1,
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        tags: ['algebra'],
        difficulty: 1,
      },
      {
        id: 2,
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Rome'],
        correctAnswer: 'Paris',
        tags: ['geography'],
        difficulty: 1,
      },
      {
        id: 3,
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        tags: ['space', 'astronomy'],
        difficulty: 1,
      },
      {
        id: 4,
        question: 'Who wrote the famous play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'F. Scott Fitzgerald'],
        correctAnswer: 'William Shakespeare',
        tags: ['literature'],
        difficulty: 2,
      },
      {
        id: 5,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'H2SO4'],
        correctAnswer: 'H2O',
        tags: ['chemistry'],
        difficulty: 2,
      },
      {
        id: 6,
        question: 'Which country is famous for the Great Wall?',
        options: ['China', 'India', 'Brazil', 'Italy'],
        correctAnswer: 'China',
        tags: ['geography', 'history'],
        difficulty: 1,
      },
      {
        id: 7,
        question: 'What is the largest mammal on Earth?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
        tags: ['biology', 'animals'],
        difficulty: 2,
      },
      {
        id: 8,
        question: 'What is the capital of Japan?',
        options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
        correctAnswer: 'Tokyo',
        tags: ['geography'],
        difficulty: 1,
      },
      {
        id: 9,
        question: 'What is the square root of 64?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        tags: ['mathematics'],
        difficulty: 2,
      },
      {
        id: 10,
        question: 'Who painted the Mona Lisa?',
        options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
        tags: ['art', 'history'],
        difficulty: 2,
      },
      {
        id: 11,
        question: 'What is the value of x in the equation 3x + 7 = 16?',
        options: ['3', '5', '9', '16'],
        correctAnswer: '3',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 12,
        question: 'Solve for y: 2y - 5 = 11',
        options: ['3', '5', '8', '16'],
        correctAnswer: '8',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 13,
        question: 'What is the solution to the equation 2(x + 3) = 10?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '2',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 14,
        question: 'If 2x - 5 = 7, what is the value of x?',
        options: ['3', '6', '7', '8'],
        correctAnswer: '6',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 15,
        question: 'Solve for x: 3(x - 4) = 15',
        options: ['5', '6', '7', '9'],
        correctAnswer: '9',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 16,
        question: 'What is the value of x in the equation 4x + 9 = 25?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '4',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 17,
        question: 'If 3(x - 2) = 15, what is the value of x?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '7',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 18,
        question: 'Solve for y: 2y + 3 = 11',
        options: ['4', '5', '6', '7'],
        correctAnswer: '4',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 19,
        question: 'What is the solution to the equation 5(x - 3) = 20?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '8',
        tags: ['algebra'],
        difficulty: 2,
      },
      {
        id: 20,
        question: 'If 3x + 4 = 16, what is the value of x?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '4',
        tags: ['algebra'],
        difficulty: 2,
      }
      // Add more questions here...
    ];

    setQuestions(fetchedQuestions);

    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = () => {
    // Calculate the score
    const score = questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  
    // Navigate to the results page with the score and total number of questions
    navigate('/results', { state: { score, total: questions.length } });
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <Navbar examName="Sample Exam" timer={formatTime(timer)} />
      <div className="quiz-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {/* Set maxHeight and overflowY properties to enable scrolling */}
        <h1>Quiz Questions</h1>
        {questions.map((question) => (
          <div key={question.id} className="question">
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option) => (
                <li key={option}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Quiz;