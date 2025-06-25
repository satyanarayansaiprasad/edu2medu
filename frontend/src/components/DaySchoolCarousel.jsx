import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
};

const categories = [
  'Day School',
  'Boarding School',
  'Play School',
  'Private Tutor',
  'Coaching Centre',
];

function DaySchoolCarousel() {
  const [usersByCategory, setUsersByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURI}/user/getAllUsers`)
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.users)) {
          const categorizedUsers = {};
          categories.forEach((category) => {
            categorizedUsers[category] = response.data.users.filter(
              (user) => user.category === category && user.status === 'active'
            );
          });
          setUsersByCategory(categorizedUsers);
        } else {
          console.error('Invalid API response format:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error))
      .finally(() => setLoading(false));
  }, []);

  const renderSkeleton = () => (
    <div className="bg-[#fffbe7] p-6 md:p-8 lg:p-12">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-left">
          Loading...
        </h1>
      </header>
      <main className="px-2 md:px-4 lg:px-8">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={false}
          arrows={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="relative bg-gray-200 rounded-xl shadow-lg mx-2 md:mx-4 h-64 md:h-80 animate-pulse"
            >
              <div className="relative h-full">
                <div className="w-full h-full bg-gray-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </main>
    </div>
  );

  const renderCarousel = (title, users) => (
    <div key={title} className="bg-[#fffbe7] p-6 md:p-8 lg:p-12">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-left">
          {title}
        </h1>
      </header>
      <main className="px-2 md:px-4 lg:px-8">
        {users.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Coming Soon...</p>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={false}
            arrows={false}
            containerClass="carousel-container"
            itemClass="carousel-item"
          >
            {users.map((user) => (
              <div
                key={user._id}
                className="relative bg-white rounded-xl shadow-lg mx-2 md:mx-4 h-64 md:h-80 cursor-pointer overflow-hidden transform transition-transform hover:scale-105"
                onClick={() => navigate(`/category/${user.category}`)}
              >
                <div className="relative h-full">
                  <img
  src={user.image}
  alt={user.name}
  className="w-full h-full object-cover"
  loading="lazy"
  decoding="async"  /* Prevents blocking the main thread */
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h2 className="text-lg md:text-xl font-bold text-white">
                      {user.name || 'No Name Found'}
                    </h2>
                    <p className="text-sm md:text-base text-gray-200">
                      {user.address || 'No Address Found'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </main>
    </div>
  );

  return (
  <>
    {loading
      ? categories.map((category, index) => (
          <div key={`skeleton-${index}`}>
            {renderSkeleton()}
          </div>
        ))
      : categories.map((category) => (
          <div key={category}>
            {renderCarousel(category, usersByCategory[category] || [])}
          </div>
        ))}
  </>
);

}

export default DaySchoolCarousel;