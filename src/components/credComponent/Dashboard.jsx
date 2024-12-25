import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFormField, addData, resetForm, deleteUserData, editUserData } from '../../features/cred/credFormSlice';

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPreFillData, setEditPreFillData] = useState({});

  const dispatch = useDispatch();
  const displayUsers = useSelector((state) => state.credForm.usersData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (editPreFillData.id) {
      setEditPreFillData((prevData) => ({
        ...prevData,
        [name]: value, // Update the specific field
      }));
    } else {
      dispatch(setFormField({ field: name, value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editPreFillData.id) {
      // Editing existing user
      dispatch(editUserData({ id: editPreFillData.id, fname: editPreFillData.fname, mobile: editPreFillData.mobile, email: editPreFillData.email }));
    } else {
      // Adding new user
      dispatch(addData());
    }

    dispatch(resetForm());
    closeModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteUserData(id))
  }

  const openModal = (user) => {
    setEditPreFillData(user);  // Set the user data for editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Display Data */}
      <table className="border-separate border border-slate-500 ...">
        <thead>
          <tr>
            <th className="border border-slate-600 ...">Name</th>
            <th className="border border-slate-600 ...">Mobile</th>
            <th className="border border-slate-600 ...">Email</th>
            <th className="border border-slate-600 ...">Edit</th>
            <th className="border border-slate-600 ...">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            displayUsers.map((item, i) => {
              return (
                <tr key={'userdata' + i}>
                  {/* {console.log("itemitem", item)} */}
                  <td className="border border-slate-700 ...">{item.fname}</td>
                  <td className="border border-slate-700 ...">{item.mobile}</td>
                  <td className="border border-slate-700 ...">{item.email}</td>
                  <td>
                    <button className='bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded' onClick={() => openModal(item)}>Edit</button>
                  </td>
                  <td>
                    <button className='bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <div className="container">
        <h2>Registration Form</h2>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fname">Full Name:</label>
            <input type="text" id="fname" name="fname" required onChange={handleChange} />
          </div>
          <br />

          {/* Mobile */}
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input type="tel" id="mobile" name="mobile" onChange={handleChange} required />
          </div>
          <br />

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} required />
          </div>
          <br />

          {/* Submit Button */}
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
          <br />
        </form>
      </div>

      {/* Modal for Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4">Edit User Data</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fname">Full Name:</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={handleChange}
                  value={editPreFillData.fname || ''}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number:</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  value={editPreFillData.mobile || ''}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={editPreFillData.email || ''}
                  required
                />
              </div>
              <br />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard