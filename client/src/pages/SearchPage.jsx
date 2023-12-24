import { FaSearch } from "react-icons/fa";
import RecommendedProfile from "../components/RecommendedProfile/RecommendedProfile";
import axios from "axios";
import { useQuery } from "react-query";
const SearchPage = () => {
  const allUsers = async () => {
    try {
      const { data } = await axios.get("/api/users/getAllUsers");
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { status, data } = useQuery("allUsers", allUsers);
  console.log(status);
  console.log(data);

  return (
    <section className="max-w-xl  mx-auto ">
      <div className="flex items-center  w-full border-2 border-gray-600 bg-transparent h-14 px-5  rounded-2xl text-sm gap-2 ">
        <FaSearch size={18} className="text-sm font-thin" color="gray" />
        <input
          type="text"
          className="w-full  focus:outline-none bg-transparent"
          placeholder="Search"
        />
      </div>

      {/* famous Profiles */}
      <div className="my-10">
        {data?.map((user) => (
          <div key={user._id}>
            <RecommendedProfile
              name={user.name}
              username={user.username}
              profilePic={user.profilePic}
            />
          </div>
        ))}
        {/* <RecommendedProfile />
        <RecommendedProfile />
        <RecommendedProfile /> */}
      </div>
    </section>
  );
};
export default SearchPage;
