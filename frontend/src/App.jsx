import './App.css'
import Sidebar from './Sidebar.jsx'
import ChatWindow from './ChatWindow.jsx'
import {MyContext} from "./MyContext.jsx"
import { use, useState } from 'react'
import {v1 as uuidv1} from "uuid"

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChat, setprevChat] = useState([]);
  const [newChat, setnewChat] = useState(true);

  const providerValues = {
    prompt, setPrompt, 
    reply, setReply, 
    currThreadId, setCurrThreadId, 
    prevChat, setprevChat, 
    newChat, setnewChat
  };
  return (
    <div className='app font-mono flex h-screen'>
      <MyContext.Provider value = {providerValues}>
        <Sidebar/>
        <ChatWindow/>
      </MyContext.Provider>

    </div>
  )
}

export default App
