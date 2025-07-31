import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import topRated from "../data/topRated";
import trending from "../data/trending";

const posters = [
  { title: "Joker", img: "/image/joker-poster.jpg" },
  { title: "The Wild Robot", img: "/image/wild-robot-poster.jpg" },
  { title: "Venom", img: "/image/venom-poster.jpg" },
  { title: "Godfather", img: "/image/godfather-poster.jpg" },
];

export default function LandingPage() {
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden">
      <div className="w-screen h-screen relative overflow-hidden">
        <Slider {...heroSettings}>
          {posters.map((poster, i) => (
            <div key={i} className="relative w-full h-screen">
              <div
                className="w-full h-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${poster.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
                <div className="absolute z-20 top-1/3 left-10 text-white max-w-md space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold">
                    {poster.title}
                  </h2>
                  <p className="text-sm md:text-base">
                    Experience the story of {poster.title} like never before.
                  </p>
                  <div className="space-x-4">
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                      Watch Now
                    </button>
                    <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                      Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Slider */}
      <MovieSlider title="Top Rated Movies" items={topRated} />
      <MovieSlider title="Trending Movies" items={trending} />
    </div>
  );
}

function MovieSlider({
  title,
  items,
}: {
  title: string;
  items: { title: string; poster: string }[];
}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="px-6 py-8 bg-black text-white">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Slider {...settings}>
        {items.map((movie, i) => (
          <div key={i} className="px-2">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-lg w-full object-cover"
            />
            <p className="text-sm mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
