import React, { useEffect } from 'react';
import MainLayout from '../components/MainLayout.jsx';
import { PiImageSquareFill as Img } from 'react-icons/pi';
import { AiFillNotification, AiFillInfoCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { googleTrackingId } from '../utils/utils.js';


const NoticeCard = ({ type, title, date, description }) => {
  const getIconForType = (type) => {
    return type === 'announcement' ? 
      <AiFillInfoCircle  className="px-2 text-5xl text-blue-700 bg-blue-200 rounded-xl "/>
     :
      <AiFillNotification className="px-2 text-5xl text-green-700 bg-green-200 rounded-xl"/>;
  };
  
  return (
    <div className="flex items-center gap-2 w-[98%] sm:w-[80%] lg:w-[60%] mx-auto rounded p-1 border-b-2 border-b-gray-100">
      {getIconForType(type)}
      <div className="flex flex-col w-full px-2 py-1">
        <p className="flex justify-between font-semibold">{title} <span className='px-2'>{date}</span></p>
        <p className="flex">{description}</p>
      </div>
    </div>
  );
};

const Notice = ({ className }) => {
  const userData = useSelector((state) => state.auth.user);

  const noticeData = userData.department === 'computer_science' ? ([
    {
      type: 'announcement',
      title: 'Important Announcement',
      date: '27th Feb',
      description: 'Holla! No school tomorrow. Submission of CSC281 assignment will be kept pending until we resume. Don\'t get too excited; it\'s just a 2-day strike. DO YOUR ASSIGNMENT! 😒📢📢📢',
    },
    {
      type: 'announcement',
      title: 'Important Announcement',
      date: '28th Feb',
      description: '📢📢📢 The NLC protest has been called off, so school resumes today. However, the Lecturer for CSC281 won\'t be coming, and he has granted today as the last day for the assignment to be done. Submission will be done tomorrow. Maths210 class for today is still pending. Stay tuned for any update on it.',
    }
  ]) : [];
 
  return (
    <MainLayout route="Notice">
      <section className="w-full h-full flex flex-col gap-2 justify-center">
        {noticeData.length > 0 ? (
          noticeData.map((item, index) => (
            <NoticeCard
              key={index}
              type={item.type}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          ))
        ) : (
          <p className='text-center mt-2 '>No Notification yet 🥺</p>
        )}
      </section>
    </MainLayout>
  );
};

export default Notice;
