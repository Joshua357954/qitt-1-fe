

// const excos = [
//     {name:"Divine Amafor",title:"Coures Representative"},
//     {name:"Joy-Cliff Chinazaekpere",title:"Assistant Coures Representative"},
//     {name:"Phildora Clerkson",title:"Treasurer"},
//     {name:"Monalisa",title:"Director of Socials"},
//     {name:"Wallcot",title:"Director of Sports"},
//     {name:"Tamar",title:"Director of Welfare"},
//     {name:"Pheobe",title:"Director of Information"},
// ]


// useEffect(() => {
// 	const fetchData = async () => {
// 		try {
// 		const response = await axios.get(`${baseUrl}/api/timetable/${dept}/${year}/${currentDay}`);
// 		console.log(response.data)
// 		setTimetableData(response.data);
// 		} catch (error) {
// 		console.error('Error fetching timetable data:', error);
// 		}
// 	};

// 	fetchData();
// 	}, [baseUrl, dept, year]);


	// const daysClases = [
	// 	{ 'monday': [ {time:"8:00am - 10:00am",color:'bg-green-400',course:"MTH 124",venue:"MBA 1"},
	// 		{time:"10:00am - 12:00pm",color:'bg-orange-400',course:"STA 160",venue:"Maths Hall"},
	// 		{time:"3:00pm - 5:00pm",color:'bg-yellow-400',course:"PHY 112",venue:"MBA 1"},
	// 	 ] },

	// 	{ 'tuesday': [ {time:"9:00am - 10:00am",color:'bg-green-400',course:"CSC 183",venue:"CSC Hall 2"},
	// 			{time:"4:00pm - 5:00pm",color:'bg-orange-400',course:"MTH 114",venue:"MBA 1"},
	// 	] },

	// 	{ 'wednesday': [{time:"9:00am - 11:00am",color:'bg-green-400',course:"GES 101",venue:"MBA 1"},
	// 			{time:"11:00am - 1:30pm",color:'bg-orange-400',course:"Physcis 103",venue:"Physics Lab"},
	// 			{time:"12:00pm - 1:00pm",color:'bg-yellow-400',course:"STA 160",venue:"Maths Hall"}, 
	// 			{time:"3:00pm - 4:00pm",color:'bg-red-400',course:"CSC 183",venue:"Maths Hall"}, 
	// 	 ] },


	// 	{ 'thursday': [{time:"9:00am - 11:00am",color:'bg-green-400',course:"MTH 114",venue:"MBA 1"},
	// 			{time:"10:00am - 11:00am",color:'bg-orange-400',course:"STA 190",venue:"Maths Lab @Annex 2"}, 
	// 			{time:"9:00am - 11:00am",color:'bg-yellow-400',course:"GES 103",venue:"Tetfund 7 in 1"},
	// 			{time:"2:00pm - 4:00pm",color:'bg-red-400',course:"CSC 182",venue:"CSC Hall 2"},  
	// 	  ] },

	// 	{ 'friday': [ {time:"8:00am - 9:00am",color:'bg-green-400',course:"CSC 182",venue:"CSC Hall 2"},
	// 			{time:"10:00am - 11:00am",color:'bg-orange-400',course:"PHY 112",venue:"MBA 1"}, 
	// 			{time:"3:00pm - 5:00pm",color:'bg-yellow-400',course:"MTH 124",venue:"MBA 2"}, 
	// 	  ] },
	// ]


	import React, { useState, useEffect } from 'react';
	import { Link } from 'react-router-dom';
	import { FaChevronRight as Arrow, FaEye, FaEyeSlash } from 'react-icons/fa';
	import { BsChat as Chat, BsChevronRight } from 'react-icons/bs';
	import { FcGoogle as Google } from 'react-icons/fc';
	import toast, { Toaster } from 'react-hot-toast';
	import { useDispatch, useSelector } from 'react-redux';
	import { baseUrl ,getItem, addItem} from '../utils/utils.js';
	import Loader from './Loader.jsx';
	import { useNavigate } from "react-router-dom";
	import { registerUser, loginUser } from '../features/authSlice';
	
	const TextInput = ({ name, value, onChange, isValid }) => {
	  return (
		<div className="flex flex-col w-full">
		  <label className="font-light text-gray-600">{name}</label>
		  <input
			type={name.toLowerCase().includes('email') ? 'email' : 'text'}
			className={`focus:outline-gray-400 rounded-md focus:border-gray-500 py-2 px-1 text-xl font-black ${
			  isValid ? '' : 'border-red-500'
			}`}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		  />
		  {!isValid && <p className="text-red-500 text-sm">Please enter a valid {name.toLowerCase()}</p>}
		</div>
	  );
	};
	
	const Password = ({ name, value, onChange }) => {
	  const [showPassword, setShowPassword] = useState(false);
	
	  return (
		<div className="flex flex-col w-full">
		  <div className="flex justify-between items-center">
			<label className="font-light text-gray-600">{name}</label>
			<p className="text-sm text-blue-800">Forgotten Password ?</p>
		  </div>
		  <div className="relative">
			<input
			  type={showPassword ? 'text' : 'password'}
			  className="focus:outline-gray-400 rounded-md focus:border-gray-500 py-2 px-1 text-xl font-black"
			  value={value}
			  onChange={(e) => onChange(e.target.value)}
			/>
			<span
			  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
			  onClick={() => setShowPassword(!showPassword)}
			>
			  {showPassword ? <FaEyeSlash /> : <FaEye />}
			</span>
		  </div>
		</div>
	  );
	};
	
	const AuthScreen = () => {
	  const dispatch = useDispatch();
	  const [email, setEmail] = useState('');
	  const [password, setPassword] = useState('');
	  const [isLogin, setIsLogin] = useState(true);
	  const [regNumber, setRegNumber] = useState('');
	
	  const redirect = useNavigate()
	  const [isValidEmail, setIsValidEmail] = useState(true);
	  const [isValidRegNumber, setIsValidRegNumber] = useState(true);
	  const [isValidPassword, setIsValidPassword] = useState(true);
	
	  const userData = useSelector((state) => state.user);
	
	  useEffect(() => {
		setIsValidEmail(/^\S+@\S+\.\S+$/.test(email));
		setIsValidRegNumber(isLogin || /^\d{8,}[A-Z]{2}$/i.test(regNumber));
		setIsValidPassword(password.length >= 5); // Minimum length of 5 characters for the password
	  }, [email, regNumber, password, isLogin]);
	
	  const isSubmitDisabled = !isValidEmail || !isValidRegNumber || !isValidPassword;
	
	  const register = async () => {
		try {
		  if (isLogin) {
			const loginData = await dispatch(loginUser({ regNumberOrEmail: regNumber, password }));
			toast.success(loginData.payload.message, {
			  duration: 5000,
			});
		   
			if (loginData.payload.status){ 
			  console.log(loginData)
			  addItem('Qitt-Auth',loginData.payload)
			  redirect('/')
			}
		  } else {
			const regData = await dispatch(registerUser({ regNumber, email, password }));
			toast.success(regData.payload.message, {
			  duration: 5000,
			});
		  }
		} catch (error) {
		  if (error.response && error.response.data) {
			console.error('Authentication error:', error.response.data);
			toast.error(`😔 Authentication failed, ${error.response.data.message}`);
		  } else {
			console.error('Authentication error:', error.message);
			toast.error('😔 Authentication failed. Please try again.');
		  }
		}
	  };
	
	  const toggleLogin = () => {
		setIsLogin(!isLogin);
	  };
	
	  return (
		<form className="relative w-full h-screen justify-center items-center ">
		  <Loader open={userData?.status === 'loading'} />
		  <div className="backdrop-filter-sm mx-auto px-5 py-4 w-full sm:w-[60%] h-full bg-gray-100 flex flex-col items-center">
			<div className="w-full flex flex-col justify-center items-start pt-5 gap-5">
			  <h1 className="text-5xl font-extrabold text-[#6962AD]">Qitt</h1>
			  <div className="flex flex-col ">
				<p className="font-semibold text-xl ">Welcome back to Qitt</p>
				<p className="flex ">
				  {!isLogin ? 'Already have an account ' : 'New Here? '},{' '}
				  <a onClick={toggleLogin} className="underline mx-2">
					{!isLogin ? 'Login Now !' : ' Create an account'}
				  </a>
				</p>
			  </div>
			</div>
	
			<div className="w-full  pt-10 flex flex-col gap-y-5">
			  <TextInput name={`Reg Number ${isLogin ? '/ Email' : ''}`} value={regNumber} onChange={setRegNumber} isValid={isValidRegNumber} />
			  {isLogin ? '' : <TextInput name="Email" value={email} onChange={setEmail} isValid={isValidEmail} />}
			  <Password name={`${isLogin ? '' : 'Choose '}Password 🔐`} value={password} onChange={setPassword} />
			</div>
	
			<div className="w-full flex flex-col items-center text-white justify-center pt-6 gap-4">
			  <Link
				onClick={register}
				className={`w-full flex rounded-[4px] text-gray-50 active:text-gray-50 hover:text-gray-100 justify-center gap-2 font-bold items-center py-4 hover:bg- bg-[#6C22A6] ${
				  isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''
				}`}
				disabled={isLogin ? false : isSubmitDisabled}
			  >
				{isLogin ? 'Login' : 'Register'} <Arrow className="font-bold" />
			  </Link>
	
			  {isLogin ? (
				<Link
				  className="w-full  flex rounded-[4px] text-gray-800 active:text-gray-800 hover:text-gray-900 justify-center gap-3 font-bold items-center py-4 hover:bg-  border-2 border-[#6962AD]"
				>
				  <Google className="text-2xl" /> Sign In with Google
				</Link>
			  ) : (
				''
			  )}
			</div>
	
			{/* <p className="my-3">
			  With 😍{' '}
			  <Link to="/" className="underline focus:text-black text-black hover:text-black">
				<b>Qitt HQ</b>
			  </Link>{' '}
			</p> */}
	
			<p class="text-center mt-3 text-gray-600 underline-offset-2 underline hover:opacity-80">
			  Fully available for <b>CSC Year 2</b>. Stay tuned for the rollout to everyone! ⌛</p>
			</div>
		  <Toaster />
		</form>
	  );
	};
	
	export default AuthScreen;
	
	
	
	
	
	
	
	
	
	







