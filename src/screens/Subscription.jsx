import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal/Modal'; // Ensure correct import path
import Loader from "../components/loader"; // Ensure correct import path
import { useEffect } from 'react';
import { initiatePlan } from '@/store/action/userAppStorage';


const CreatePlan = () => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('monthly');
  const [amount, setAmount] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector(state => state.userAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  



  // Assuming the user is redirected back to your site after completing the payment
const urlParams = new URLSearchParams(window.location.search);
const reference = urlParams.get('reference');






useEffect(()=>{
    checkUserIsBack()
})

let checkUserIsBack = async()=>{
    if (reference) {
        // Call your backend to verify the payment
        fetch(`/verify-payment/${reference}`)
           .then(response => response.json())
           .then(data => {
              if (data.status === 'success') {
                 alert('Payment was successful!');
              } else {
                 alert('Payment verification failed.');
              }
           })
           .catch(error => {
              console.error('Error:', error);
           });
     } else {
        console.log('No reference found in the URL.');
     }}




  useEffect(() => {
    if (!user) {
        navigate('/login'); 
    }
}, [user, navigate]);


  const { id } = useParams(); 


  useEffect(() => {
    if (!user) {
        return navigate('/login'); // Redirect to login page if user is not found
    }
    setName(id)
}, [user, navigate]);



  const handleSubmit = async(e) => {
    e.preventDefault();

    setIsLoading(true);
    // Mock submitting the form, you would call your Redux action or API here
    let response = await dispatch(initiatePlan({
        email:'arierhiprecious@gmail.com',
        plan:'PLN_eoadawpomssgue7',
       
    }))

    if (!response.bool) {
        setIsLoading(false)
        setIsError(true)
        setIsErrorInfo(response.message)
        return
    }
  };






  return (
    <>
      {isLoading && <Loader />} {/* Loader Component */}
      {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />} {/* Modal for Error */}
      <div className="mt-20 flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`w-64 min-h-screen bg-blue-800 text-white ${sidebarOpen ? 'block' : 'hidden'} sm:block`}>
          <div className="flex justify-between items-center p-6 border-b border-blue-900">
            <h4 className="text-xl font-semibold text-center">Dashboard</h4>
            <button
              className="text-white sm:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6">
            <button
              onClick={() => navigate('/pricing')}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Pricing Plans
            </button>
            <button
              onClick={() => navigate('/cvs')}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              My CVs
            </button>
            <button
              onClick={() => navigate('/ai')}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Create with AI
            </button>
            <button
              onClick={() => navigate('/template')}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Templates
            </button>
            <button
              onClick={() => navigate('/profilesetting')}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Profile Settings
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Pricing Plans
            </button>
            <button
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Logout
            </button>
          </nav>
        </div>

        <div className="flex-1 p-3 pt-0">
          <div className="flex justify-between items-center mb-6 bg-white shadow-lg p-4">
            <div className="flex items-center space-x-6" style={{ width: '100%', padding: '15px' }}>
              <h2 className="text-2xl font-extrabold text-blue-600">Create New Subscription Plan</h2>
            </div>
            <button
              className="sm:hidden text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>

          <div className="content">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Plan Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter the plan name"
                  required
                />
              </div>

             

              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-600">Amount to Charge</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter the amount"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlan;


