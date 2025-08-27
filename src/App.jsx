import { useState, useCallback, useEffect, useRef, use } from 'react' 
import './index.css'
import ThemeToggle from '../../customReact/darkmode.jsx'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const characters = '!@#$%^&*()_+~`|}{[]:;?><,./-='
    let allowed = letters
    if (numberAllowed) {
      allowed += numbers
    }
    if (charAllowed) {
      allowed += characters
    }
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * allowed.length + 1)
      pass += allowed.charAt(index)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
      window.navigator.clipboard.writeText(password).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }

  // useEffect(() => {
  //   generatePassword()
  // }, [length, numberAllowed, charAllowed])
  
  return (
    <div className="w-full max-w-md mx-auto shadow-md
rounded-lg px-4 py-3 my-8 bg-gray-800 text-gray-200 text-lg font-semibold">
      <span className='flex items-center'>
        <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-1 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white mr-15 "
      >
      {darkMode ? "🌑" : "🌕"}
    </button>
      <h1 className='text-gray-200 text-center my-3 text-2xl font-bold mb-5 '>Password Generator</h1>
      </span>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text"
          readOnly
          value={password} 
          className='w-full bg-gray-700 text-white px-3 py-2 outline-none'
          placeholder='Your Secure Password'
          ref={passwordRef}
          />
        
        <button
        onClick={generatePassword}
        className='bg-blue-700 text-white px-3 py-2 hover:bg-blue-900 transition-colors hover:cursor-pointer'
        >Generate
        </button>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
         type="range"
         min={4}
         max={50}
         value={length}
         className='cursor-pointer'
         onChange={(e) => setLength(e.target.value)}
         />
         <label htmlFor="length">Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <span className='mr-auto flex gap-x-1'>
        <input 
          type="checkbox"
          id=''
          checked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
          />
        <label htmlFor="number">Include Numbers</label>
        </span>
        <button
        onClick={copyPasswordToClipboard}
        className='bg-blue-700 text-white px-2 py-0.5  hover:bg-blue-900 transition-colors hover:cursor-pointer rounded-md'
        >{copied ? "Copied!" : "Copy" }</button>
        
        
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          id=''
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
          />
        <label htmlFor="char">Include Character</label>
        </div>
    </div>
  )
}

export default App
