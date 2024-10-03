// Local react and css
import './App.css';

// React imports
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// Swiper imports
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

// Local pictures
import red_among from './assets/red_among.png';
import Zane_Lorenzo from './assets/zane_lorenzo.png'
import Navbar from './ui/navbar';

import { socket } from './socket';

export default function App() {

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {
      console.log("connected");
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('chat message', (msg) => {
      console.log(msg);
    })
    socket.emit('chat message', "hello");
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className='flex w-full h-32 justify-center'>
        {(localStorage.getItem("logged_in") != null) ?
          (<Link to="join-create" className='self-end'>
            <button className='bg-blue-900 w-28'>
              <span className='text-[20px] font-lusitana text-neutral-200'> Play </span>
            </button>
          </Link>) :
          (<><Link to="login" className='self-end'>
            <button className='bg-blue-900 w-28'>
              <span className='text-[20px] font-lusitana text-neutral-200'> Log in </span>
            </button>
          </Link>
            <Link to="signup" className='self-end ml-5'>
              <button className='bg-blue-900 w-28'>
                <span className='text-[20px] font-lusitana text-neutral-200'> Sign up </span>
              </button>
            </Link>
          </>)}
      </div>

      <div className='flex w-full h-1/5 mt-20 '>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={3}
          centeredSlides={true}
          slidesPerView={1.5}
          loop={true}
          pagination={
            {
              clickable: true
            }
          }
          autoplay={
            {
              delay: 4500,
              disableOnInteraction: false,

            }
          }
          className='md:w-1/4 w-11/12'
        >

          <SwiperSlide><img src={"https://cdn.jackboxgames.com/banner-images/naughty-pack.png"} /></SwiperSlide>
          <SwiperSlide><img src={red_among} /></SwiperSlide>
          <SwiperSlide><img src={red_among} /></SwiperSlide>
          <SwiperSlide><img src={red_among} /></SwiperSlide>
          <SwiperSlide><img src={red_among} /></SwiperSlide>

        </Swiper>
      </div>

      <div className='flex mt-28 justify-center'>
        <img src={Zane_Lorenzo} width={150} className='rounded-lg border-gray-400 border-4'></img>
        <p className='font-anton ml-5 mt-5 text-neutral-400'>
          Lorenzo and Zane<br></br>
          <span className='ml-4'>Productions</span>
        </p>

      </div>


    </>
  );
}




