import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { firestore, auth, db } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Attendees = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalWorking, setTotalWorking] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    email: "",
    phone: "",
  });

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
    if (userLoggedIn) {
      const q = query(collection(firestore, "delegates"));

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
  }, [userLoggedIn]);

  useEffect(() => {
    if (userLoggedIn) {
      const q = query(
        collection(firestore, "delegates"),
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
  }, [userLoggedIn]);

  useEffect(() => {
    if (userLoggedIn) {
      const q = query(
        collection(firestore, "delegates"),
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
  }, [userLoggedIn]);

  const [attendees, setAttendees] = useState([]);

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
                  List of Attendees
                </h1>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendees;
