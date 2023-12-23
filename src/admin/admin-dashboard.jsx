import React, { useState, useEffect } from "react";
import { submitAddCoor } from "./admin-add-coor";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
const Dashboard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // Adjust as needed

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    email: "",
    phone: "",
  });

  const [coordinators, setCoordinators] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coordinators.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddCoordinator = async () => {
    try {
      await submitAddCoor(formData);
      setFormData({
        name: "",
        district: "",
        email: "",
        phone: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding coordinator:", error.message);
    }
  };

  useEffect(() => {
    const q = query(
      collection(firestore, "users"),
      where("role", "==", "coordinator")
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const coordinatorsData = querySnapshot.docs.map((doc) => doc.data());
      setCoordinators(coordinatorsData);
    });

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="flex">
      <div className="flex">
        <div className="h-screen flex-1 p-7">
          <div className="bg-light-white rounded-3xl w-128 h-100 pt-6">
            <div className="flex items-center">
              <div className="flex-none h-10 w-14"></div>
              <div className="grow h-10">
                <h1 className="font-mono font-bold text-center text-white text-2xl">
                  District Coordinator
                </h1>
              </div>
              <div className="flex-none h-10 w-25">
                <button
                  className="mr-20 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModal(true)}
                >
                  Add User
                </button>
              </div>
              {showModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add Coordinator
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        <form action="POST">
                          <div className="mb-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-bold text-gray-700"
                            >
                              Name:
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Juan Dela Cruz"
                              className="mt-1 p-2 w-full border rounded-md"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="district"
                              className="block text-sm font-bold text-gray-700"
                            >
                              District:
                            </label>
                            <select
                              id="district"
                              name="district"
                              className="mt-1 p-2 w-full border rounded-md"
                              onChange={handleChange}
                            >
                              <option value="SSKLD">SSKLD</option>
                              <option value="NELD">NELD</option>
                              <option value="MD">MD</option>
                              <option value="BPD">BPD</option>
                              <option value="PD">PD</option>
                              <option value="ENCD">ENCD</option>
                              <option value="NCPD">NCPD</option>
                              <option value="NSKLD">NSKLD</option>
                              <option value="CLD">CLD</option>
                              <option value="NWLD">NWLD</option>
                              <option value="CPLD">CPLD</option>
                              <option value="WNCD">WNCD</option>
                              <option value="NLD">NLD</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-bold text-gray-700"
                            >
                              Email:
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="name@email.com"
                              className="mt-1 p-2 w-full border rounded-md"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-bold text-gray-700"
                            >
                              Contact Number:
                            </label>
                            <input
                              type="number"
                              id="phone"
                              name="phone"
                              placeholder="0123456789"
                              className="mt-1 p-2 w-full border rounded-md"
                              onChange={handleChange}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleAddCoordinator}
                        >
                          Add Coordinator
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-dark-purple rounded-xl h-90 m-8 mt-6">
              <table className="w-full text-lg rtl:text-right table-fixed">
                <thead>
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">District</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((coordinator) => (
                    <tr
                      key={coordinator.uid}
                      className="hover:bg-light-white hover:text-white text-center"
                      onClick={() => setSelectedRow(true)}
                    >
                      <td className="px-6 py-3">{coordinator.name}</td>
                      <td className="px-6 py-3">{coordinator.district}</td>
                      <td className="px-6 py-3">{coordinator.email}</td>
                      <td className="px-6 py-3">{coordinator.phone}</td>
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
                    disabled={indexOfLastItem >= coordinators.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            {selectedRow && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Edit Coordinator
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setSelectedRow(false)}
                      >
                        <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form action="POST">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-bold text-gray-700">Coorinator's Name:</label>
                          <input type="text" id="name" name="name" placeholder="Juan Dela Cruz" className="mt-1 p-2 w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="district"
                            className="block text-sm font-bold text-gray-700"
                          >
                            District:
                          </label>
                          <select
                            id="district"
                            name="district"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={handleChange}
                          >
                            <option value="SSKLD">SSKLD</option>
                            <option value="NELD">NELD</option>
                            <option value="MD">MD</option>
                            <option value="BPD">BPD</option>
                            <option value="PD">PD</option>
                            <option value="ENCD">ENCD</option>
                            <option value="NCPD">NCPD</option>
                            <option value="NSKLD">NSKLD</option>
                            <option value="CLD">CLD</option>
                            <option value="NWLD">NWLD</option>
                            <option value="CPLD">CPLD</option>
                            <option value="WNCD">WNCD</option>
                            <option value="NLD">NLD</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email: </label>
                          <input type="email" id="email" name="email" placeholder="name@email.com" className="mt-1 p-2 w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="phone" className="block text-sm font-bold text-gray-700">Contact Number:</label>
                          <input type="number" id="phone" name="phone" placeholder="0123456789" className="mt-1 p-2 w-full border rounded-md" />
                        </div>
                      </form>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setSelectedRow(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setSelectedRow(false)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
