import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SchoolDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      const savedUser = sessionStorage.getItem("selectedUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } else {
      sessionStorage.setItem("selectedUser", JSON.stringify(user));
    }

    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [user]);

  const handleBack = () => {
    sessionStorage.removeItem("selectedUser"); // Remove session data
    navigate("/"); // Navigate back to list page
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center"
        >
          <p className="text-red-600 text-lg font-semibold">
            User details not found.
          </p>
          <button
            className="mt-4 flex items-center justify-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Function to format text with line breaks
  const formatTextWithLineBreaks = (text, prependAsterisk = false) => {
    if (!text) return "No information available.";
    return text.split("\n").map((line, index) => (
      <p key={index} className="text-gray-700 leading-relaxed">
        {prependAsterisk && line.trim() !== "" ? "* " : ""}
        {line}
      </p>
    ));
  };

  return (
    <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-30 xl:mt-32">
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Back to List Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex fixed mt-33 top-4 left-4 z-50 items-center gap-2 px-4 py-2 bg-[#17A2B8] text-gray-200 rounded-full shadow-md hover:shadow-lg transition duration-300"
          onClick={handleBack}
        >
          <FaArrowLeft />
          <span>Back to List</span>
        </motion.button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
          >
            <div className="relative">
              <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden">
                <motion.img
                  variants={{
                    hidden: { scale: 1.2, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.7, ease: "easeOut" },
                    },
                  }}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                 loading="lazy"
  decoding="async"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-white px-6 py-4 rounded-xl shadow-lg border w-5/6 max-w-md text-center"
              >
                <h2 className="text-xl sm:text-3xl font-bold text-teal-700">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-lg">
                  {user.ctitle}
                </p>
              </motion.div>
            </div>

            <div className="p-6 pt-20 sm:p-10">
              {/* Contact Information Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  },
                }}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="mb-8 bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-2xl relative"
              >
                <FaQuoteLeft className="absolute top-4 left-4 flex text-sky-200 text-xl" />
                <div className="flex  justify-between">
                  <div className="w-1/2 pr-4 px-10">
                    <h3 className="text-xl font-bold text-sky-700 mb-2">
                      Contact Information
                    </h3>
                    <h1 className="font-bold">
                      {formatTextWithLineBreaks(user.contactInfo)}
                    </h1>
                  </div>
                  <div className="w-1/2 px-25">
                    <h3 className="text-xl font-semibold text-sky-700 mb-2">
                      Establishment
                    </h3>
                    <h1 className="font-serif">
                      {formatTextWithLineBreaks(user.establishment)}
                    </h1>
                  </div>
                </div>
                <FaQuoteRight className="absolute bottom-4 right-4 text-sky-200 text-xl" />
              </motion.div>
              {/* Location and Call Now Button Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.6, duration: 0.5 },
                  },
                }}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50"
              >
                {/* Location Section */}
                <div className="flex items-start gap-4">
                  <div className="bg-teal-400 p-3 rounded-full shadow-md">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Location
                    </h3>
                    <p className="text-gray-700">
                      {user.address || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Call Now Button */}
                <button
                  className="w-full sm:w-auto py-2 px-4 bg-teal-500 text-white font-medium rounded-lg shadow-md hover:bg-teal-600 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
                  onClick={() =>
                    user.phone && window.open(`tel:${user.phone}`, "_self")
                  }
                >
                  {user.phone ? `Call Now` : "No Contact Available"}
                </button>
              </motion.div>
              {/* About Section */}

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.3, duration: 0.5 },
                  },
                }}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl relative"
              >
                <FaQuoteLeft className="absolute top-4 left-4 text-teal-200 text-xl" />
                <div className="ml-6 mr-6">
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">
                    About
                  </h3>
                  {formatTextWithLineBreaks(user.additionalInfo)}
                </div>
                <FaQuoteRight className="absolute bottom-4 right-4 text-teal-200 text-xl" />
              </motion.div>

              {/* Amenity Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.4, duration: 0.5 },
                  },
                }}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="mb-8 bg-gradient-to-r from-cyan-50 to-sky-50 p-6 rounded-2xl relative"
              >
                <FaQuoteLeft className="absolute top-4 left-4 text-cyan-200 text-xl" />
                <div className="ml-6 mr-6">
                  <h3 className="text-xl font-semibold text-cyan-700 mb-2">
                    Amenity
                  </h3>
                  {formatTextWithLineBreaks(user.amenity, true)}
                </div>
                <FaQuoteRight className="absolute bottom-4 right-4 text-cyan-200 text-xl" />
              </motion.div>

              {/* Specialization Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.4, duration: 0.5 },
                  },
                }}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="mb-8 bg-gradient-to-r from-cyan-50 to-sky-50 p-6 rounded-2xl relative"
              >
                <FaQuoteLeft className="absolute top-4 left-4 text-cyan-200 text-xl" />
                <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-4">
                    Specialist Information
                  </h1>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    {user.teachers && user.teachers.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {user.teachers.map((teacher, index) => {
                          const teacherName =
                            typeof teacher.name === "object"
                              ? teacher.name.type
                              : teacher.name || "Unknown";
                          const teacherQualification =
                            typeof teacher.qualification === "object"
                              ? teacher.qualification.type
                              : teacher.qualification || "Unknown";

                          return (
                            <li key={index} className="text-lg font-semibold">
                              <span className="text-teal-700">
                                {teacherName}
                              </span>{" "}
                              - {teacherQualification}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-600">
                        No specialist information available.
                      </p>
                    )}
                  </div>
                </div>
                <FaQuoteRight className="absolute bottom-4 right-4 text-cyan-200 text-xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
