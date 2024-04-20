import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HomepageCarousel() {
  const images = [
    {
      src: `https://images.pexels.com/photos/21430836/pexels-photo-21430836/free-photo-of-vintage-camera-praktica-mtl5-hanging-on-the-strap-of-the-case.jpeg?auto=compress&cs=tinysrgb&h=750&dpr=1`,
      alt: "altFirst",
    },
    {
      src: `https://images.pexels.com/photos/20780434/pexels-photo-20780434/free-photo-of-a-blue-house-with-pink-blossoms-on-the-roof.jpeg?auto=compress&cs=tinysrgb&h=750&dpr=1`,
      alt: "altSecond ",
    },
    {
      src: `https://images.pexels.com/photos/13407814/pexels-photo-13407814.jpeg?auto=compress&cs=tinysrgb&h=750&dpr=1`,
      alt: "altThird",
    },
    {
      src: `https://images.pexels.com/photos/21430836/pexels-photo-21430836/free-photo-of-vintage-camera-praktica-mtl5-hanging-on-the-strap-of-the-case.jpeg?auto=compress&cs=tinysrgb&h=750&dpr=1`,
      alt: "altFour",
    },
    {
      src: `https://images.pexels.com/photos/18873395/pexels-photo-18873395/free-photo-of-tea-coffee-and-a-vase-with-blooming-flowers-on-a-table-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
      alt: "altThird",
    },
  ];
  return (
    <>
      <Carousel
        autoPlay
        infiniteLoop
        centerMode
        showThumbs={false}
        showStatus={false}
      >
        {images.map((e, index) => (
          <img src={e.src} alt={e.alt} className="max-h-[400px]" key={index} />
        ))}
      </Carousel>
    </>
  );
}
