import { useEffect, useState } from "react";
import { useThreadContext } from "../../store/ThreadContext";
import { SlUserFollowing } from "react-icons/sl"
import axios from "axios";

const Followers = () => {
  const { currentUser,setCurrentUser } = useThreadContext();

  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(currentUser?.followers);

  const fetchFollowers = async () => {
    try {
      const promises = currentUser?.followers?.map((id) =>
        axios.get(`/api/users/getProfile/${id}`)
      );
      const responses = await Promise.all(promises);
      const followerDetails = responses.map((response) => response.data);
      setLoading(false);
      setFollowers(followerDetails);
    } catch (error) {
      console.error("Failed to fetch followers", error);
    }
  };

  useEffect(() => {
    // if (currentUser?.followers?.length) {
      fetchFollowers();
    // }
  }, []);

  console.log(followers);

  const followUnfollowUsers = async (id) => {
    try {
      const {data} = await axios.put(`/api/users/followOrUnfollow/${id}`);
      console.log(data)
      setCurrentUser(data)
      fetchFollowers();
    } catch (error) {
      console.error("Failed to follow user", error);
    }
  };

  return (
    <div className="text-white">
      <p className=" pb-4">Your Followers</p>
      {/* {loading && <div className="text-center text-white">Loading...</div>} */}
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : followers?.length > 0 ? (
        followers?.map((follower) => (
          <div
            key={follower?._id}
            className="flex items-center justify-between gap-5 border-b border-gray-600 py-5"
          >
            <div className="flex items-center gap-5">
              <img
                src={
                  follower?.profileimg ||
                  "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
                }
                alt="user"
                className="rounded-full  w-12 h-12"
                loading="lazy"
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">{follower?.username}</h1>
                <p className="text-sm text-gray-400 font-semibold">
                  {follower?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              {follower?.followers?.includes(currentUser?._id) ? (
                <button
                  className="  text-white border border-gray-600 w-full py-1 px-2 bg-transparent rounded-lg flex items-center gap-2"
                  onClick={() => followUnfollowUsers(follower?._id)}
                >
                  <SlUserFollowing />
                  Following{" "}
                </button>
              ) : (
                <button
                  className="  text-white  w-full py-1 px-2 bg-blue-700 rounded-lg"
                  onClick={() => followUnfollowUsers(follower?._id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-white">No followers yet.</div>
      )}
    </div>
  );
};
export default Followers;
