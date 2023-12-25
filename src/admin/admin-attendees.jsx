import React, { useState } from "react";

const Attendees = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // Adjust as needed

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    email: "",
    phone: "",
  });

  const [attendees, setAttendees] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex">
      <div className="flex">
        <div className="h-screen flex-1 p-7">
          <div className="bg-light-white p-2 mb-2 rounded-lg w-1/5">
            <h1 className="text-white">Total Number of Attendees: </h1>
          </div>
          <div className="bg-light-white rounded-3xl w-128 h-100 pt-6">
            <div className="flex items-center">
              <div className="flex-none h-10 w-14"></div>
              <div className="grow h-10">
                <h1 className="font-mono font-bold text-center text-white text-2xl">
                  List of Attendees
                </h1>
              </div>
            </div>
            <div className="bg-dark-purple rounded-xl h-90 m-8 mt-6">
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
                  {currentItems.map((attendees) => (
                    <tr
                      key={attendees.id}
                      className="hover:bg-light-white hover:text-white text-center cursor-pointer"
                    >
                      <td className="px-6 py-3">{attendees.name}</td>
                      <td className="px-6 py-3">{attendees.district}</td>
                      <td className="px-6 py-3">{attendees.email}</td>
                      <td className="px-6 py-3">{attendees.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end p-6">
                <div className="text-white">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= attendees.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendees;
