import React, { useState } from 'react'
import SideBar from '../components/Layout/SideBar'
import MenuBar from '../components/Layout/MenuBar';

const DashBoard = ({ children }) => {
  const [active, setActive] = useState(1);
  const [isSidebarVisible, setSidebarVisible] = useState(true);


  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <div className="flex bg-[#E0DDDD] h-screen">

        <SideBar active={active} setActive={setActive} isSidebarVisible={isSidebarVisible} />

        <div className="flex flex-col w-full">
          <MenuBar onToggleSidebar={toggleSidebar} active={active} setActive={setActive} />

          <div className="bg-white  mx-2 rounded-lg mt-7  overflow-auto dashboard" onClick={() => setSidebarVisible(true)}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard
