import { useState } from "react";

import control from "../assets/img/control.png";
import logo from "../assets/img/youth-logo.png";
import chartFill from "../assets/img/Chart_fill.png";
const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          {/* <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1> */}
        </div>
        <ul className="pt-6">
          <li
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-black hover:text-white text-black text-sm items-center gap-x-4 `}
          >
            <img src={chartFill} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              <button>Dashboard</button>
            </span>
          </li>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
        <div className="bg-dark-purple h-129 mt-6">
          <h1>Table</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
