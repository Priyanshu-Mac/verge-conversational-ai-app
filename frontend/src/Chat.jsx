import "./Chat.css"
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Chat(){
    const {newChat, setnewChat, prevChat, setprevChat} = useContext(MyContext);
    return(
        <>
    {newChat && (
      <div className="flex flex-col h-full">
        {/* Spacer pushes content down */}
        <div className="flex-grow" />

        {/* Welcome message just above input */}
        <div className="mb-35 text-center font-sans font-bold tracking-tight leading-snug">
          <span className="block text-4xl md:text-4xl bg-gradient-to-r from-[#6366f1] via-[#06b6d4] to-[#10b981] bg-clip-text text-transparent pb-2">
            It’s great to see you:)
          </span>
          <span className="mt-4 block text-lg md:text-xl text-slate-300 font-semibold leading-relaxed">
            Let’s get this conversation started...
          </span>
        </div>
      </div>
    )}
    <div className="chats">
        <div className="userDiv">
          
        </div>
        <div className="modelDiv">

        </div>
    </div>
  </>
    )
}

export default Chat;