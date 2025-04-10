import pic1 from '../../src/assets/pic1.png'
import pic2 from '../../src/assets/pic2.png'
import React, { useEffect, useState } from 'react';
import { easeIn, motion } from 'framer-motion';

const images = [pic1,pic2];
const Carousel = () => {
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); 
    return () => clearInterval(interval);
  }, [current]);
  

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-350 mx-auto overflow-hidden rounded-2xl shadow-lg mt-15  ">
      <div className="relative h-[350px] sm:h-[350px] md:h-[500px]">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover "
        />
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2  text-white p-2 rounded-full hover:bg-black"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-black"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 py-4 bg-black/20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
