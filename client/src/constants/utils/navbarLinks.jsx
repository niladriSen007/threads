// Desc: Navbar links for the navbar component
import { HiMiniHome } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
export const navbarlinks = [
    {
        id:1,
        element: <HiMiniHome size={32} />,
        link: "/",
    },
    {
        id:2,
        element: <FaSearch size={28} />,
        link: "/search",
    },
    {
        id:3,
        element: <FaEdit size={28} />,
        link: "/create",
    },
    {
        id:4,
        element: <FaHeart size={28} />,
        link: "/activity",
    },
    {
        id:5,
        element: <FaUser size={28} />,
        link: "/profile",
    },      
    ]