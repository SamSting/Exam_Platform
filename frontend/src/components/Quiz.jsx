import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useUser } from './UserContext';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(1200); // 20 minutes in seconds
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    // Define your questions here...

    const easyQuestions = [
      {
        id: 1,
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        difficulty: 1,
      },
      {
        id: 2,
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Rome'],
        correctAnswer: 'Paris',
        difficulty: 1,
      },
      {
        id: 3,
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        difficulty: 1,
      },
      {
        id: 4,
        question: 'Which country is famous for the Great Wall?',
        options: ['China', 'India', 'Brazil', 'Italy'],
        correctAnswer: 'China',
        difficulty: 1,
      },
      {
        id: 5,
        question: 'What is the largest mammal on Earth?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
        difficulty: 1,
      },
      {
        id: 6,
        question: 'What is the capital of Japan?',
        options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
        correctAnswer: 'Tokyo',
        difficulty: 1,
      },
      {
        id: 7,
        question: 'What is the square root of 64?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        difficulty: 1,
      },
      {
        id: 8,
        question: 'Who painted the Mona Lisa?',
        options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
        difficulty: 1,
      },
      {
        id: 9,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'H2SO4'],
        correctAnswer: 'H2O',
        difficulty: 1,
      },
      {
        id: 10,
        question: 'What is the value of x in the equation 3x + 7 = 16?',
        options: ['3', '5', '9', '16'],
        correctAnswer: '3',
        difficulty: 1,
      },
      {
        id: 11,
        question: 'What is the solution to the equation 2(x + 3) = 10?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '2',
        difficulty: 1,
      },
      {
        id: 12,
        question: 'What is the chemical symbol for oxygen?',
        options: ['O', 'H2O', 'CO2', 'O2'],
        correctAnswer: 'O2',
        difficulty: 1,
      },
      {
        id: 13,
        question: 'What is the value of 4 + 4?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        difficulty: 1,
      },
      {
        id: 14,
        question: 'What is the capital of the United States?',
        options: ['Washington D.C.', 'New York City', 'Los Angeles', 'Chicago'],
        correctAnswer: 'Washington D.C.',
        difficulty: 1,
      },
      {
        id: 15,
        question: 'What is the chemical symbol for carbon?',
        options: ['C', 'H2O', 'CO2', 'O2'],
        correctAnswer: 'C',
        difficulty: 1,
      }
      // Add more easy questions...
    ];

    const mediumQuestions = [
      {
        id: 16,
        question: 'Who wrote the famous play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'F. Scott Fitzgerald'],
        correctAnswer: 'William Shakespeare',
        difficulty: 2,
      },
      {
        id: 17,
        question: 'What is the chemical symbol for carbon dioxide?',
        options: ['H2O', 'CO2', 'O2', 'CH4'],
        correctAnswer: 'CO2',
        difficulty: 2,
      },
      {
        id: 18,
        question: 'What is the largest organ in the human body?',
        options: ['Liver', 'Lungs', 'Heart', 'Skin'],
        correctAnswer: 'Skin',
        difficulty: 2,
      },
      {
        id: 19,
        question: 'What is the boiling point of water in Fahrenheit?',
        options: ['100°F', '180°F', '212°F', '250°F'],
        correctAnswer: '212°F',
        difficulty: 2,
      },
      {
        id: 20,
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Pt', 'Cu'],
        correctAnswer: 'Au',
        difficulty: 2,
      },
      {
        id: 21,
        question: 'Who painted the ceiling of the Sistine Chapel?',
        options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Michelangelo', 'Pablo Picasso'],
        correctAnswer: 'Michelangelo',
        difficulty: 2,
      },
      {
        id: 22,
        question: 'What is the capital of Canada?',
        options: ['Toronto', 'Ottawa', 'Montreal', 'Vancouver'],
        correctAnswer: 'Ottawa',
        difficulty: 2,
      },
      {
        id: 23,
        question: 'What is the freezing point of water in Celsius?',
        options: ['-10°C', '0°C', '10°C', '20°C'],
        correctAnswer: '0°C',
        difficulty: 2,
      },
      {
        id: 24,
        question: 'Who discovered penicillin?',
        options: ['Alexander Fleming', 'Louis Pasteur', 'Marie Curie', 'Thomas Edison'],
        correctAnswer: 'Alexander Fleming',
        difficulty: 2,
      },
      {
        id: 25,
        question: 'What is the chemical symbol for silver?',
        options: ['Ag', 'Au', 'Pt', 'Cu'],
        correctAnswer: 'Ag',
        difficulty: 2,
      }
      // Add more medium questions...
    ];

    const hardQuestions = [
      {
        id: 21,
        question: 'What is the capital of Kazakhstan?',
        options: ['Astana', 'Almaty', 'Bishkek', 'Tashkent'],
        correctAnswer: 'Astana',
        difficulty: 3,
      },
      {
        id: 22,
        question: 'Who painted the famous artwork "Starry Night"?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 'Vincent van Gogh',
        difficulty: 3,
      },
      {
        id: 23,
        question: 'What is the largest planet in our solar system?',
        options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
        correctAnswer: 'Jupiter',
        difficulty: 3,
      },
      {
        id: 24,
        question: 'What is the chemical symbol for silver?',
        options: ['Ag', 'Si', 'Au', 'Pt'],
        correctAnswer: 'Ag',
        difficulty: 3,
      },
      {
        id: 25,
        question: 'Who composed the musical piece "Symphony No. 9"?',
        options: ['Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Franz Schubert'],
        correctAnswer: 'Ludwig van Beethoven',
        difficulty: 3,
      },
      {
        id: 26,
        question: 'What is the capital of Mongolia?',
        options: ['Ulaanbaatar', 'Astana', 'Bishkek', 'Tashkent'],
        correctAnswer: 'Ulaanbaatar',
        difficulty: 3,
      },
      {
        id: 27,
        question: 'Who is the author of the novel "One Hundred Years of Solitude"?',
        options: ['Gabriel García Márquez', 'Isabel Allende', 'Jorge Luis Borges', 'Pablo Neruda'],
        correctAnswer: 'Gabriel García Márquez',
        difficulty: 3,
      },
      {
        id: 28,
        question: 'What is the speed of light in a vacuum, approximately?',
        options: ['300,000 km/s', '500,000 km/s', '600,000 km/s', '800,000 km/s'],
        correctAnswer: '300,000 km/s',
        difficulty: 3,
      },
      {
        id: 29,
        question: 'What is the chemical symbol for lead?',
        options: ['Pb', 'Ld', 'Le', 'Pl'],
        correctAnswer: 'Pb',
        difficulty: 3,
      },
      {
        id: 30,
        question: 'What is the melting point of iron in Celsius?',
        options: ['1535°C', '1668°C', '1811°C', '1941°C'],
        correctAnswer: '1535°C',
        difficulty: 3,
      }
      // Add more hard questions...
    ];

    // Distribute questions based on user's score
    let selectedQuestions = [];
    if (user.score >= 10) {
      selectedQuestions = [
        ...getRandomQuestions(easyQuestions, 5),
        ...getRandomQuestions(mediumQuestions, 7),
        ...getRandomQuestions(hardQuestions, 8),
      ];
    } else {
      selectedQuestions = [
        ...getRandomQuestions(easyQuestions, 12),
        ...getRandomQuestions(mediumQuestions, 5),
        ...getRandomQuestions(hardQuestions, 3),
      ];
    }

    setQuestions(selectedQuestions);

    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const getRandomQuestions = (questionsArray, count) => {
    const shuffled = questionsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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
    if (user && user.email) {
      navigate('/results', {
        state: { score, total: questions.length, email: user.email },
      });
    } else {
      console.error('User email not available');
    }
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
