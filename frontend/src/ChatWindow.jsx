import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { Origami, Send } from "lucide-react";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {BounceLoader} from "react-spinners";


function ChatWindow() {
  const {prompt, setPrompt, reply, setReply, currThreadId, newChat, setnewChat, prevChat, setprevChat} = useContext(MyContext);
  const [loadingState, setLoadingState] = useState(false);

  const getReply = async () => {
    setLoadingState(true);

    // Only call the API if the prompt is not empty
    if (!prompt || prompt.trim() === "") {
        console.error("No message provided to Gemini API.");
        return;
    }

    // Append the user's message to the chat history immediately
    const userMessage = { role: "user", content: prompt };
    setprevChat(prevChat => [...prevChat, userMessage]);
    setnewChat(false); // Hide the welcome message

    // Store the current prompt value before clearing it
    const currentPrompt = prompt;
    setPrompt("");

    const options = {
      method : "POST",
      headers : {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message : prompt,
        threadId : currThreadId
      })
      
    }

    try{
      let response = await fetch("http://localhost:8080/api/chat", options);
      let res = await response.json();
      console.log(res);

      // Append the model's reply to the chat history
      const modelMessage = { role: "model", content: res.reply };
      setprevChat(prev => [...prev, modelMessage]);

    }
    catch(err){
      console.log(err);
      //Add an error message to the chat
      setprevChat(prev => [...prev, { role: "model", content: "Sorry, something went wrong. Please try again." }]);
    }
    setLoadingState(false);
  }
  

  const handleEnterPress = (e) => {
    if(e.key == "Enter"){
      getReply();
    }
  }



  return (

    <div className="chatWindow flex flex-col bg-gradient-to-tr from-[#202938] to-[#111827] flex-1 h-full">

      {/* Navbar */}
      <div className="navbar text-[#F9FAFB] mt-4 flex-shrink-0">
        <span className="flex items-center space-x-2 text-xl font-bold ml-4">
          <p className="mr-2">Verge</p>
          <Origami size={26} strokeWidth={0.75} />
        </span>
        <div className="border-t border-gray-700 mt-4 mx-2"></div>
      </div>

      {/* Chat Messages Container - This takes up remaining space */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <Chat />
        
        {/* Loader - Now inside the scrollable area */}
        {loadingState && 
          <div className="flex items-center justify-center py-10">
            <BounceLoader color="#4B5A75" speedMultiplier={1.2} size={50} loading={loadingState}/>
          </div>
        }
      </div>

      {/* Fixed ChatInput - Always stays at bottom */}
      <div className="flex-shrink-0 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-4 p-2 bg-gray-800 rounded-3xl shadow-xl">
            <input
              type="text"
              placeholder="Ask Sparrow"
              className="flex-1 p-2 text-sm text-gray-200 bg-transparent rounded-full outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleEnterPress}
            />
            <button 
              className="p-2 font-semibold text-white transition-all duration-200 ease-in-out rounded-full shadow-md bg-blue-600 hover:bg-blue-700 active:scale-95"
              onClick={getReply}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-4 pt-2 text-xs text-gray-400 border-t border-gray-700 text-center">
            Sparrow can make mistakes. Consider double-checking important
            information.
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatWindow;
