import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HomepageCarousel() {
  const images = [
    {
      src: `https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsZXxlbnwwfHwwfHx8MA%3D%3D`,
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
      src: `https://e0.pxfuel.com/wallpapers/796/13/desktop-wallpaper-myntra-to-change-logo-following-complaint-calling-it-offensive-towards-women.jpg`,
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
          <div className="px-2 md:px-6" key={index}>
            <img
              src={e.src}
              alt={e.alt}
              className="h-[200px] md:h-[400px] lg:h-[500px] mx-24"
              key={index}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}
