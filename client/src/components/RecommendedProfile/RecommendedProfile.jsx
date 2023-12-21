const RecommendedProfile = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-600 pb-4 my-6">
      <div className="flex items-start gap-2">
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/53.jpg"
            alt="user"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <p className="font-bold  ">therock</p>
            <p className="font-thin text-gray-600 -mt-1">Dwayne Johnson</p>
          </div>
          <span className="font-base">2.2M followers</span>
        </div>
      </div>
      <div>
        <button className="bg-transparent border border-gray-600 text-white px-6 py-1 rounded-lg w-full">
          Follow
        </button>
      </div>
    </div>
  );
};
export default RecommendedProfile;
