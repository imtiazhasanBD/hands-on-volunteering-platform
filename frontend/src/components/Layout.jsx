import { useState, React } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";


const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
console.log(isOpen);

  return (
    <div className="flex bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <div className="flex flex-col w-full lg:ml-64">
        <Header toggleSidebar={toggleSidebar}/>
        <main className="flex-1 p-2 md:p-6 mt-20 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
