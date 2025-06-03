import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const MedicalCl = ({ medicalCategory }) => {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const renderCarousel = (title, users) => (
    <div key={title} className="mt-20 sm:mt-24 md:mt-28 lg:mt-30 xl:mt-40">
      <header className="mb-6 px-6 md:px-16">
        <h1 className="text-3xl font-extrabold text-gray-900 border-l-4 border-cyan-500 pl-4">
          {title}
        </h1>
      </header>
      <main className="px-6 md:px-16">
        {users.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No users found</p>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            showDots={false}
            arrows={false}
            containerClass="carousel-container"
            itemClass="carousel-item px-4"
          >
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform transition duration-300 hover:scale-105 cursor-pointer relative"
                onClick={() =>
                  navigate(`/medicalcategory/${user.category}`, {
                    state: { user },
                  })
                }
              >
                {/* Image */}
                <div className="relative w-full h-60 overflow-hidden">
                  <img
                    src={user.image || "/placeholder.svg?height=400&width=800"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = "/placeholder.svg?height=400&width=800")
                    }
                  />
                </div>

                {/* Content */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-b-3xl text-center">
                  <h2 className="text-xl font-bold text-teal-700">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {user.ctitle || user.category}
                  </p>
                  <p className="text-gray-700 mt-2 truncate">
                    {user.address || "No address available"}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </main>
    </div>
  );

  return (
    <div className="py-12 bg-white">
      {Object.entries(medicalCategory).map(([categoryTitle, users]) =>
        renderCarousel(categoryTitle, users)
      )}
    </div>
  );
};

export default MedicalCl;
