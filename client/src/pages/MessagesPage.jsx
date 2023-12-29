import { FaSearch } from "react-icons/fa";
import ChatUserProfile from "../components/messages/chatUserProfile";
import { useEffect, useState } from "react";
import ChatBox from "../components/messages/ChatBox";
import { IoLogoSnapchat } from "react-icons/io";
import axios from "axios";
import { useQuery } from "react-query";
import { useThreadContext } from "../store/ThreadContext";
const MessagesPage = () => {

  const {getconversationsLoading}= useThreadContext();

  const [availableUsers, setAvailableUsers] = useState();

  const [selecteduserProfile, setSelectedUserProfile] = useState(-1);
  const [otherUser, setOtherUser] = useState({
    idx:"",
    name:"",
    img:""
  });


  const fetchAvailableUsers = async () => {
    try {
      const {data} = await axios.get("/api/messages/getconversations");
      setAvailableUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAvailableUsers();
  }, [getconversationsLoading]);


  // const {data} = useQuery("availableUsers",fetchAvailableUsers);



  return (
    <div className=" rounded-md max-w-4xl mx-auto my-12 flex items-start gap-12 ">
      <div className="w-1/4 p-2 flex  flex-col shadow-sm shadow-slate-100">
        <h1>Your conversations </h1>
        <div className="flex  items-center gap-2 rounded-md  p-2 my-2 ">
          <input
            type="search"
            name=""
            id=""
            className="bg-transparent w-44 focus:outline-none focus:border-b border-b border-gray-600"
            placeholder="Search for a user"
          />
          <FaSearch size={26} className="text-sm font-thin" />
        </div>
        <div className="my-2">
          {availableUsers?.length > 0 ? (
            availableUsers?.map((user) => (
              <div
                key={user?._id}
                className={`${
                  selecteduserProfile === user?.participants?.at(0)?._id ? "bg-slate-800" : ""
                } rounded-md`}
              >
                <ChatUserProfile
                  username={user?.participants?.at(0)?.username}
                  idx={user?.participants?.at(0)?._id}
                  setSelectedUserProfile={setSelectedUserProfile}
                  userImg={user?.participants?.at(0)?.profileimg}
                  lastMessage={user?.lastMessage?.text}
                  setOtherUser={setOtherUser}
                  sender={user?.lastMessage?.sender}
                />
              </div>
            ))
          ) : (
            <h1>No conversations yet</h1>
          )}
        </div>
      </div>
      <div className="flex-1 p-2 w-3/4  ">
        {selecteduserProfile === -1 ? (
          <div className="w-full h-[600px] items-center justify-center text-xl flex flex-col gap-4">
          <IoLogoSnapchat size={80}/>
          <h1 className="text-center ">Select a user to start a conversation</h1>
          </div>

        ) : (
          <ChatBox receivingUser ={otherUser}  />
        )}
      </div>
    </div>
  );
};
export default MessagesPage;
