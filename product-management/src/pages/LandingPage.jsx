import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Coffe2 from '../Images/Coffee 2.webp'
import Coffe3 from '../Images/Coffee 3.jpg'
import Coffe4 from '../Images/Coffee 4.jpg'

function LandingPage() {
  return (
    <div>
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <img src={Coffe2} alt="Slide 1" />
        </div>
        <div>
          <img src={Coffe3} alt="Slide 2" />
        </div>
        <div>
          <img src={Coffe4} alt="Slide 3" />
        </div>
      </Carousel>
      <div>Welcome to MyStore!</div>
    </div>
  );
}

export default LandingPage;
