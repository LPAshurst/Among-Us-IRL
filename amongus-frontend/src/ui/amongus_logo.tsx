import { Link } from 'react-router-dom';
import red_among from '../assets/red_among.png';
import "../styles/banner.css"

export default function AmongUsLogo() {
  return (
    <div
      className='banner-content'
    >
      <Link to="/">
      <img
        src={red_among}
        className='banner-img'
        alt='Among us character'
      />
      </Link>

      <h1 className="banner-text">Amog us in real life</h1>
    </div>
  );
}