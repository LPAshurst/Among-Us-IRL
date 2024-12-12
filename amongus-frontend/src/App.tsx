// Local react and css
import './App.css';
import "./styles/home.css"

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
      console.log("disconnected");
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
      <main className='home-screen'>
        <div className='home-btn-field'>
          {(localStorage.getItem("logged_in") != null) ?
            (<Link to="join-create" className='self-end'>
              <button className='home-btn'>
                <span className='home-btn-text'> Play </span>
              </button>
            </Link>) :
            (<><Link to="login" className='self-end'>
              <button className='home-btn'>
                <span className='home-btn-text'> Log in </span>
              </button>
            </Link>
              <Link to="signup" className='self-end ml-5'>
                <button className='home-btn'>
                  <span className='home-btn-text'> Sign up </span>
                </button>
              </Link>
            </>)}
        </div>

        <div className='swiper-container'>
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
            className='swiper'
          >
            <SwiperSlide ><img src={"https://cdn.jackboxgames.com/banner-images/naughty-pack.png"} alt='Jackbox picture' /></SwiperSlide>
            <SwiperSlide><img src={red_among} alt='Among us character'/></SwiperSlide>
            <SwiperSlide><img src={red_among} alt='Among us character'/></SwiperSlide>
            <SwiperSlide><img src={red_among} alt='Among us character'/></SwiperSlide>
            <SwiperSlide><img src={red_among} alt='Among us character'/></SwiperSlide>

          </Swiper>
        </div>

        <div className='lorenzo-zane-container'>
          <img src={Zane_Lorenzo} width={150} className='lorenzo-zane-pic' alt='Picture of Zane and Lorenzo on a golf cart :3'></img>
          <p className='lorenzo-zane-text'>
            Lorenzo and Zane<br></br>
            <span style={{marginLeft: "1rem"}}>Productions</span>
          </p>

        </div>
      </main>
    </>
  );
}




