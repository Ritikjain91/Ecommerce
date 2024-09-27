import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function LandingPage() {
  return (
    <div>
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <img src="/images/image1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="/images/image2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="/images/image3.jpg" alt="Slide 3" />
        </div>
      </Carousel>
      <div>Welcome to MyStore!</div>
    </div>
  );
}

export default LandingPage;
