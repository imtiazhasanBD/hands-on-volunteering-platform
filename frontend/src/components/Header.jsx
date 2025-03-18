import React from "react";
import { CircleUser, Bell } from "lucide-react"; 
import { useLocation } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  const pageTitles = {
    "/": "Welcome to HandsOn – A Community-Driven Social Volunteering Platform",
    "/events": "Discover & Join Volunteer Events",
    "/help-request": "Community Help Requests",
  };

  const currentTitle = pageTitles[location.pathname];

  return (
  <div className="fixed inset-0 lg:left-64 h-24">
          <div className="w-full md:py-6 p-4 md:px-10 bg-white border-b flex justify-between items-center text-gray-600 shadow-sm">
        {/* Title Section */}
      <div className="flex gap-2 items-center">
        {/* Toggle Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 p-2"
        >
          ☰
        </button>
        <p className="text-xl font-semibold capitalize hidden md:block">{currentTitle}</p>
      </div>

      {/* Notification and User Icons */}
      <div className="flex gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={24} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <CircleUser size={24} className="text-gray-600" />
        </button>
      </div>
    </div>
  </div>
  );
};

export default Header;
