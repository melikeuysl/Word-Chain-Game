import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Rules = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/game');
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: '28px', color: '#9f56ff', marginBottom: '20px' }}>📜 Game Rules</h2>

      <p>
        The <strong>Word Chain Game</strong> is a fun and fast-paced game where players test their vocabulary
        and reflexes. Below are the official rules to keep the game fair and challenging:
      </p>

      <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginTop: '20px' }}>
        <li>🟣 <strong>Start with any word:</strong> You are free to choose the first word without any restriction.</li>
        <li>🔗 <strong>Follow the chain:</strong> Each new word must start with the <strong>last letter</strong> of the previous word.</li>
        <li>🔁 <strong>No repeats:</strong> A word that has already been used in the same game cannot be used again.</li>
        <li>📖 <strong>Use valid words only:</strong> Every word must exist in the English dictionary.</li>
        <li>⏰ <strong>Act fast:</strong> You must enter a new word within <strong>15 seconds</strong> or the game will end.</li>
        <li>🏆 <strong>Score matters:</strong> Your score increases with the length of each valid word you enter.</li>
        <li>🎉 <strong>Break your record:</strong> If your score is the best so far, you'll be celebrated!</li>
      </ul>

      <p style={{ marginTop: '30px' }}>
        Ready to play? Click below to start the challenge! 🔥
      </p>


     {/*button to redirect to the game from other pages */}
      <button
        className="check-button"
        onClick={handlePlayNow}
        style={{ marginTop: '20px', width: '100%', maxWidth: '250px' }}
      >
        ▶️ Play Now
      </button>
    </div>
  );
};

export default Rules;
