import { BsThreads } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { navbarlinks } from "../../constants/utils/navbarLinks";
import { useState } from "react";
import { useThreadContext } from "../../store/ThreadContext";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { currentUser, showMenu, setShowMenu, setCurrentUser } =
    useThreadContext();

  const redirect = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      setCurrentUser(null);
      setShowMenu(false);
      redirect("/signin");
      toast.success("Logged out successfully");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 ">
          <div>
            <h1 className="text-white font-bold">
              <BsThreads size={32} />
            </h1>
          </div>
          <div className="flex ">
            {/* Add your navigation links here */}
            <div className="flex-shrink-0 flex items-center gap-16">
              {navbarlinks?.map((navbarLink) => (
                <Link
                  to={navbarLink.link}
                  className={`link ${
                    selectedIndex === navbarLink?.id ? "text-white" : ""
                  }`}
                  key={navbarLink.id}
                  onClick={() => setSelectedIndex(navbarLink?.id)}
                >
                  {navbarLink.element}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center ">
            <RxHamburgerMenu
              color="#fff"
              size={26}
              className="cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute flex items-center justify-center flex-col top-14 right-96  z-50  rounded-lg bg-transparent border border-gray-500 backdrop-blur-lg">
                {currentUser ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 bg-transparent border border-gray-400 p-2 rounded-lg">
                    <Link to={"/signup"} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Sign up
                    </Link>
                    <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg" to={"/signin"}>
                      Sign in
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
