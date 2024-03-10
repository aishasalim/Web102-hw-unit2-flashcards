import { useState } from 'react';
import './App.css';
import words from './words.js';
import { longestStreakJS } from './longestStreak.js';

function App() {
  const [cards, setCards] = useState([...words]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [difficulty, setId] = useState();
  let [count, setCount] = useState(cards.length);
  let [inputValue, setInputValue] = useState('');
  let [currentStreak, setCurrentStreak] = useState(0);
  let [longestStreak, setLongestStreak] = useState(longestStreakJS);

  const cardClick = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const updateCard = (direction) => {
    if (count === 1 || count === 0 ) {
      setCount(cards.length);
    } else if (direction === "forward") {
      setCount(count - 1);
    } else if (direction === "backward") {
      setCount(count + 1);
    }
  };
  
  const shuffleCards = () => {
    const firstCard = cards[0];
    const shuffledCards = [...cards.slice(1)].sort(() => Math.random() - 0.5);
    setCards([firstCard, ...shuffledCards]);
    setCount(cards.length);
  };

  const currentWord = cards[cards.length - count];

  const checkInputValue = () => {
    if (inputValue.toUpperCase() === currentWord.back.toUpperCase()) {
      alert("Good! Great!");
      changeStreak("right");
      setInputValue('');
    } else {
      alert("Try again!");
      changeStreak("wrong");
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const changeStreak = (scenario) => {
    if (currentStreak > longestStreak) {
      setLongestStreak(currentStreak);
    }
    if (scenario === "right") {
      setCurrentStreak(currentStreak + 1);
    } else if (scenario === "wrong") {
      setCurrentStreak(0);
    }
  };
  

  return (
    <div className="App">
      <div className='header'>
        <h1>🇩🇪📚 The flashcards for learning German 📖✨</h1>
        <h2>and extend your knowledge of the German language!🤓🌐</h2>
        <h3>⚡ Cards left: {count.toLocaleString()}</h3>
        <h4>Current Streak: {currentStreak}x ⚡ || Longest Streak: {longestStreak}x ⚡ </h4>
      </div>

      <div
        className={`card ${isCardFlipped ? 'flipped' : ''}`}
        id={currentWord.diffficulty}
        onClick={cardClick}
      >
        <div className="front">
          {currentWord.front} <br />
        </div>
        <div className="back"> 
          {currentWord.back}
        </div>
      </div>
    
      <div className='guessing'>
        <h3 className='guessingText'>🕵️ Guess the answer: </h3>
        <input
          type="text"
          placeholder="Guess the translation..."
          className={inputValue.toUpperCase() === currentWord.back.toUpperCase() ? 'correctInput' : 'textbox'}
          style={{
            color: inputValue.toUpperCase() === currentWord.back.toUpperCase() ? 'green' : 'red',
          }}
          value={inputValue}
          onChange={handleInputChange}
        />

        <button type="button" className="submitGuess" onClick={checkInputValue}>🧠 Check answer</button>
      </div>


      {count !== words.length && (
      <button type="button" className="nextCard" onClick={() => updateCard("backward")}>⭠</button>
      )}

      <button type="next" className="nextCard" onClick={() => updateCard("forward")} >⭢</button>
      
      <button type="button" className="nextCard" onClick={() => shuffleCards()}>Reset and Shuffle</button>
    </div>
  );
}

export default App;

