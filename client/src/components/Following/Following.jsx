import { useEffect, useState } from "react";
import { useThreadContext } from "../../store/ThreadContext";
import axios from "axios";

const Following = () => {
  const { currentUser,setCurrentUser } = useThreadContext();
  
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);




  const fetchFollowing = async () => {
    try {
      const promises = currentUser?.following?.map((id) =>
        axios.get(`/api/users/getProfile/${id}`)
      );
      const responses = await Promise.all(promises);
      const followingDetails = responses.map((response) => response.data);
      setLoading(false);
      setFollowing(followingDetails);
    } catch (error) {
      console.error("Failed to fetch followers", error);
    }
  };



  useEffect(() => {
    // if (currentUser?.following?.length) {
      fetchFollowing();
    // }
  }, [currentUser?.following]);


  const followUsers = async (id) => {
    try {
      const {data} = await axios.put(`/api/users/followOrUnfollow/${id}`);
      console.log(data)
      setCurrentUser(data)
      if(data?.following?.length > 0)
        fetchFollowing();
    } catch (error) {
      console.error("Failed to follow user", error);
    }
  };

  return (
    <div className=" text-white">
       <p className=" pb-4">You are following</p>
      { loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : following?.length > 0 ? (

        following?.map((follow) => (
          <div
            key={follow?._id}
            className="flex items-center justify-between gap-5 border-b border-gray-600 py-5"
          >
            <div className="flex items-center gap-5">
              <img
                src={
                  follow?.profileimg ||
                  "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                }
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">{follow?.username}</span>
                <span className="text-sm text-gray-400">{follow?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              {follow?.followers?.includes(currentUser?._id) ? (
                <button
                  className="  text-white border border-gray-600 w-full py-1 px-2 bg-transparent rounded-lg flex items-center gap-2"
                  onClick={() => followUsers(follow?._id)}
                >
                  {/* <SlUserFollowing /> */}
                  Unfollow{" "}
                </button>
              ) : (
                <button
                  className="  text-white  w-full py-1 px-2 bg-blue-700 rounded-lg"
                  onClick={() => followUsers(follow?._id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-12">You have not yet followed anyone</p>
      )}
    </div>
  );
};
export default Following;
