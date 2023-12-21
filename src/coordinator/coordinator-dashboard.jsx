import React from "react";

const Cattendees = () => {
    const [showModal, setShowModal] = React.useState(false);
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
                List of Attendees:
              </h1>
            </div>
            <div className="flex-none h-10 w-25">
              <button className="mr-20 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(true)}>Add User</button>
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
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700">Participant's Name:</label>
                        <input type="text" id="name" name="name" placeholder="Juan Dela Cruz" className="mt-1 p-2 w-full border rounded-md" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="district" className="block text-sm font-bold text-gray-700">District:</label>
                        <input type="text" id="district" name="district" placeholder="Manila" className="mt-1 p-2 w-full border rounded-md" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email: </label>
                        <input type="email" id="email" name="email" placeholder="name@email.com" className="mt-1 p-2 w-full border rounded-md" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700">Contact Number:</label>
                        <input type="number" id="phone" name="phone" placeholder="0123456789" className="mt-1 p-2 w-full border rounded-md" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-bold text-gray-700">Occupational Status:</label>
                        <input type="text" id="status" name="status" placeholder="single" className="mt-1 p-2 w-full border rounded-md" />
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
                        onClick={() => setShowModal(false)}
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
                    <th className="px-6 py-3">District</th>
                    <th className="px-6 py-3">Email</th>
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
    </div>
  );
};

export default Cattendees;