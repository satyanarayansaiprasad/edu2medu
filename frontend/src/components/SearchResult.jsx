import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults, selectedCategory } = location.state || {
    searchResults: [],
    selectedCategory: "",
  };

  // Filter only active users
  const activeUsers = searchResults.filter(user => user.active === true);

  return (
    <div className="bg-amber-100 lg:mt-32 md:mt-22 min-h-screen py-10 px-8">
      {/* Back Button */}
      <button
        className="mb-4 px-4 py-2 bg-[#17A2B8] text-white rounded-md"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        {selectedCategory === "Education" ? "Education Results" : "Healthcare Results"}
      </h2>

      {/* Search Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeUsers.length > 0 ? (
          activeUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/schools", { state: { user } })}
            >
              {/* User Image with lazy loading */}
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/default-image.png";
                  e.target.onerror = null; // Prevent infinite loop
                }}
              />
              {/* User Details */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {user.name || "No Name Available"}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {user.ctitle || "No Description Available"}
                </p>
                <p className="text-sm text-gray-600 mt-1">{user.address}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600 text-lg">No active users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;