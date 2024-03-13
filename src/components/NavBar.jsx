import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { TbSpeakerphone as Notify } from 'react-icons/tb'
import { MdOutlineNotificationsActive as Notify2 } from 'react-icons/md'
import Imgg from '../assets/images/serious-girl (1).jpg'
// import { IoNotificationsOutline as Notify } from "react-icons/io5";

import { FaChevronLeft as Arrow,FaChevronDown as ArrowD } from 'react-icons/fa'


const NavBar = ({ route }) => {
	const userData = useSelector((state) => state.auth.user);
	
	function getCurrentUniYear(startAcademicYear) {
		var yr = new Date().getFullYear() - parseInt(startAcademicYear.split('/')[0], 10) + 1;
		if (startAcademicYear == '2020/2021')
			return yr-2
		return yr-1
	}

	const getName = (name) => {
		return name.split(' ')[0]
	}

    return (
        
		<nav className={`w-full h-[80px] sm:h-[100px] flex justify-between border-b-[1]`}>
			<div className="hidden sm:flex sm:w-[60%] bg-[#f9f9f9] h-full pl-3 justify-start pt-[1.5%] items-center">
				<h1 className="font-bold text-3xl ">{route || 'Dashboard'}</h1>
			</div>
			{/* {JSON.stringify(userData,2)} */}
    		<div className=" flex justify-between px-3 pl-2 gap-2 items-end w-full sm:w-[40%] bg-gray-100 h-full">
    			
	    		<div className="flex items-center gap-3 sm:pb-4 pb-2 select-none text-black">
	    			
	    			{/* Image */}
	    			<Link to="/profile">
	        			<div className="w-14 h-14 border-[2px] border-gray-300 rounded-full bg-gray-400">
			        		<img src={userData?.imgURL || Imgg} className="w-full h-full rounded-full bg-cover object-cover size"/>
			        	</div> 
	        		</Link>

		        	{/* Meta */}
	    			<div className="flex flex-col ">
	    				<div className="text-lg"> Hey,<span className="font-bold capitalize" > {getName(userData.name) || 'User'}</span></div>
	    				<div className="flex font-light items-center gap-1 text-md  text-gray-700">
	    					<div>{userData?.department?.label?.split(' ')[0] || 'Qitt'}</div>
	    					<div className="w-2 h-2 rounded-full bg-gray-800">&nbsp;</div>
	    					<div>{userData.year}00lvl</div>
							{/* <div>{getCurrentUniYear(userData.session)|| 0}00lvl</div> */}
	    				</div>
	    			</div>

	    		</div>  
	    		<Link to="/notice" className="relative sm:mb-5 mb-3">
		    		<Notify2 className="p-1  rounded-md text-black text-[2.4rem] sm:text-[2.8rem]"/>
	    			<span className="rounded-full min-w-3 min-h-3 bg-red-500 absolute -top-1 right-0 text-white text-xs py-[1.5px] px-[5.5px] flex justify-center items-center">2</span>
	    		</Link>
        	</div>

    	</nav>

    );
};


export default NavBar;




{/* Timetable View */}
        			// <div className="w-[35%] h-full bg-white flex flex-col gap-3 px-2">
        	// 			<h2 className="font-semibold text-xl  mt-3 ">Today's Classes</h2>
			    		// <div className="w-full h-full flex flex-col items-center justify-center  ">
			    			
			    			{/* Classes */}
		    				// <div className=" flex flex-col h-full items-start w-full ">
			    				// { courses.map((item,idx) => {
									// return (<div className="flex border-b-2 border-b-gray-100 w-full mt-2 items-center justify-between  px-2"> 
					    					// <p className="w-[40%]"> {item.time}</p>
					    					// <div className={`bg-purple-400  font-black rounded  h-full w-[5px] text-center`}></div>
					    					{/*<div className="flex flex-col w-[40%]">*/}
					    						{/*<p className="font-bold">{item.course}</p>*/}
					    						{/*<p className="font-light truncate">{item.venue}</p>*/}
					    					// </div>
					    				{/*</div>)*/}
					    			// })
								// }
							// </div>

			    		{/*</div>*/}

			    		{/*<div className="w-full h-full max-w rounded-md bg-none my-1 ">*/}
			    			
			    		{/*</div>*/}
        			{/*</div>*/}



