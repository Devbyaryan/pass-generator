import { useState ,useCallback, useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?/";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copypasstoclipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div id="container" className='w-full max-w-md p-4 bg-gray-400 mx-auto rounded-2xl'>
        <h1>Password Generator</h1>
        <div className='flex rounded-xl mt-2 overflow-hidden'>
          <input 
            type="text"
            value={password}
            placeholder='password'
            className='outline-none w-full px3 bg-slate-100 py1 px-2 '
            ref={passwordref}
            readOnly 
          />
          <button className='bg-blue-600 shrink-0 py-1 px-3 text-white'
          onClick={copypasstoclipboard}>
            Copy
          </button>
        </div>
        <div className='flex w-full mt-2 items-center gap-3'>
          <div className='flex gap-1 my-2'>
            <input 
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <div>
              <p>Length: <span className='text-red-600 font-bold text-m'>{length}</span></p>
            </div>
          </div>
          <div className='flex gap-1 my-2'>
            <input 
              type="checkbox"
              checked={charAllowed}
              id='characterInput'
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
          <div>
            <input 
              type="checkbox"
              checked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
