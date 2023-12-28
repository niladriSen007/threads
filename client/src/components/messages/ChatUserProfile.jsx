const ChatUserProfile = ({username,setSelectedUserProfile,idx}) => {
  return (
    <div className="flex items-center gap-3 my-3 cursor-pointer" onClick={()=>setSelectedUserProfile(idx)}>
        <div className="relative">
            <img src="https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png" alt="" className="w-12 h-12 rounded-full"/>
            <div className="absolute bottom-0 w-3 h-3 bg-green-500 rounded-full right-0">

            </div>
        </div>
        <div>
            <h1>{username}</h1>
            <h2 className="font-thin text-gray-500">Message ...</h2>
        </div>
    </div>
  )
}
export default ChatUserProfile