import { BsThreads } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { navbarlinks } from "../../constants/utils/navbarLinks";
import { useState } from "react";
const Navbar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <nav className="bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center">
            <RxHamburgerMenu
              color="#fff"
              size={26}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
