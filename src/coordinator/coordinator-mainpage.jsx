import { useState } from "react";

import control from "../assets/img/control.png";
import logo from "../assets/img/youth-logo.png";
import chartFill from "../assets/img/Chart_fill.png";
const MainPageCoor = () => {
    const [open, setOpen] = useState(true);

    //! to call the pages
    const [showPage, setShowPage] = useState("");
    return(
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
              <button onClick={() => setShowPage("Dashboard")}>
                Attendees
              </button>
            </span>
          </li>
        </ul>
      </div>
      {showPage === "Dashboard" ? (
        <Cattendees />
      ) : null}
    </div>
    );
};

export default MainPageCoor;