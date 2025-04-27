import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './GameInfo.css'; 

const GameInfo = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/game'); 
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#9f56ff' }}>
        🎮 About the Word Chain Game
      </h2>

      <p>
        <strong>Word Chain Game</strong> is an interactive and educational game where players build a chain of English words. 
        Each word must begin with the <strong>last letter</strong> of the previous word.
      </p>

      <p>
        The game is designed to improve <em>vocabulary, spelling, and reaction time</em> through fun word play under time pressure ⏱️.
      </p>

      <h3 style={{ color: '#f985fd', marginTop: '30px' }}>📚 Technologies Used</h3>
      <ul>
        <li>⚛️ <strong>React</strong>  -for building interactive UI</li>
        <li>📦 <code>an-array-of-english-words</code>  -as the English dictionary source</li>
        <li>💅 <strong>Custom CSS</strong>  -for styling and responsive layout</li>
      </ul>

      <h3 style={{ color: '#f985fd', marginTop: '30px' }}>✨ Features</h3>
      <ul>
        <li>📝 Live feedback for each word (valid, invalid, already used)</li>
        <li>📊 Score tracking & word history</li>
        <li>🏆 Best score memory with congratulation message</li>
        <li>🔁 Restart option to play again</li>
      </ul>
    {/*button to redirect to the game from other pages */}
      <button
        className="check-button"
        onClick={handlePlayNow}
        style={{ marginTop: '30px', width: '100%', maxWidth: '250px' }}
      >
        ▶️ Play Now
      </button>
    </div>
  );
};

export default GameInfo;
