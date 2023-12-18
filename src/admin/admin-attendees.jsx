import { useState } from "react";

import control from "../assets/img/control.png";
import logo from "../assets/img/youth-logo.png";
import chartFill from "../assets/img/Chart_fill.png";
const Attendees = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Attendees", src: "Chart_fill"},
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
          <li
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-black hover:text-white text-black text-sm items-center gap-x-4 `}
          >
            <img src={chartFill} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              <button>Attendees</button>
            </span>
          </li>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <div className="bg-light-white p-2 mb-2 rounded-lg w-1/5">
          <h1 className="text-white">Total Number of Attendees: </h1>
        </div>
        <div className="bg-light-white rounded-3xl h-129 pt-6">
          <div className="flex items-center">
            <div className="flex-none h-10 w-14"></div>
            <div className="grow h-10">
              <h1 className="font-mono font-bold text-center text-white text-2xl">List of Attendees</h1>
            </div>
          </div>
          <div className="bg-dark-purple rounded-xl h-120 m-8 mt-6">
            <table className="w-full text-lg rtl:text-right table-fixed">
              <thead>
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">District</th>
                  <th className="px-6 py-3">Room Assignment</th>
                  <th className="px-6 py-3">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr>
                <tr className="hover:bg-light-white hover:text-white text-center">
                  <td className="px-6 py-3">daniel</td>
                  <td className="px-6 py-3">cainta</td>
                  <td className="px-6 py-3">daniel@gmail.com</td>
                  <td className="px-6 py-3">0912345678</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendees;
