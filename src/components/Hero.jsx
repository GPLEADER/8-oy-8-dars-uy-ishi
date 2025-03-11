import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeftArrow from "../assets/leftArrow.svg";
import RightArrow from "../assets/rightArrow.svg";

const slides = [
  "https://images.uzum.uz/cv385ndpb7f9qcnfjec0/main_page_banner.jpg",
  "https://images.uzum.uz/cule2v6i4n324lr9f34g/main_page_banner.jpg",
  "https://images.uzum.uz/cv4o265pb7f9qcng1frg/main_page_banner.jpg",
  "https://images.uzum.uz/cv3ehmtpb7f9qcnfmdsg/main_page_banner.jpg",
  "https://images.uzum.uz/cv0qefrvgbkm5ehhdga0/main_page_banner.jpg",
  "https://images.uzum.uz/cug7q9tht56sc95cis1g/main_page_banner.jpg",
  "https://images.uzum.uz/cv0qn6ui4n36ls3s9urg/main_page_banner.jpg",
  "https://images.uzum.uz/curg18tpb7f8r31vrhr0/main_page_banner.jpg",
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-96 max-[720]:h-56 overflow-hidden rounded-xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={slides[currentIndex]}
          className="absolute w-full min-[720px]:h-full rounded-xl"
          initial={{ x: direction * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button onClick={prevSlide} className="btn btn-circle opacity-70 max-[1280px]:hidden">
          <img src={LeftArrow} alt="Left" width={10} />
        </button>
        <button onClick={nextSlide} className="btn btn-circle opacity-70 max-[1280px]:hidden">
          <img src={RightArrow} alt="Right" width={10} />
        </button>
      </div>
    </div>
  );
}

export default Hero;
