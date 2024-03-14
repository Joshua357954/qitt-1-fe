import React, { useState } from 'react';
import { FaHeart, FaDownload } from 'react-icons/fa';
import { TbNotes as Notes } from 'react-icons/tb';
import { FaChevronRight as Front } from 'react-icons/fa'
import { CgMoreVertical as More } from 'react-icons/cg'
import { PiDownloadBold as Download2 , PiFiles as PQ , PiPencilLine as Assign} from 'react-icons/pi';
import MainLayout from '../components/MainLayout.jsx'



const libraryData = ['all','notes','assignments','past questions','others']

const icons = {
	'notes':<Notes className="text-blue-500"/>,
	'past questions':<PQ className="text-lg text-blue-500"/>,
	'assignments':<Assign className="text-blue-500"/>,
	'others': <More className="text-blue-500"/>
}

const LibraryCard = () => {
	return (
		<div className="flex items-center mb-2 rounded-xl bg-gray-10 h-34 min-h-28  w-full py-1">
			{/*<div className="w-[30%] h-full bg-gray-50">
				
			</div>*/}

			<div className="w-full pr-24 h-full flex flex-col justify-around p-2 border-gray-200 border-b-2 ">
				<p className="font-bold text-lg text-gray-800">STAT 190 </p>
				<p className="text-md text-gray-700">This is the stats note from the last class on friday, Pls do well to have it .</p>
				<div className="flex gap-4 items-center">
					<span className="underline text-gray-800 underline-offset-2 text-sm font-semibold">12/3/2024</span>
					<span className="bg-gray-100 text-gray-900 p-1 px-2 rounded-lg ">Notes</span>
				</div>
			</div>

			<div className="">
				<Front/>
			</div>
		</div>
	)
} 

const Library = ({ className }) => {

	const [resourceName,setResource] = useState('all')

    return (
        <MainLayout route="Resources">
        	<section className="flex flex-col w-full px-1 sm:px-5 h-full gap-5">
	        	
	        	<div className="w-full  h-14 overflow-x-auto flex justify-start sm:justify-center gap-2">
		   		{  
					libraryData.map((item,index)=>{
						return <div key={index} onClick={() => setResource(item)} className={`p-3 ${item == resourceName ? 'px-4 font-bold border ':""} flex gap-1 items-center rounded-xl bg-gray-50 `}>
								{icons[item]} <p className=" whitespace-nowrap capitalize">{item}</p>
	   					  </div>
					})
				}
				</div>

	        	{/* <section className="w-full sm:w-[90%] sm:mx-auto flex flex-col justify-center ">
	        		
	        		{
	        			libraryData.map(()=> {
	        				return <LibraryCard/>
	        			})
	        		}
	        	</section> */}

			<div className="text-center mt-8">
				<p className="text-lg text-gray-600">
					This feature helps you <strong>reduce excess PDFs on your phone</strong> and enables you to view them offline in the app.
				</p>
				<p className="text-lg text-gray-600 mt-2">Coming Soon 🚀</p>
			</div>
        	</section>

        </MainLayout>
    );
};

export default Library;