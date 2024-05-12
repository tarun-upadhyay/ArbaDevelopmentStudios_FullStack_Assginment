import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HomepageCarousel() {
  const images = [
    {
      src: `https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_1280.jpg`,
      alt: "altFirst",
    },
    {
      src: `https://www.hdcarwallpapers.com/walls/super_sports_cars-HD.jpg`,
      alt: "altSecond ",
    },
    {
      src: `https://img.freepik.com/free-vector/flat-diwali-sale-with-candle_52683-27177.jpg`,
      alt: "altThird",
    },
    {
      src: `https://img.freepik.com/free-photo/smiley-woman-posing-sale-shopping-bags_23-2148684550.jpg`,
      alt: "altFour",
    },
    {
      src: `https://images8.alphacoders.com/133/1337841.png`,
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
          <div className="px-2 md:px-6">
            <img
              src={e.src}
              alt={e.alt}
              className="h-[200px] md:h-[300px] lg:h-[300px] mx-24"
              key={index}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}
