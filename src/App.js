import React, { useState } from 'react';
import './App.css';

function App() {
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const availableCoins = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult([]);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coins/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetAmount: parseFloat(targetAmount),
          coinDenominations: selectedCoins.map(Number)
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid input or server error');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCoinSelection = (e) => {
    const value = parseFloat(e.target.value);
    if (selectedCoins.includes(value)) {
      setSelectedCoins(selectedCoins.filter(coin => coin !== value));
    } else {
      setSelectedCoins([...selectedCoins, value].sort((a, b) => a - b));
    }
  };

  return (
    <div className="App">
      <h1>Coin Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Target Amount(0.00-10000.00):
            <input
              type="number"
              step="0.01"
              min="0"
              max="10000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Select Coin Denominations:
            <div className="coin-options">
              {availableCoins.map(coin => (
                <label key={coin} className="coin-option">
                  <input
                    type="checkbox"
                    value={coin}
                    checked={selectedCoins.includes(coin)}
                    onChange={handleCoinSelection}
                  />
                  {coin}
                </label>
              ))}
            </div>
          </label>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {error && <div className="error">{error}</div>}
      {result.length > 0 && (
        <div className="result">
          <h2>Required Coins:</h2>
          <p>{result.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
