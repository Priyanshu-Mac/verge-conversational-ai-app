import "./Chat.css"
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import { Bot, User, Copy, Check } from 'lucide-react';

function Chat(){
    const {newChat, setnewChat, prevChat, setprevChat, reply} = useContext(MyContext);
    const [latestReply, setlatestReply] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const copyToClipboard = async (text, index) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    useEffect(() => {
      const lastMessage = prevChat[prevChat.length - 1];
      
      if(!lastMessage || lastMessage.role !== "model" || !lastMessage.content) {
        setlatestReply("");
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      const content = lastMessage.content.split(" ");
      let idx = 0;

      const interval = setInterval(() => {
        setlatestReply(content.slice(0, idx + 1).join(" "));
        idx++;

        if(idx >= content.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(interval);

    }, [prevChat.length]);

    return(
      <>
      {newChat && (
        <div className="welcome-message-container">
          <div className="welcome-text">
            <span className="welcome-title">
              It's great to see you:)
            </span>
            <span className="welcome-subtitle">
              Let's get this conversation started...
            </span>
          </div>
        </div>
      )}

      <div className="modern-chat-container">
        {/* Show all messages except the last one if it's currently typing */}
        {prevChat?.slice(0, isTyping ? -1 : prevChat.length).map((chat, idx) => (
          <div key={idx} className={`modern-message ${chat.role === "user" ? 'user-message' : 'assistant-message'}`}>
            
            {/* Avatar Section */}
            <div className="message-avatar">
              {chat.role === "user" ? (
                <div className="user-avatar">
                  <User size={16} />
                </div>
              ) : (
                <div className="assistant-avatar">
                  <Bot size={16} />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="message-content">
              <div className="message-header">
                <span className="message-role">
                  {chat.role === "user" ? "You" : "Verge"}
                </span>
                {chat.role === "model" && (
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard(chat.content, `msg-${idx}`)}
                    title="Copy message"
                  >
                    {copiedIndex === `msg-${idx}` ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                )}
                {chat.role === "user" && (
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard(chat.content, `user-msg-${idx}`)}
                    title="Copy message"
                  >
                    {copiedIndex === `user-msg-${idx}` ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                )}
              </div>
              
              <div className="message-body">
                {chat.role === "user" ? (
                  <div className="user-text">{chat.content}</div>
                ) : (
                  <div className="assistant-text">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                      {chat.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Animation */}
        {isTyping && latestReply && (
          <div className="modern-message assistant-message" key="typing">
            <div className="message-avatar">
              <div className="assistant-avatar typing">
                <Bot size={16} />
              </div>
            </div>
            
            <div className="message-content">
              <div className="message-header">
                <span className="message-role">Verge</span>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              
              <div className="message-body">
                <div className="assistant-text">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
    )
}

export default Chat;