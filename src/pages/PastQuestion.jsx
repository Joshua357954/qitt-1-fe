import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageNav from '../components/PageNav.jsx';
import MainLayout from '../components/MainLayout.jsx'
import { FaChevronRight as Arrow } from 'react-icons/fa';

const PastQuestion = ({ className }) => {
	
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const dataParam = queryParams.get('q');
	const [selection,setSelection] = useState(dataParam ? 'practice' : 'courses')

	const [course,setCourse] = useState('ges101')
	const [time,setTime] = useState(10)
	const [numberOfQuestions,setNumberOfQuestions] = useState(10)

	const cours = [0]
	
    return (
       <MainLayout route="Past Q/A">
        	<section className="w-full h-full overflow-y-auto">

        	<div className="w-full h-20  mt-5 px-2 ">
        		<div className="w-[70%] sm:w-[40%] bg-purple-50 h-[80%] px-[4px] rounded  py-1 ">
	        		<div className="flex items-center text-center rounded w-full  h-full ">
	        			<div onClick={() => setSelection('courses')} className={`w-[48%] rounded h-full text-lg sm:text-lg text-gray-900 ${selection == 'courses' ? 'font-bold bg-purple-400' : ''} flex items-center justify-center`}>Study</div>
	        			<div className="w-2 bg-gray-200 h-full rounded"></div>
	        			<div onClick={() => setSelection('practice')} className={`w-[48%] rounded h-full text-lg sm:text-lg text-gray-900 ${selection == 'practice' ? 'font-bold bg-purple-400' : ''} flex items-center justify-center`}>Practice</div>
	        		</div>
        		</div>
        	</div>

			
			{selection == 'courses' ? 
    			<section className="w-full pt-4 bg-gray-40 overflow-y-auto">
    			
        			{ cours.map((item,idx) => {
        				return <div key={idx} className="pb-2 flex items-center gap-x-4 px-2">
		        				<div className="w-14 h-14 rounded-xl full  bg-purple-200"></div>
		        				<div className="flex flex-col">
			        				<div className="font-bold">No Course Yet</div>
			        				<div className="font-light">0 documents | PDF </div>
			        			</div>
		        			</div>
		        		})
	        		}
	        	</section>
			: "" }


			{selection == 'practice' ? 
    			<section className="w-full pt-4 bg-gray-40 px-2 gap-y-4 flex flex-col items-center">
    				

					<div className="flex gap-x-4">
						<span className='font-semibold'>Time : </span>
	        			<select  onChange={({target}) => setTime(target.value) } className="bg-transparent flex focus:outline-none"name="api-verbs">
							<option value={10}>10 mins</option>
							<option value={20}>20 mins</option>
							<option value={30}>30 mins</option>
							<option value={40}>40 mins</option>	
							<option value={50}>50 mins</option>	
							<option value={0}>No Time</option>	
						</select>
					</div>

					<div className="flex gap-x-4">
						<span className='font-semibold'>Course : </span>
	        			<select onChange={({target}) => setCourse(target.value) } className="bg-transparent flex focus:outline-none"name="api-verbs">
							<option value='ges101'>GES 101</option>
							<option value='ges103'>GES 103</option>
							{/* <option value='MATHS 114'>MATHS 114</option>
							<option value='MATHS 124'>MATHS 124</option>
							<option value='PHY 178'>PHY 178</option>	 */}
						</select>
					</div>

					<div className="flex gap-x-4"><span	className='font-semibold'>No Of Questions : </span>
	        			<select onChange={({target}) => setNumberOfQuestions(target.value) }  className="bg-transparent flex focus:outline-none"name="api-verbs">
							<option value={10}>10 </option>
							<option value={20}>20 </option>
							<option value={30}>30 </option>
							<option value={40}>40 </option>	
							<option value={50}>50 </option>	
							<option value={60}>60</option>	
						</select>
					</div>

					<div className="w-full px-2 sm:w-[70%] flex justify-between items-center h-20 bg-gray-50 mt-8 rounded ">
						<Link to={`/past_question_practice/${course}/${time}/${numberOfQuestions}`} className="h-[83%] text-lg gap-x-3 px-4 flex items-center font-semibold focus:text-white hover:text-gray-100 rounded text-white bg-gray-800">Start <Arrow className="text-white"/> </Link>
						<button className="bg-gray-200"> <small className="bg-gray-00 p-0 text-gray-400 text-sm"> Practice </small> <p>With Friends</p> </button>
					</div>

					
					<Link to='/past_question_scoreboard' className="underline mt-6 text-slate-700 underline-offset-4"><span className='text-2xl'>🏆 </span>Check ScoreBoard</Link>
					{/* Rank Emojis | 🥇🔰🎖️ | Copy & Paste */}
	        	</section>
			: "" }

			</section>
        </MainLayout>
    );
};


export default PastQuestion;
