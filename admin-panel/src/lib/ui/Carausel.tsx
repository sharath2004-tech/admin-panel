import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
interface Props {
  children: React.ReactNode;
}
const ReusableCarausel = ({ children }: Props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };
  const customLeftArrow = (
    <div className="absolute arrow-btn left-1 text-center cursor-pointer ">
      <BsArrowLeftShort className="h-10  text-white hover:text-main-color w-full" />
    </div>
  );

  const customRightArrow = (
    <div className="absolute arrow-btn right-1 text-center  cursor-pointer  ">
      <BsArrowRightShort className="h-10  text-white hover:text-main-color w-full" />
    </div>
  );
  return (
    <Carousel
      infinite
      customLeftArrow={customLeftArrow}
      customRightArrow={customRightArrow}
      responsive={responsive}
      itemClass="px-2"
      draggable={true}
      className="w-full"
    >
      {children}
    </Carousel>
  );
};

export default ReusableCarausel;
