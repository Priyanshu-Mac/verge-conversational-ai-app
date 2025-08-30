// import "./Sidebar.css"
// import { BadgePlus } from 'lucide-react';
// function Sidebar(){
//     return(
//         <div className="bg-[#596869] min-h-screen w-64 p-4 text-white shadow-lg">
//             {/* New chat option */}

//             <button className="fixed top-2 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#65B891]
//              text-white font-medium shadow-md 
//              hover:scale-105 hover:shadow-xl hover:bg-gray-600
//              active:scale-95 transition-all duration-200 ease-in-out
//              sm:static sm:rounded-md sm:px-2 sm:py-2 sm:m-4">
//                 <BadgePlus size={20}/>
//                 <span className="hidden sm:inline">New Chat</span>
//             </button>

//             {/* Threads/History */}

//             <ul>
//                 <li>history1</li>
//                 <li>history2</li>
//                 <li>history3</li>
//                 <li>history4</li>
                
//             </ul>

//             {/* BrandLogo */}
//         </div>
//     )
// }
// export default Sidebar;

import "./Sidebar.css";
import { BadgePlus } from "lucide-react";
import { MessageSquare, Settings, LogOut, Origami } from "lucide-react"; // Import more icons

function Sidebar() {
  return (
    <div className="flex flex-col bg-[#111827] min-h-screen w-75 p-4 text-[#F9FAFB] shadow-xl">
      
      {/* New chat button */}
      <button
        className="mt-4 flex items-center w-full gap-3 p-3 mb-4 font-semibold text-white transition-all duration-200 ease-in-out rounded-lg shadow-md bg-[#3B82F6] hover:bg-[#60A5FA] hover:scale-[1.02] active:scale-[0.98]"
      >
        <BadgePlus size={20} />
        New Chat
      </button>

      {/* Threads/History Section */}
      <nav className="flex-1 overflow-y-auto mt-14">
        <h2 className="mb-2 ml-3 text-s font-semibold tracking-wide text-gray-400 uppercase">
          History
        </h2>
        <ul className="space-y-2">
          {["Chat with Gemini", "Meeting Notes", "Code Snippets", "Project A"].map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center gap-3 p-3 text-sm transition-colors duration-200 rounded-lg hover:bg-gray-700">
                <MessageSquare size={16} />
                <span className="truncate">{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Brand & Settings/Profile Section */}
      <div className="p-4 mt-auto border-t border-gray-700">
        <div className="mb-4">
          <span className="flex items-center space-x-2 text-xl font-bold ml-4">
            <p className="mr-2">Verge</p>
            <Origami size={26} strokeWidth={0.75} />  
          </span>
        </div>

        <div className="mt-4">
            <ul className="space-y-2">
            <li>
                <a
                href="#"
                className="flex items-center gap-3 p-3 text-sm transition-colors duration-200 rounded-lg hover:bg-gray-700">
                <Settings size={16} />
                Settings
                </a>
            </li>
            <li>
                <a
                href="#"
                className="flex items-center gap-3 p-3 text-sm text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700"
                >
                <LogOut size={16} />
                Log Out
                </a>
            </li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;