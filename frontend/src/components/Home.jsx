import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Education");
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.pathname.includes("/healthcare")) {
      setSelectedCategory("Healthcare");
    } else {
      setSelectedCategory("Education");
    }
  }, [location.pathname]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedOption("");
    navigate(category === "Education" ? "/" : "/healthcare");
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        selectedCategory === "Education"
          ? `${import.meta.env.VITE_BASEURI}/user/searchEducation`
          : `${import.meta.env.VITE_BASEURI}/user/searchHealthcare`;

      const response = await axios.get(endpoint, {
        params: { query: searchQuery },
      });

      navigate("/search-results", {
        state: { searchResults: response.data, selectedCategory },
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred while searching. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const educationOptions = [
    "Day School",
    "Boarding School",
    "Play School",
    "Coaching Centre",
    "Private Tutor",
  ];
  const healthcareOptions = ["Hospitals", "Private Clinics", "Medical Store's"];

  return (
    <div className="relative w-full bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          key={selectedCategory}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={selectedCategory === "Education" ? "educ.mp4" : "h.mp4"}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Category Buttons */}
      <div className="relative z-10 flex gap-6 mb-6 flex-wrap justify-center">
        {["Education", "Healthcare"].map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-md text-lg font-bold transition-all ${
              selectedCategory === category
                ? category === "Education"
                  ? "bg-[#E76F51] text-white"
                  : "bg-[#17A2B8] text-white"
                : "bg-gray-200 text-black hover:bg-opacity-80"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Animated Title */}
      <motion.h1
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <span
          className={`bg-gradient-to-r from-white ${
            selectedCategory === "Education"
              ? "to-[#E76F51]"
              : "to-[#17A2B8]"
          } bg-clip-text text-transparent`}
        >
          {selectedCategory === "Education"
            ? "Find Your Dream School!"
            : "Find Your Trusted Healthcare!"}
        </span>
      </motion.h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mt-6 flex justify-center items-center">
        <div className="flex items-center w-full max-w-md relative">
          <SearchIcon
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              selectedCategory === "Education"
                ? "text-[#E76F51]"
                : "text-[#17A2B8]"
            }`}
          />
          <input
            type="text"
            placeholder={
              selectedOption ||
              (selectedCategory === "Education"
                ? "Search schools, boards, cities..."
                : "Search hospitals, clinics, doctors...")
            }
            className="p-3 pl-10 pr-14 rounded-lg w-full text-sm sm:text-base placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#5e758e] shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
              selectedCategory === "Education" ? "bg-[#E76F51]" : "bg-[#17A2B8]"
            } text-white p-2 rounded-md hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110`}
            onClick={handleSearch}
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Options List */}
      <div className="relative z-10 mt-4 grid grid-cols-3 sm:grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:justify-center text-center sm:text-left">
        {(selectedCategory === "Education"
          ? educationOptions
          : healthcareOptions
        ).map((option) => (
          <span
            key={option}
            className={`font-bold text-center sm:text-left cursor-pointer text-sm sm:text-base transition duration-300 ${
              selectedCategory === "Education"
                ? "text-[#E76F51] hover:text-[#d34c2a]"
                : "text-[#17A2B8] hover:text-[#117585]"
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;