import React, { useState, useEffect, useRef } from 'react';
import englishWords from 'an-array-of-english-words';

const Game = () => {
 // Stores the word entered by the user
  const [word, setWord] = useState('');

 // Stores previously entered valid words
  const [usedWords, setUsedWords] = useState([]);

  // Message to be displayed to the user and message type (success, warning, error)
  const [feedback, setFeedback] = useState({ message: '', type: '' });

 // Keeps the user's current score (sum of word lengths)
  const [score, setScore] = useState(0);

  // Time remaining (in seconds)
  const [timeLeft, setTimeLeft] = useState(15);

 // Checks if the game is over
  const [gameOver, setGameOver] = useState(false);

// Keeps the highest score ever
  const [bestScore, setBestScore] = useState(0);

// Checks if the game has started or not (starts with the first word)
  const [hasStarted, setHasStarted] = useState(false);

// When the game starts
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

// Displays congratulations message when a new record is broken
  const [showCongrats, setShowCongrats] = useState(false);

// Timer reference for counter
  const timerRef = useRef(null);

 // useEffect: When the game starts, the counter runs every second
  useEffect(() => {
    if (!hasStarted || gameOver) return;
    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev === 1) {
          clearInterval(timerRef.current); // The counter is stopped
          setEndTime(Date.now());          // Get the end time
          setGameOver(true);              // Marks the game as over

         // If there is a new record, it is saved
          if (score > bestScore) {
            setBestScore(score);
            setShowCongrats(true);
          }

          // Time expired message is displayed to the user
          setFeedback({
            message:
              '<span class="material-icons" style="vertical-align: middle; margin-right: 6px; color: #721c24;">error_outline</span> Times up! Game over.',
            type: 'error'
          });
          
        }
        return prev - 1; // Every second the counter decreases by 1
      });
    }, 1000); // Runs every 1 second

   // If the component is unmounted or updated, the counter is reset
    return () => clearInterval(timerRef.current);
  }, [usedWords, gameOver, hasStarted, score, bestScore]);


 // Function that runs when the "Check" button is pressed
  const handleCheck = () => {
    
    const lowerWord = word.toLowerCase(); // Word is converted to lower case
    if (gameOver || !word) return; // Exit if game is over or input is empty

  // Error message if the word is not in the dictionary
    if (!englishWords.includes(lowerWord)) {
      setFeedback({
        message:
          `<span class="material-icons" style="vertical-align: middle; margin-right: 6px; color: #721c24;">cancel</span> '${word}'  is not a valid English word.`,
        type: 'error'
      });
      

    // Warning message if the word has been used before
    } else if (usedWords.includes(lowerWord)) {
      setFeedback({
        message:
          `<span class="material-icons" style="vertical-align: middle; margin-right: 6px; color: #856404;">warning</span> '${word}'  has already been used.`,
        type: 'warning'
      });
      

   // Error message if the chain rule (starting with the last letter) is not followed
    } else if (
      usedWords.length > 0 &&
      lowerWord.charAt(0) !== usedWords[usedWords.length - 1].slice(-1)
    ) {
      setFeedback({
        message:
          `<span class="material-icons" style="vertical-align: middle; margin-right: 6px; color: #721c24;">link_off</span> Word must start with the letter. '${usedWords[usedWords.length - 1].slice(-1).toUpperCase()}' `,
        type: 'error'
      });
      

   // If the word is valid
    } else {
      if (!hasStarted) {
        setHasStarted(true);         // The game starts
        setStartTime(Date.now());    // Start time is recorded
      }

      setUsedWords([...usedWords, lowerWord]); // Word is added to the list
      setScore(score + lowerWord.length);      // Word length is added to the score
      setFeedback({
        message:
          `<span class="material-icons" style="vertical-align: middle; margin-right: 6px; color: #155724;">check_circle</span> Next word must start with the letter'${lowerWord.slice(-1).toUpperCase()}' `,
        type: 'success'
      });
      
      setTimeLeft(15); // Counter is reset
    }

    setWord(''); // Input field is cleared
  };


  // Reset and restart the game
  const handleRestart = () => {
    setWord('');
    setUsedWords([]);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setHasStarted(false);
    setStartTime(null);
    setEndTime(null);
    setShowCongrats(false);
    setFeedback({ message: '', type: '' });
  };

 
  // Actual elapsed time is calculated in seconds
  const totalTimeInSeconds =
    startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  return (
    <div className="container">
      {!gameOver ? (
        <>
          {/* Header box */}
          <div className="status-box">
            <div className="status-item">WORDS<br />{usedWords.length}</div>
            <div className="status-item">TIME<br />{timeLeft}s</div>
            <div className="status-item">SCORE<br />{score}</div>
          </div>

          {/* Word input field from the user */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <input
    type="text"
    className="input-word"
    value={word}
    onChange={(e) => setWord(e.target.value)}
    placeholder="Enter a word"
  />
  <button onClick={handleCheck} className="check-button">
    <span className="material-icons" style={{ fontSize: '24px' }}>
      done
    </span>
    Check
  </button>
</div>


          {feedback.message && (
         <div
            className={`feedback ${feedback.type}`}
             dangerouslySetInnerHTML={{ __html: feedback.message }}
           />
         )}


          {/* Shows the entered words */}
          <div className="word-list">
            {usedWords.map((w, i) => (
              <div key={i} className="word-button">{w.toUpperCase()}</div>
            ))}
          </div>
        </>
      ) : (


        <>
        {/* Game over screen */}
        <h3 className="feedback error">
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
            highlight_off
          </span>
          Game Over
        </h3>
        <hr></hr>
      
        <p>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px', color: '#333' }}>
            spellcheck
          </span>
          <strong>Word Count:</strong> {usedWords.length}
        </p>
        
        <p>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px', color: '#333' }}>
            timer
          </span>
          <strong>Total Time:</strong> {totalTimeInSeconds} seconds
        </p>
        
      
        <p>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px', color: '#333' }}>
            score
          </span>
          <strong>Score:</strong> {score}
        </p>
        
      
        <p>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px', color: '#333' }}>
            emoji_events
          </span>
          <strong>Highest Score:</strong> {bestScore}
        </p>
      
        <hr></hr>

          {/* New record congratulatory message */}
          {showCongrats && (<p className="feedback success"> <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
      celebration
      </span>
      New record! Congratulations!
  </p>
)}


          {/* Restart button */}
          <button onClick={handleRestart} className="restart-button">
  <span className="material-icons" style={{ fontSize: '24px' }}>
    replay
  </span>
  Play Again 
</button>

          {/* List showing the words used */}
          <div className="word-list" style={{ marginTop: '20px' }}>
            {usedWords.map((w, i) => (
              <div key={i} className="word-button">{w.toUpperCase()}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
