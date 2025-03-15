import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SongGuessGame from './screens/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SongGuessGame/>
    </>
  )
}

export default App
