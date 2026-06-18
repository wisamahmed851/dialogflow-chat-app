import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ChatBot from './Components/ChatBot/ChatBot'

function App() {

  return (
    <div className="h-screen w-full overflow-hidden">
      <ChatBot />
    </div>
  )
}

export default App
