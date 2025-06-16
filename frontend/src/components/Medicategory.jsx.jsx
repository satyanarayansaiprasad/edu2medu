import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
const Medicategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    axios
      .get(`${import.meta.env.VITE_BASEURI}/user/getHealthcareUsers`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.users)) {
          const filteredUsers = response.data.users.filter(
            (user) => user.category === categoryName && user.status === 'active'
          );
          setUsers(filteredUsers);
        } else {
          setError("Invalid data format received from the server.");
        }
      })
      .catch((error) => {
        setError("Failed to load data. Please try again later.");
      });
  }, [categoryName]);

  return (
    <div className="bg-gradient-to-br from-teal-50 via-cyan-70 to-sky-50  lg:mt-32 md:mt-22 min-h-screen py-10 px-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex fixed mt-20 sm:mt-24 md:mt-28 lg:mt-30 xl:mt-32 top-4 left-4 z-50 items-center gap-2 px-4 py-2 bg-[#17A2B8] text-gray-200 rounded-full shadow-md hover:shadow-lg transition duration-300"
        onClick={() => navigate("/healthcare")}
      >
        <FaArrowLeft />
        <span>Back to List</span>
      </motion.button>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        {categoryName}
      </h2>

      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/medu-details", { state: { user } })} // ✅ Pass user data
            >
              <img
                src={user.image || "/default-image.jpg"}
                alt={user.name}
                className="w-full h-40 object-cover rounded-t-md"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <h2 className="text-lg font-bold text-gray-800 mt-3">
                {user.name || "No Name Available"}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {user.ctitle || "No Description Available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            Coming Soon...in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Medicategory;
