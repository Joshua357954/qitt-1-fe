import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import { addItem, baseUrl, departments, faculties } from '../utils/utils';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import Loader from './Loader';
import { updateUser } from '../features/authSlice2';

const Enroll = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    regNumber: '',
    faculty: null,
    department: null,
    year: '',
    birthday: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { name, uid } = useParams();

  const facultyOptions = faculties;
  const departmentOptions = departments;

  const handleChange = (name, selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmationModal(true);
    }
  };

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const response = await Axios.post(`${baseUrl}/api/auth/enrollUser/${uid}`, formData);
      console.log('API Response:', response.data);
      var _user = response?.data?.user;

      // Check if there is error
      if (response?.data?.error){
        toast(response?.data?.error)
        navigate('/auth')
        return
      }

      // Add user to localstorage
      if (_user.name) {  
        addItem('qitt-user', _user);
        // Send User to home screeen .
        dispatchEvent(updateUser(_user))
        navigate('/')
      }

    } catch (error) {
      console.error('Error submitting form:', error.message);
    } finally {
      setLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const validateForm = () => {
    if (!formData.regNumber || !formData.faculty || !formData.department || !formData.year || !formData.birthday) {
      console.log('Please fill out all required fields');
      toast('Please fill out all required fields',{icon:'🥺'})
      return false;
    }

    // Additional validation for the registration number
    const regNumberPattern =  /^\d{8,}[A-Z]{2}$/i;
    if (!regNumberPattern.test(formData.regNumber)) {
      toast('Invalid registration number. Please enter a valid registration number',{icon:'🥺'})
      console.log('Invalid registration number. Please enter a valid registration number.');
      return false;
    }

    return true;
  };

  return (
    <div className="max-w-lg mx-auto my-8 px-4 sm:px-0 ">
      <Loader open={loading}/>
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-6">
        Hey, <span className="text-purple-600">{name}</span>! 🚀
      </h1>

      <p className="text-gray-700 mb-4">
        Welcome to your academic journey! 🌟 Join our vibrant educational community and start by filling out the form below.
      </p>

      <p className="text-gray-700 mb-4">
        Congratulations on taking this important step! Your enrollment not only impacts your future but enriches our community. 🌈 Dive in and let the learning begin!
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regNumber">
            Registration Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="regNumber"
            type="text"
            placeholder="Enter Registration Number"
            name="regNumber"
            value={formData.regNumber}
            onChange={(e) => handleChange('regNumber', e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faculty">
            Faculty
          </label>
          <Select
            id="faculty"
            name="faculty"
            options={facultyOptions}
            value={formData.faculty}
            onChange={(selectedOption) => handleChange('faculty', selectedOption)}
            placeholder="Select Faculty"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
            Department
          </label>
          <Select
            id="department"
            name="department"
            options={departmentOptions}
            value={formData.department}
            onChange={(selectedOption) => handleChange('department', selectedOption)}
            placeholder="Select Department"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
            Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="year"
            type="number"
            placeholder="Enter Year"
            name="year"
            min={1}
            max={6}
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthday">
            Birthday
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="birthday"
            type="date"
            placeholder="Select Birthday"
            name="birthday"
            value={formData.birthday}
            onChange={(e) => handleChange('birthday', e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : '✨ Join the Ride'}
          </button>
        </div>
      </form>

      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.6)]">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Enrollment</h2>
            <p className="mb-4">Please review your information before confirming:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Registration Number: <strong>{formData.regNumber}</strong></li>
              <li>Faculty: <strong>{formData.faculty.label}</strong></li>
              <li>Department: <strong>{formData.department.label}</strong></li>
              <li>Year: <strong>{formData.year}</strong></li>
              <li>Birthday: <strong>{formData.birthday}</strong></li>

            </ul>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                onClick={() => confirmSubmission()}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel    
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default Enroll;
