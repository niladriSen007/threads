import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useThreadContext } from "../../store/ThreadContext";
const ChatUserProfile = ({
  username,
  setSelectedUserProfile,
  idx,
  userImg,
  lastMessage,
  setOtherUser,
  sender
}) => {


  const {currentUser} = useThreadContext();

  return (
    <div
      className="flex items-center gap-3 my-3 cursor-pointer"
      onClick={() => {
        setSelectedUserProfile(idx);
        setOtherUser(prev=>({...prev,idx:idx,name:username,img:userImg}));
      }}
    >
      <div className="relative">
        <img src={userImg} alt="" className="w-12 h-12 rounded-full" />
        <div className="absolute bottom-0 w-3 h-3 bg-green-500 rounded-full right-0"></div>
      </div>
      <div className="flex flex-col gap-1">
        <h1>{username}</h1>
        <h2 className="font-thin text-xs text-gray-200 flex items-center gap-1">
          { sender === currentUser?._id && <IoCheckmarkDoneOutline size={20} className="inline-block" />}
          {lastMessage?.length > 16 ? `${lastMessage?.slice(0,16)}...` : lastMessage }
          </h2>
      </div>
    </div>
  );
};
export default ChatUserProfile;
