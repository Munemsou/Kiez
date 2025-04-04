import { useState, useEffect } from "react";
import "./carousel.css";
// import Carousel0 from "../assets/Carousel0.png";
import Carousel1 from "../assets/Carousel1.jpg";
import Carousel2 from "../assets/Carousel2.jpg";
import Carousel3 from "../assets/Carousel3.jpg";
import Carousel4 from "../assets/Carousel4.jpg";
import Carousel5 from "../assets/Carousel5.jpg";
import Carousel6 from "../assets/Carousel6.png";

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handlePrevClick = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const images = [
    // Carousel0,
    Carousel1,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5,
    Carousel6,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5500);

    // bei manueller Navigation
    return () => clearInterval(intervalId);
  }, [index, images.length]);

  return (
    <section className="custom-carousel w-full relative">
      <div className="carousel-container relative max-w-full h-64 overflow-hidden">
        <div
          className="carousel-prev absolute z-20 top-0 left-0 w-15 h-full bg-black bg-opacity-30 cursor-pointer flex items-center justify-center"
          onClick={handlePrevClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <ul className="carousel-images w-full h-full">
          {images.map((image, i) => (
            <li
              key={i}
              className={`carousel-image absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Bild-Carousel${i + 1}`}
                className="w-full h-full object-cover"
              />
            </li>
          ))}
        </ul>
        <div
          className="carousel-next absolute z-20 top-0 right-0 w-15 h-full bg-black bg-opacity-30 cursor-pointer flex items-center justify-center"
          onClick={handleNextClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
