import { FaSearch } from "react-icons/fa";
import RecommendedProfile from "../components/RecommendedProfile/RecommendedProfile";
const SearchPage = () => {
  return (
    <section className="max-w-xl  mx-auto">
      <div className="flex items-center  w-full border-2 border-gray-600 bg-transparent h-10 px-5 py-7 rounded-2xl text-sm gap-2">
        <FaSearch size={18} className="text-sm font-thin" color="gray" />
        <input
          type="text"
          className="w-full  focus:outline-none bg-transparent"
          placeholder="Search"
        />
      </div>


      {/* famous Profiles */}
      <div className="my-10">
        <RecommendedProfile />
        <RecommendedProfile />
        <RecommendedProfile />
      </div>
    </section>
  );
};
export default SearchPage;
