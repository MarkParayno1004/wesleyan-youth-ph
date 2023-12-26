import React, { useState, useEffect } from "react";
import { submitAddDelegate, updateDelegate } from "./coordinator-add-delegate";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { firestore, auth, db } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Cattendees = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDistrict, setUserDistrict] = useState(null);
  const [selectedAttendee, setSelectedAttendee] = useState({});
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalWorking, setTotalWorking] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    email: "",
    phone: "",
    status: "",
  });

  const handleRowClick = (attendee) => {
    setSelectedAttendee(attendee);
    setFormData({
      name: attendee.name || "",
      district: attendee.district || "",
      email: attendee.email || "",
      phone: attendee.phone || "",
      status: attendee.status || "",
      room: attendee.room || "",
    });
    setSelectedRow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    try {
      const attendeeId = selectedAttendee.id;
      await updateDelegate(attendeeId, formData);

      setFormData({
        name: "",
        district: "",
        email: "",
        phone: "",
        status: "",
        room: "",
      });
      setSelectedRow(false);
    } catch (error) {
      console.error("Error editing attendee:", error.message);
    }
  };

  const handleAddDelegate = async () => {
    try {
      await submitAddDelegate(formData);
      setFormData({
        name: "",
        district: "",
        email: "",
        phone: "",
        status: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding coordinator:", error.message);
    }
  };

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);

      if (user) {
        const uid = user.uid;
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("uid", "==", uid));
        const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
          snapshot.forEach((doc) => {
            const userData = doc.data();
            setUserDistrict(userData.district);
          });
        });

        return () => {
          unsubscribeUser();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (userLoggedIn && userDistrict) {
      const q = query(
        collection(firestore, "delegates"),
        where("district", "==", userDistrict)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const delegatesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAttendees(delegatesData);
        setTotalAttendees(delegatesData.length);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userLoggedIn, userDistrict]);

  useEffect(() => {
    if (userLoggedIn && userDistrict) {
      const q = query(
        collection(firestore, "delegates"),
        where("district", "==", userDistrict),
        where("status", "==", "Working")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const delegatesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTotalWorking(delegatesData.length);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userLoggedIn, userDistrict]);

  useEffect(() => {
    if (userLoggedIn && userDistrict) {
      const q = query(
        collection(firestore, "delegates"),
        where("district", "==", userDistrict),
        where("status", "==", "Student")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const delegatesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTotalStudent(delegatesData.length);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userLoggedIn, userDistrict]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (!userLoggedIn) {
    return <p>Please log in to view the data.</p>;
  }
  return (
    <div className="flex">
      <div className="flex">
        <div className="h-screen flex-1 p-7">
          <div className="bg-light-white p-2 mb-2 rounded-lg w-1/5">
            <h1 className="text-white">
              Total Number of Attendees: {totalAttendees}
            </h1>
            <h1 className="text-white">
              Total Number of Working: {totalWorking}
            </h1>
            <h1 className="text-white">
              Total Number of Students: {totalStudent}
            </h1>
          </div>
          <div className="bg-light-white rounded-3xl w-128 h-100 pt-6">
            <div className="flex items-center">
              <div className="flex-none h-10 w-14"></div>
              <div className="grow h-10">
                <h1 className="font-mono font-bold text-center text-white text-2xl">
                  List of Attendees:
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
                          Add Attendees
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
                              Participant's Name:
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
                              defaultValue=""
                            >
                              <option value="" disabled selected>
                                Select a District
                              </option>
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
                              Email:{" "}
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
                          <div className="mb-4">
                            <label
                              htmlFor="status"
                              className="block text-sm font-bold text-gray-700"
                              onChange={handleChange}
                            >
                              Occupational Status:
                            </label>
                            <input
                              type="text"
                              id="status"
                              name="status"
                              placeholder="Student"
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
                          onClick={handleAddDelegate}
                        >
                          Add
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
                    <th className="px-6 py-3">Room Assignment</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">District</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((attendee) => (
                    <tr
                      key={attendee.id}
                      className="hover:bg-light-white hover:text-white text-center cursor-pointer"
                      onClick={() => handleRowClick(attendee)}
                    >
                      <td className="px-6 py-3">{attendee.name}</td>
                      <td className="px-6 py-3">{attendee.room}</td>
                      <td className="px-6 py-3">{attendee.status}</td>
                      <td className="px-6 py-3">{attendee.district}</td>
                      <td className="px-6 py-3">{attendee.email}</td>
                      <td className="px-6 py-3">{attendee.phone}</td>
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
            {selectedRow && (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Edit Attendee</h3>
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
                        {" "}
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-bold text-gray-700"
                          >
                            Participant's Name:
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Juan Dela Cruz"
                            className="mt-1 p-2 w-full border rounded-md"
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
                            value={formData.district}
                          >
                            <option value="" disabled selected>
                              Select a District
                            </option>
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
                            Email:{" "}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@email.com"
                            onChange={handleChange}
                            value={formData.email}
                            className="mt-1 p-2 w-full border rounded-md"
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
                            onChange={handleChange}
                            value={formData.phone}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="status"
                            className="block text-sm font-bold text-gray-700"
                          >
                            Occupational Status:
                          </label>
                          <input
                            type="text"
                            id="status"
                            name="status"
                            placeholder="Student"
                            onChange={handleChange}
                            value={formData.status}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="status"
                            className="block text-sm font-bold text-gray-700"
                          >
                            Room Assignment:
                          </label>
                          <input
                            type="text"
                            id="room"
                            name="room"
                            placeholder="Room No."
                            onChange={handleChange}
                            value={formData.room}
                            className="mt-1 p-2 w-full border rounded-md"
                          />
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
                        onClick={handleEdit}
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

export default Cattendees;
