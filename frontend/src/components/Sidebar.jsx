import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { LogOut } from "lucide-react";
import { CalendarSearch } from 'lucide-react';
import { HandHelping } from 'lucide-react';
import { User } from 'lucide-react';




const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  console.log(location.pathname);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="w-full h-screen inset-0 z-30 bg-black opacity-70 fixed lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-white text-gray-800 p-4 shadow-md w-64 h-full fixed top-0 transform transition-transform duration-500 ease-in-out z-40 
        ${isOpen ? "translate-x-0 left-0" : "-translate-x-full left-0"} 
        lg:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <X
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-xl text-violet-700 cursor-pointer lg:hidden"
        />
        <h2 className="text-2xl font-bold mb-12 text-violet-700 flex items-center gap-2">
         HandsOn 
        </h2>
        <nav className="h-full flex flex-col pb-24 justify-between">
          <ul className="font-semibold">
            <li className="mb-4">
              <Link
                to="/"
                onClick={toggleSidebar}
                className={`hover:text-violet-700 flex items-center gap-2 p-2 ${
                  location.pathname === "/" ? "text-violet-700 bg-gray-100" : ""
                }`}
              >
                <User/>
                Profile 
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/events"
                onClick={toggleSidebar}
                className={`hover:text-violet-700 flex items-center gap-2 p-2 ${
                  location.pathname === "/events"
                    ? "text-violet-700 bg-gray-100"
                    : ""
                }`}
              >
                <CalendarSearch />
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/help-request"
                onClick={toggleSidebar}
                className={`hover:text-violet-700 flex items-center gap-2 p-2 ${
                  location.pathname === "/help-request"
                    ? "text-violet-700 bg-gray-100"
                    : ""
                }`}
              >
                <HandHelping />
                Help Request
              </Link>
            </li>
          </ul>
          <button onClick={handleLogout} className="flex gap-2 items-center font-semibold hover:text-indigo-700 text-sm">
            <LogOut size={18}/>
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
