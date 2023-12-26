import { SlUserFollowing } from "react-icons/sl";
import { useThreadContext } from "../../store/ThreadContext";
import axios from "axios";

const RecommendedProfile = ({name,username,profilePic,followers,userId}) => {

  const { currentUser,setCurrentUser } = useThreadContext();


  const followUnfollowUsers = async () => {
    // console.log(id)
    // const userTd = id.toString()
    try {
      const {data} = await axios.put(`/api/users/followOrUnfollow/${userId}`);
      console.log(data)
      setCurrentUser(data)
      // fetchFollowers();
    } catch (error) {
      console.error("Failed to follow user", error);
    }
  };

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


      <div className="flex items-center gap-5">
              {currentUser?.following?.includes(userId) ? (
                <button
                  className="  text-white border border-gray-600 w-full py-1 px-2 bg-transparent rounded-lg flex items-center gap-2"
                  onClick={followUnfollowUsers}
                >
                  <SlUserFollowing />
                  Following{" "}
                </button>
              ) : (
                <button
                  className="  text-white  w-full py-1 px-2 bg-blue-700 rounded-lg"
                  onClick={followUnfollowUsers}
                >
                  Follow
                </button>
              )}
            </div>
    </div>
  );
};
export default RecommendedProfile;
