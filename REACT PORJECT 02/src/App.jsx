import { useCallback, useState, useEffect } from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [chars, setChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numbers) {
      str += '123456789';
    }
    if (chars) {
      str += '!@#$%^&*()~';
    }

    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * str.length);
      pass += str[random];
    }
    setPassword(pass);
    setCopySuccess(""); // Reset copy message after generating a new password
  }, [length, numbers, chars]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
      .then(() => setCopySuccess("Password copied!"))
      .catch(() => setCopySuccess("Failed to copy"));
  };

  return (
    <>
      <div className="container">
        <div className="subcontainer">
          <div className="password">
            <input type='text' readOnly value={password} />
            <button className='btn' onClick={handleCopy}>Copy</button>
            {copySuccess && <p>{copySuccess}</p>}
          </div>
          <div className="changes">
            <input 
              type='range' 
              min={8} 
              max={16} 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))} 
            />
            <label>Length: {length}</label>
            
            <input 
              type='checkbox' 
              checked={numbers} 
              onChange={() => setNumbers(prev => !prev)} 
            />
            <label>Include Numbers</label>

            <input 
              type='checkbox' 
              checked={chars} 
              onChange={() => setChars(prev => !prev)} 
            />
            <label>Include Special Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
