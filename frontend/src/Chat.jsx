import "./Chat.css"
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Chat(){
    const {newChat, setnewChat, prevChat, setprevChat} = useContext(MyContext);
    return(
      <>
      {newChat && (
        <div className="welcome-message-container">
          <div className="welcome-text">
            <span className="welcome-title">
              It’s great to see you:)
            </span>
            <span className="welcome-subtitle">
              Let’s get this conversation started...
            </span>
          </div>
        </div>
      )}
      <div className="chats-container">
        {prevChat?.map((chat, idx) => (
          <div key={idx} className={`chat-message-row ${chat.role === "user" ? 'user-row' : 'model-row'}`}>
            <div className={`chat-message ${chat.role === "user" ? 'user-msg' : 'model-msg'}`}>
              {chat.content}
            </div>
          </div>
        ))}
      </div>
    </>
    )
}

export default Chat;