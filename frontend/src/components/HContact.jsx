import { Mail, Phone, MapPin} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
const HContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // Sirf numbers allow honge
      if (value.length > 10) return; // 10 digits se zyada allow nahi karega

      if (value.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (phoneError || formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURI}/user/requestcall`, formData);
      setSuccess("Our team will call you shortly!"); 
      setFormData({ name: "", phone: "" });

      // ✅ 3 seconds ke baad success message remove ho jayega
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.error || "Something went wrong");
    }
    
  };


  return (
    <div className="w-full px-4 lg:mt-30 bg-gradient-to-r from-white to-[#c4ecf6]">
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Email Card */}
        <motion.div
          className="bg-white mt-30 p-6 rounded-lg shadow-lg transform transition-all "
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Email Address</h3>
              <p className="text-sm text-gray-500">Reach us anytime</p>
              <div className="space-y-1 pt-2">
                <p className="text-gray-600">info@edu2medu.com</p>
                <p className="text-gray-600">support@edu2medu.com</p>
              </div>
            </div>
          </div>
          <div>
            <a href="mailto:info@company.com" className="inline-flex items-center text-[#17A2B8] hover:text-blue-700">
           
            </a>
          </div>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          className="bg-white p-6 lg:mt-30 rounded-lg shadow-lg transform transition-all hover:scale-105"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Phone className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Phone Number</h3>
              <p className="text-sm text-gray-500">Give us a call</p>
              <div className="space-y-1 pt-2">
                <p className="text-gray-600">+91-9274333156</p>
{/*                 <p className="text-gray-600">+1-800-123-4567</p> */}
              </div>
            </div>
          </div>
          <div>
            <a href="tel:+919876543210" className="inline-flex items-center text-blue-600 hover:text-blue-700">
           
            </a>
          </div>
        </motion.div>

        {/* Office Address Card */}
        <motion.div
          className="bg-white p-6 lg:mt-30 rounded-lg shadow-lg transform transition-all hover:scale-105"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <MapPin className="h-6 w-6 text-[#17A2B8]" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Office Address</h3>
              <p className="text-sm text-gray-500">Visit us at</p>
              <div className="space-y-1 pt-2">
                <p className="text-gray-600"> Sejal complex, Palanpur patiya surat</p>
                <p className="text-gray-600">395009, India</p>
              </div>
            </div>
          </div>
          <div>
            <a href="https://www.google.com/maps" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            
            </a>
          </div>
        </motion.div>
      </div>
      <div
      className="min-h-auto mt-30 flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/contact.jpg')", // Ensure your image is in the public folder
        backgroundSize: "cover", // Ensures the background image scales well
        backgroundPosition: "center", // Centers the background image
        backgroundAttachment: "fixed", // Makes background image stay fixed during scroll
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2939] via-transparent to-transparent opacity-60"></div>
      
      <div className="container mt-17 mb-17 mx-auto flex flex-col items-center justify-center space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Reduced contact box size */}
          <div className="bg-opacity-80 bg-[#1E2939] px-6 py-8 rounded-lg max-w-md w-full shadow-xl">
          <h1 className="text-2xl font-bold text-white text-center">
            Feel Free to Contact <span className="text-[#e69721]">Us</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
            <div className="flex flex-col space-y-3">
              <label htmlFor="name" className="text-lg text-white">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 w-full text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88429] placeholder-gray-400"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label htmlFor="phone" className="text-lg text-white">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className="px-3 py-2 w-full text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88429] placeholder-gray-400"
                placeholder="Enter 10-digit phone number"
                required
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>

            {success && <p className="text-green-500 text-center">{success}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <button 
              type="submit" 
              className="mt-4 w-full py-2 bg-[#D88429] text-white rounded-lg hover:bg-[#b96c1f] transition duration-300"
              disabled={phoneError}
            >
              Request Call
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}
export default HContact;
