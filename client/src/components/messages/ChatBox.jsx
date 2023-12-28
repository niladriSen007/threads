import { FaPaperPlane } from "react-icons/fa";

const ChatBox = () => {
  const messages = [
    {
      id: 1,
      message: "Hello sayan",
      sender: "Niladri",
      receiver: "Sayan",
      timestamp: "21.36",
    },
    {
      id: 2,
      message: "Hi Nil, How are you?",
      sender: "Sayan",
      receiver: "Niladri",
      timestamp: "21.36",
    },
    {
      id: 3,
      message: "I am fine, How are you?",
      sender: "Niladri",
      receiver: "Sayan",
      timestamp: "21.36",
    },
    {
      id: 4,
      message: "I am fine too",
      sender: "Sayan",
      receiver: "Niladri",
      timestamp: "21.36",
    },
    {
      id: 5,
      message: "What are you doing?",
      sender: "Niladri",
      receiver: "Sayan",
      timestamp: "21.36",
    },
    {
      id: 6,
      message: "    Nothing much, just chilling out with friends, you?",
      sender: "Sayan",
      receiver: "Niladri",
      timestamp: "21.36",
    },
    {
      id: 7,
      message: "Coding, Coding and Coding",
      sender: "Niladri",
      receiver: "Sayan",
      timestamp: "21.36",
    },
    {
      id: 8,
      message: "Coding sucks",
      sender: "Sayan",
      receiver: "Niladri",
      timestamp: "21.36",
    },
  ];

  return (
    <div className="rounded-t-md relative">
      <div className="bg-slate-800 w-full h-14 p-2 flex items-center gap-3 relative">
        <img
          src="https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <h1 className="text-white text-lg font-medium">Niladri</h1>
        <div className="absolute bottom-2 w-3 h-3 bg-green-500 rounded-full left-8"></div>
      </div>
      <div className="bg-gradient-to-b from-slate-950 to-blue-950 h-[600px] pb-16 w-full border-x border-b border-gray-600 p-4 rounded-b-md ">

        <div className="h-[500px]">

        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col my-2 ${
              message.id % 2 !== 0 ? "items-end" : "items-start"
            }`}
          >
           <div className={`flex items-center gap-2 ${message.id % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}>
            <div>
              <img src="https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png" alt="" className="w-8 h-8 rounded-full" />
            </div>
            <div
              className={`flex flex-col  my-2  px-3 py-1 rounded-md ${
                 message.id % 2 !== 0 ? "items-end bg-blue-700" : "items-start bg-violet-700"
              }`}
            >
              <div>
                <h1
                  className={`text-sm ${
                    message.id % 2 !== 0 ? "text-white" : "text-gray-200"
                  }`}
                >
                  {message.sender}
                </h1>
              </div>
             <div>
             <h1
                className={`text-xs ${
                   message.id % 2 !== 0 ? "text-white" : "text-gray-200"
                }`}
              >
                {message.message}
              </h1>
             
             </div>
            </div>
           </div>
            <p
                className={`text-xs   ${
                  message.id % 2 !== 0 ? "text-white text-right mr-10" : "text-gray-200 ml-10"
                }`}
              >
                {message.timestamp}
              </p>
          </div>
        ))}

 </div>

        <div className="flex items-center gap-2 absolute bottom-2 bg-slate-800  w-[612px]  p-4 rounded-full z-50  backdrop-blur-xl">
          <input
            type="text"
            name=""
            id=""
            className="w-full bg-transparent focus:outline-none focus:border-b border-b border-gray-600"
            placeholder="Type a message"
          />
          <FaPaperPlane size={24} className="text-gray-200" />
          </div>
      </div>
    </div>
  );
};
export default ChatBox;
