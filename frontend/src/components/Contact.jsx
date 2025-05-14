import { useState } from "react";
import axios from "axios";

const Contact = () => {
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
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/contact.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2939] via-transparent to-transparent opacity-60"></div>

      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 relative z-10">
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
  );
};

export default Contact;
