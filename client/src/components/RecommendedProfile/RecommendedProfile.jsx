const RecommendedProfile = ({name,username,profilePic,followers}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-600 pb-4 my-6">
      <div className="flex items-start gap-3">
        <div>
          <img
            src={profilePic || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
            alt="user"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <p className="font-bold  ">{username}</p>
            <p className="font-thin text-gray-600 -mt-1">{name}</p>
          </div>
          <span className="font-base">{followers?.length} { followers?.length > 1 ? 'followers' : 'follower'}</span>
        </div>
      </div>
      <div>
        <button className="bg-blue-700 border border-gray-600 text-white px-6 py-1 rounded-lg w-full">
          Follow
        </button>
      </div>
    </div>
  );
};
export default RecommendedProfile;
