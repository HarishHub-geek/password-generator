import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [specialCharAllowed,setSpecialCharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(specialCharAllowed) str += "!@#$%^&*()_+"

    for(let i = 0;i <= length; i++){
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,numberAllowed, specialCharAllowed])

  const copyPasswordtoClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length,numberAllowed, specialCharAllowed])

  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
    <h1 className='text-white text-center my-3' >Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 border'>
        <input type="text"
        value={password}
        readOnly
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        ref={passwordRef}
        />
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordtoClipboard}
        >
        Copy</button>
      </div>

      <div className='flex text-sm justify-center gap-x-2' >
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="" id="" 
            defaultChecked = {numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="" id="" 
            defaultChecked = {specialCharAllowed}
            onChange={() => {
              setSpecialCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="character">SplCharacter</label>
          </div>
      </div>
   </div>
  )
}

export default App
