import { Autoplay} from 'swiper/modules';
import './App.css';
import AmongUsLogo from './ui/amongus_logo';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import red_among from './assets/red_among.png';

import 'swiper/css';
import 'swiper/css/autoplay'


export default function App() {
  return (
    <>
      <div className="flex w-screen bg-blue-900 p-2 md:h-52">
        <AmongUsLogo />
      </div>

      <div className='flex w-full h-32 justify-center'>
        <Link to="task-screen" className='self-end'>
          <button className='bg-blue-900'>
            <span className='text-[20px] font-lusitana text-neutral-200'> Create A Room </span>
          </button>
        </Link>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={6}
        centeredSlides={true}
        slidesPerView={1.5}
        loop={true}

        autoplay={
          {
            delay: 4500,
            disableOnInteraction: false,
            
          }
        }
        className='w-full h-32 mt-10'
      >
        
        <SwiperSlide><img src={red_among} width={100} height={100}/></SwiperSlide>
        <SwiperSlide><img src={red_among} width={100} height={100}/></SwiperSlide>
        <SwiperSlide><img src={red_among} width={100} height={100}/></SwiperSlide>
        <SwiperSlide><img src={red_among} width={100} height={100}/></SwiperSlide>
        <SwiperSlide><img src={red_among} width={100} height={100}/></SwiperSlide>

      
      </Swiper>

      
      
    </>
  );
}




