import logo from './logo.svg';
import Checkbox from './components/Checkbox';
import { useState } from 'react';
import './App.css';

function App() {
  const [handleText, setHandleText] = useState("");
   const [copy, setCopy] = useState(false);

  const generatePassword = () => {
     const numbersArray = [0,1,2,3,4,5,6,7,8,9]
     const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")" ];
     const characterCodes = Array.from(Array(26)).map((_e, i)=> i +97);
     const lowerCaseLetters =  characterCodes.map(letter => String.fromCharCode(letter));
     const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());

     const {length, uppercase, lowercase, numbers, symbols} = password;

     const generateTheWord = (length, uppercase, lowercase, numbers, symbols) => {
      const availableCharacters = [
        ...(uppercase ? upperCaseLetters : []), 
        ...(lowercase ? lowerCaseLetters: []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray: []),
      ];
      const shuffleArray = (array) => array.sort(()=> Math.random() - 0.5);
        
        const characters = shuffleArray(availableCharacters).slice(0, length);
        setHandleText(characters.join(''));
        return characters;
     }

     generateTheWord(length, uppercase, lowercase, numbers, symbols);
}

  const [password, setPassword] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  });

   

  const handleChangeUppercase = () => {
    setPassword ({
      ...password, 
      uppercase: !password.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPassword ({
      ...password, 
      lowercase: !password.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPassword ({
      ...password, 
      numbers: !password.numbers
    });
  };

  const handleChangeSymbols = () => {
    setPassword ({
      ...password, 
      symbols: !password.symbols
    });
  };

  const setPasswordLength = (val) => {
    setPassword({
      ...password, 
      length: val
    })
  }
  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h2>Password Generator</h2>
        <div className="password-box">
          <input type="text" value={handleText} onChange={(e)=> setHandleText(e.target.value)}/>
          <button className='copy-button' onClick={() => {
            if (handleText.length > 0) {
              navigator.clipboard.writeText(handleText)
              setCopy(true);
              setInterval(()=> {
                setCopy(false);
              }, 20000)
            }
          }}>{copy ? 'Copied!' : 'Copy'}</button>
        </div>
        <br />
        <div className="word-criteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input type="number" value={password.length} onChange={(e) => setPasswordLength(e.target.value)} />
          </div>
        </div>
        <div className="word-criteria__box">
          <div><label>Include uppercase letters</label></div>
          <div>
            <Checkbox value={password.uppercase} onChange={handleChangeUppercase}/>
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label >Include lowercase letters</label>
          </div>
          <div>
          <Checkbox value={password.lowercase} onChange={handleChangeLowercase}/>
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
          <Checkbox  value={password.numbers} onChange={handleChangeNumbers} />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label > Include Symbols</label>
          </div>
          <div>
          <Checkbox value={password.symbols} onChange={handleChangeSymbols}/>
          </div>
        </div>
        <div>
          <button className='generate-button' onClick={generatePassword}>Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
