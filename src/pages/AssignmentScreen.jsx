import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import { PiImageSquareFill as Img } from 'react-icons/pi'
import { TbSquareRoundedNumber0Filled as Zero,TbSquareRoundedNumber1Filled as One,TbSquareRoundedNumber2Filled as Two,TbSquareRoundedNumber3Filled as Three,TbSquareRoundedNumber4Filled as Four,TbSquareRoundedNumber5Filled as Five,TbSquareRoundedNumber6Filled as Six,TbSquareRoundedNumber7Filled as Seven,TbSquareRoundedNumber8Filled as Eight,TbSquareRoundedNumber9Filled as Nine } from 'react-icons/tb'
import { CgFileDocument as Doc } from 'react-icons/cg'
import PageNav from '../components/PageNav.jsx'
import { FaChevronLeft as ArrowL } from 'react-icons/fa'
import MainLayout from '../components/MainLayout.jsx'
import Assignment from '../assets/images/assignment-svgrepo-com.svg'
import { BsImage, BsChevronLeft as Arrow  } from 'react-icons/bs'
import { baseUrl, convertToTime, fDate, fbTime, getDay, isDateInPast } from '../utils/utils.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignments } from '../features/userSlice.js';

 
const AssignmentScreen = ({ className }) => {

	const data1 = [{color:'red'},{color:'orange'},{color:'yellow'},{color:'green'},{color:'blue'},{color:'indigo'},{color:'violet'}]
	const dispatch = useDispatch()
	const { assignments } = useSelector((state)=> state.users)
	const userData = useSelector((state) => state.auth.user)

	const num = {
		'0': <Zero className="text-blue-500 text-xl" />,
		'1': <One className="text-blue-500 text-xl" />,
		'2': <Two className="text-blue-500 text-xl" />,
		'3': <Three className="text-blue-500 text-xl" />,
		'4': <Four className="text-blue-500 text-xl" />,
		'5': <Five className="text-blue-500 text-xl" />,
		'6': <Six className="text-blue-500 text-xl" />,
		'7': <Seven className="text-blue-500 text-xl" />,
		'8': <Eight className="text-blue-500 text-xl" />,
		'9': <Nine className="text-blue-500 text-xl" />,
	  };
	//   const [assignments, setAssignments] = useState([]);
	  const department = userData.department.value;
	  const year = userData.year;
	
	  useEffect(() => {
		const fetchAssignments = async () => {
		  try {
			const response = await axios.get(`${baseUrl}/api/assignments/${department}/${year}`);
			// console.log(response.data)
			dispatch(addAssignments((response.data)))

		  } catch (error) {
			console.error('Error getting assignments:', error.message);
		  }
		};
	
		fetchAssignments();
	  }, [department, year]);
	
	
	function realDate (date) {
		const time = getDay(fbTime(date).getDate())
		//  fbTime(date.dateGiven).getDate()
		const formattedMonth = fbTime(date).toLocaleDateString('en-US', { month: 'long' });
		const formattedWeekday = fbTime(date).toLocaleDateString('en-US', { weekday: 'long' });

		return `${formattedWeekday} ${formattedMonth} ${time}`
	}  
 
	return (
		<MainLayout route="Assignment">
		<div className="w-full pt-3 min-h-full overflow-y-auto">
			{assignments.length === 0 ? (
				<div className="w-full text-center mt-4 text-gray-600">
				✨ Feel free to add or update assignment information. Your contributions are valuable!
				<br />
				For assistance or inquiries, you can send a message to this number 📱.<br/>
				<a href="https://api.whatsapp.com/send?phone=+2349034954069&text=I%20want%20to%20add/update%20the%20assignment" target="_blank" className="text-blue-500">Click here to chat on WhatsApp 🚀</a>
				</div>
			  
			  
			) : (
			assignments.map((item, idx) => {
				const color = data1[idx].color;
				return (
				<div key={idx} className={`w-full mb-2 bg-white min-h-32 pb-1 flex items-center rounded`}>
					<div className={`relative w-[35%] h-32 bg-gray-100 flex justify-center items-center rounded-tl rounded-bl`}>
					<img src={Assignment} className='w-24' alt="Assignment Icon" />
					</div>

					<div className="w-[65%] h-full flex flex-col px-3 pt-2 gap-y-1">
					<h2 to="/assignment/physics" className="text-2xl font-extrabold text-gray-700 space-x-5">{item?.subject}</h2>
					<p className="font-light flex gap-x-2 items-center justify-center py-1 rounded-xl w-32">{num[item.numAssignments]}Assignment{item.numAssignments > 1 ? "s" : ""}</p>

					<div className="flex gap-1 flex-wrap">
						{item.assignments.map((dateItem, dateIdx) => (
						<Link
							key={dateIdx}
							to={`/assignment/${item.subject}/${realDate(dateItem.dateGiven)}/${realDate(dateItem.deadline)}/${dateItem.content}`}
							className={`text-black hover:text-gray-700 text-sm sm:text-md px-2 py-1 gap-x-1 ${
								isDateInPast(realDate(dateItem.deadline).split(' ').slice(-2).join(' ').split('th')[0]) ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-100 hover:bg-blue-200'
							  } text-medium flex items-center rounded`}>
							
							<Doc />
							{realDate(dateItem.dateGiven).split(' ').slice(-2).join(' ')}
							{console.log(isDateInPast(realDate(dateItem.deadline).split(' ').slice(-2).join(' ').split('th')[0]))}
						</Link>
						))}
					</div>
					</div>
				</div>
				);
			})
			)}
		</div>
		</MainLayout>

    );
};


export default AssignmentScreen;
