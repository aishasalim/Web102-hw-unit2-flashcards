import { useState } from 'react';
import './App.css';
import words from './words.js';

function App() {
  const [count, setCount] = useState(words.length);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [difficulty, setId] = useState();

  const cardClick = () => {
    setIsCardFlipped(!isCardFlipped);
  };
  const updateCard = () => {
    setCount(count - 1);
  }

  const currentWord = words[words.length - count];

  return (
    <div className="App">
      <div className='header'>
        <h1>🇩🇪📚 The flashcards for learning German 📖✨</h1>
        <h2>and extend your knowledge of the German language!🤓🌐</h2>
        <h3>Cards left: {count.toLocaleString()}</h3>
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

      <button type="next" className="nextCard" onClick={() => updateCard()} >⭢</button>
    </div>
  );
}

export default App;


