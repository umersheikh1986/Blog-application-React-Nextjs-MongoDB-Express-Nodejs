import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { SlideTabsExample } from "./sidetabs";
// import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function Header() {
  // const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/signout", {
        withCredentials: true,
      });
      const data = res.data;
      if (!res.status === 200 || !res.status === 201) {
        console.log("data-error", data.message);
      } else {
        dispatch(signOutSuccess());
        // document.cookie("bookId=; expires=Thu, 01 Jan 1970 00:00:00 UTC");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          {`Umer's `}
        </span>
        Blog
      </Link>

      <form
        onSubmit={handleSubmit}
        className=" border-2 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
      >
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={RiSearchLine}
          value={searchTerm}
          className="hidden text-black font-bold lg:inline"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 text-black lg:hidden" pill>
        <RiSearchLine />
      </Button>
      <div className="flex gap-2 md:order-2   ">
        <div className="border-2 p-1.2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
          <Button
            className="w-12 h-10 hidden   sm:inline"
            color="border-2 p-1.2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? (
              <FaSun className="text-white w-4" />
            ) : (
              <FaMoon className="text-white w-4 " />
            )}
          </Button>
        </div>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <div className="relative p-1.5 bg-white rounded-full">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full  z-0"></div>

              {/* Content */}
              <div className="relative z-10   rounded-full">
                {theme === "dark" ? (
                  <Button
                    className="p-1.2 border-2   bg-red-500 text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white rounded-full"
                    pill
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    className="p-1.2 border-2 border-transparent bg-white text-black hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white rounded-full"
                    pill
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <SlideTabsExample />
    </Navbar>
  );
}
