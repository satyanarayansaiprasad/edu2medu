
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home,
  User,
  Activity,
  HelpCircle,
  LogOut,
  Info,
  MessageCircle,
  Settings,
  Edit3,
  Camera,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Menu,
  X,
  BookOpen,

  Calendar,
} from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [formData, setFormData] = useState({
    id: user?._id || "",
    name: user?.name || "",
    address: user?.address || "",
    phone: user?.phone || "",
    // email: user?.email || "",
    description: user?.description || "",
    contactInfo: user?.contactInfo || "",
    amenity: user?.amenity || "",
    establishment: user?.establishment || "",
    additionalInfo: user?.additionalInfo || "",
    teachers: user?.teachers || [],
  });
  const [jobFormData, setJobFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    jobDescription: "",
    jobRequirements: "",
    applicationDeadline: "",
    howToApply: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJobFormChange = (e) => {
    setJobFormData({ ...jobFormData, [e.target.name]: e.target.value });
  };
  
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURI}/user/createjob`,
        jobFormData,
        {
          headers: { "Content-Type": "application/json" },
           withCredentials: true,
        }
      );
  
      setMessage(response.data.message);
      setJobFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: "",
        salary: "",
        jobDescription: "",
        jobRequirements: "",
        applicationDeadline: "",
        howToApply: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const addTeacher = () => {
    setFormData({
      ...formData,
      teachers: [...formData.teachers, { name: "", qualification: "" }],
    });
  };

  const removeTeacher = (index) => {
    const updatedTeachers = formData.teachers.filter((_, i) => i !== index);
    setFormData({ ...formData, teachers: updatedTeachers });
  };

  const handleTeacherChange = (index, field, value) => {
    const updatedTeachers = formData.teachers.map((teacher, i) =>
      i === index ? { ...teacher, [field]: value } : teacher
    );
    setFormData({ ...formData, teachers: updatedTeachers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    if (!user || !user.email) {
      setMessage("Email is missing.");
      setLoading(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      // formDataToSend.append("email", user.email);
  
      Object.keys(formData).forEach((key) => {
        if (key !== "teachers" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      if (profilePicture) {
        formDataToSend.append("image", profilePicture);
      }
  
      // Ensure teachers is a valid JSON string before appending
      if (Array.isArray(formData.teachers)) {
        formDataToSend.append("teachers", JSON.stringify(formData.teachers));
      }
  
      const response = await axios.patch(
        `${import.meta.env.VITE_BASEURI}/user/updateProfile`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
           withCredentials: true,
        }
      );
  
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-6 text-gray-800">
  <div className="flex items-center space-x-3 mb-6">
    <User className="w-8 h-8 text-gray-500" />
    <h1 className="text-2xl font-semibold">{user.userType} Dashboard</h1>
  </div>
  <p className="mb-6 text-gray-600 text-lg">Welcome to your dashboard! Here you can manage your account, update your profile, check your status, and contact support whenever needed. Explore the options below to get started.</p>
  
  <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    <div className="bg-gradient-to-r from-[#e1a698] to-[#17A2B8] p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
      <Info className="w-15  h-15 text-blue-500" />
      <div>
        <p className="text-lg font-semibold">View Your Status</p>
        <p className="text-sm text-gray-500">Check your current status, track your progress, and stay informed about recent updates. Keep an eye on your performance and achievements.</p>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-[#e1a698] to-[#17A2B8] p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
      <MessageCircle className="w-15 h-15 text-green-500" />
      <div>
        <p className="text-lg font-semibold">Contact Support</p>
        <p className="text-sm text-gray-500">Need assistance? Our support team is here to help. Reach out to us with any questions or issues, and we’ll make sure you’re taken care of.</p>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-[#f9c0b2] to-[#b7eff7] p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
      <Settings className="w-15 h-15 text-yellow-500" />
      <div>
        <p className="text-lg font-semibold">Update Your Profile</p>
        <p className="text-sm text-gray-500">Personalize your experience by updating your profile. Change your preferences, update your details, and make sure your information is up-to-date.</p>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-[#e1a698] to-[#cadfe2] p-6 rounded-xl shadow-md flex items-center space-x-3 cursor-pointer hover:bg-gray-100">
      <User className="md:w-15 md:h-15 sm:h-15 sm:w-15 text-purple-500" />
      <div>
        <p className="text-lg font-semibold">Manage Account</p>
        <p className="text-sm text-gray-500">Take control of your account. Manage your settings, review your subscriptions, and ensure everything is in order for a smooth experience.</p>
      </div>
    </div>
    
  </div>
</div>

        );
      case "updateProfile":
        return (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Update {user.userType} Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Keep your profile up-to-date for the best experience.
          </p>
        
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="flex items-center space-x-3">
              <Edit3 className="w-6 h-6 text-blue-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Change Name"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
        
            {/* Address Input */}
            <div className="flex items-center space-x-3">
              <Home className="w-6 h-6 text-green-500" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Change Address"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
        
            {/* Phone Input */}
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-yellow-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Change Phone Number"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-500"
              />
            </div>
        
            {/* Email Input */}
             {/* <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-purple-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Change Email Address"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-purple-500"
              />
            </div> */}
        
            {/* Profile Picture Upload */}
            <div className="flex items-center space-x-3">
              <Camera className="w-6 h-6 text-orange-500" />
              <input
                type="file"
                onChange={handleFileChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
            </div>
        
            {/* Description Textarea */}
            <div className="flex items-center space-x-3">
              <Edit3 className="w-6 h-6 text-red-500" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Update Description"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
         {/* Contact Info Textarea */}
         <div className="flex items-center space-x-3">
              <Edit3 className="w-6 h-6 text-red-500" />
              <textarea
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Conatct information"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            {/* Amenity Textarea */}
         <div className="flex items-center space-x-3">
              <Edit3 className="w-6 h-6 text-yellow-400" />
              <textarea
                name="amenity"
                value={formData.amenity}
                onChange={handleChange}
                placeholder="Add amenity"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
             {/* Establishment */}
         <div className="flex items-center space-x-3">
              <Edit3 className="w-6 h-6 text-green-500" />
              <textarea
                name="establishment"
                value={formData.establishment}
                onChange={handleChange}
                placeholder="Add Establishment"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            {/* Additional Info */}
            <div className="flex items-center space-x-3 sm:col-span-2">
              <Edit3 className="w-6 h-6 text-indigo-500" />
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Add Bio or Additional Details"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
        
            {/* Our Specialist Section */}
            

              <div className="sm:col-span-2 mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Specialist</h3>

                {formData.teachers.map((teacher, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <User className="w-6 h-6 text-teal-500" />
                      <input
                        type="text"
                        name="specialist"
                        value={teacher.name}
                        onChange={(e) => handleTeacherChange(index, "name", e.target.value)}
                        placeholder="Enter Name"
                        className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-6 h-6 text-orange-500" />
                      <input
                        type="text"
                        name="qualification"
                        value={teacher.qualification}
                        onChange={(e) => handleTeacherChange(index, "qualification", e.target.value)}
                        placeholder="Enter Specialization or Qualification"
                        className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeTeacher(index)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                    >
                      Remove 
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTeacher}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                >
                  Add 
                </button>
              </div>
        
            {/* Submit Button */}
            <div className="mt-6 text-center sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        
          {/* Status Message */}
          {message && (
            <div className="mt-4 text-center text-gray-700 bg-gray-100 p-3 rounded-md">
              {message}
            </div>
          )}
        </div>
        

        );
        case "postJob":
  return (
    <div className="mt-8 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Post a Job</h2>
      <p className="text-gray-600 mb-6">
        Fill out the form below to post a new job opportunity.
      </p>

      <form onSubmit={handleJobSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Job Title */}
        <div className="flex items-center space-x-3">
          <Edit3 className="w-6 h-6 text-blue-500" />
          <input
            type="text"
            name="jobTitle"
            value={jobFormData.jobTitle}
            onChange={handleJobFormChange}
            placeholder="Job Title"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Name */}
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-green-500" />
          <input
            type="text"
            name="companyName"
            value={jobFormData.companyName}
            onChange={handleJobFormChange}
            placeholder="Company Name"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3">
          <Home className="w-6 h-6 text-yellow-500" />
          <input
            type="text"
            name="location"
            value={jobFormData.location}
            onChange={handleJobFormChange}
            placeholder="Location"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Job Type */}
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-purple-500" />
          <select
            name="jobType"
            value={jobFormData.jobType}
            onChange={handleJobFormChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

    {/* Salary */}
<div className="flex items-center space-x-3">
  <span className="text-orange-500 text-lg">₹</span>
  <input
    type="number"
    name="salary"
    value={jobFormData.salary}
    onChange={handleJobFormChange}
    placeholder="Enter Salary (INR)"
    className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-orange-500"
    onWheel={(e) => e.target.blur()} // Prevents scrolling changing the value
    style={{ appearance: "textfield" }} // Removes arrows in some browsers
  />
</div>


        {/* Job Description */}
        <div className="sm:col-span-2">
          <textarea
            name="jobDescription"
            value={jobFormData.jobDescription}
            onChange={handleJobFormChange}
            placeholder="Job Description"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Job Requirements */}
        <div className="sm:col-span-2">
          <textarea
            name="jobRequirements"
            value={jobFormData.jobRequirements}
            onChange={handleJobFormChange}
            placeholder="Job Requirements"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Application Deadline */}
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-red-500" />
          <input
            type="date"
            name="applicationDeadline"
            value={jobFormData.applicationDeadline}
            onChange={handleJobFormChange}
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* How to Apply */}
        <div className="sm:col-span-2">
          <textarea
            name="howToApply"
            value={jobFormData.howToApply}
            onChange={handleJobFormChange}
            placeholder="How to Apply"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-purple-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>

      {/* Status Message */}
      {message && (
        <div className="mt-4 text-center text-gray-700 bg-gray-100 p-3 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
        // case "status":
        //   return (
        //     <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        //       <h2 className="text-xl font-semibold mb-4">{user.userType} Status</h2>
        
        //       {user.status === "block" ? (
        //         <div>
        //           {/* Blocked Status Content */}
        //           <div className="flex items-center space-x-3 text-red-500">
        //             <XCircle className="w-8 h-8" />
        //             <p className="text-lg font-semibold">Your account is currently blocked.</p>
        //           </div>
        //           <p className="mt-2 text-red-600">If you believe this is a mistake, please contact our support team or request an unblock by sending a message to the admin.</p>
        
        //           {/* Instructional Content */}
        //           <div className="mt-6 bg-yellow-100 p-4 rounded-md">
        //             <h3 className="text-lg font-semibold text-yellow-600">How to Request Unblock:</h3>
        //             <ul className="list-inside list-disc text-gray-600">
        //               <li>Describe the issue you're facing clearly and provide any relevant details.</li>
        //               <li>Ensure to mention your username or account email for quick identification.</li>
        //               <li>If this is a system-generated block, the admin will review and resolve it accordingly.</li>
        //             </ul>
        //           </div>
        
        //           {/* Unblock Request Form */}
        //           <textarea
        //             className="w-full p-2 border border-gray-300 rounded-md mt-4"
        //             placeholder="Write your message to the admin..."
        //           ></textarea>
        //           <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
        //             Send Request
        //           </button>
        
        //           {/* Support Contact Info */}
        //           <div className="mt-6 bg-gray-100 p-4 rounded-md">
        //             <h3 className="text-lg font-semibold">Need Immediate Assistance?</h3>
        //             <p className="text-gray-600">
        //               You can also get in touch with our support team by calling or emailing us:
        //             </p>
        //             <ul className="text-blue-500">
        //               <li><strong>Phone:</strong> +1 800 123 4567</li>
        //               <li><strong>Email:</strong> support@example.com</li>
        //             </ul>
        //           </div>
        //         </div>
        //       ) : (
        //         <div>
        //           {/* Active Status Content */}
        //           <div className="flex items-center space-x-3 text-green-500">
        //             <CheckCircle className="w-8 h-8" />
        //             <p className="text-lg font-semibold">Your account is active and fully functional.</p>
        //           </div>
        
        //           {/* Encouragement Content */}
        //           <div className="mt-6 bg-green-100 p-4 rounded-md">
        //             <h3 className="text-lg font-semibold text-green-600">Stay Active and Explore More:</h3>
        //             <p className="text-gray-600">
        //               Enjoy your time on the platform! Make sure to regularly update your profile to enhance your experience. Here are some things you can do:
        //             </p>
        //             <ul className="list-inside list-disc text-gray-600">
        //               <li>Complete your profile with the latest information.</li>
        //               <li>Check out new features that are available to you.</li>
        //               <li>Review your privacy settings to make sure your data is secure.</li>
        //             </ul>
        //           </div>
        
        //           {/* Additional Links */}
        //           <div className="mt-6 bg-gray-100 p-4 rounded-md">
        //             <h3 className="text-lg font-semibold">Need Help or Have Questions?</h3>
        //             <p className="text-gray-600">
        //               If you need assistance or have any questions about your account or how to make the most of our platform, feel free to contact our support team.
        //             </p>
        //             <ul className="text-blue-500">
        //               <li><strong>Help Center:</strong> <a href="#" className="hover:underline">Visit our Help Center</a></li>
        //               <li><strong>Contact Us:</strong> <a href="#" className="hover:underline">Submit a Support Request</a></li>
        //             </ul>
        //           </div>
        //         </div>
        //       )}
        //     </div>
        //   );
      case "support":
        return (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">{user.userType} Support</h2>
          <p className="text-gray-600 mb-4">Need help? Our support team is here to assist you.</p>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="bg-gray-100 p-4 rounded-md flex items-center space-x-3 cursor-pointer hover:bg-gray-200"
              onClick={() => window.location.href = 'tel:+18001234567'} // This will trigger the phone dialer
            >
              <Phone className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-lg font-semibold">Call Us</p>
                <p className="text-gray-600">+91 9811247700</p>
              </div>
            </div>
        
            <div
              className="bg-gray-100 p-4 rounded-md flex items-center space-x-3 cursor-pointer hover:bg-gray-200"
              onClick={() => window.location.href = 'mailto:support.edu2medu@gmail.com'} // This will open the email client
            >
              <Mail className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-lg font-semibold">Email Us</p>
                <p className="text-gray-600">support.edu2medu@gmail.com</p>
              </div>
            </div>
          </div>
        
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Submit a support request:</p>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Describe your issue..."
            ></textarea>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
              Submit Request
            </button>
          </div>
        </div>
        
        );
      default:
        return (
          <div className="p-6 text-gray-800">{user.userType} Dashboard</div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`w-full md:w-64 bg-[#245876] p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-50`}
      >
        <div>
          <h2 className="text-xl text-white font-semibold mb-6 text-center">
            Welcome <br /> {user?.name || "User"}
          </h2>
          <ul className="space-y-2">
            <li
              className={`flex items-center p-3 rounded-lg text-white hover:text-gray-900 cursor-pointer transition duration-300 hover:bg-gray-200 ${activeTab === "dashboard" ? "bg-gray-300 text-black" : "text-white"}`}
              onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}
            >
              <Home className="w-5 h-5 mr-3" /> Dashboard
            </li>
            <li
              className={`flex items-center p-3 rounded-lg text-white hover:text-gray-900 cursor-pointer transition duration-300 hover:bg-gray-300 ${activeTab === "updateProfile" ? "bg-gray-300 text-black" : "text-white"}`}
              onClick={() => { setActiveTab("updateProfile"); setIsSidebarOpen(false); }}
            >
              <User className="w-5 h-5 mr-3" /> Update Profile
            </li>
            <li
  className={`flex items-center p-3 rounded-lg text-white hover:text-gray-900 cursor-pointer transition duration-300 hover:bg-gray-300 ${activeTab === "postJob" ? "bg-gray-300  text-black" : "text-white"}`}
  onClick={() => { setActiveTab("postJob"); setIsSidebarOpen(false); }}
>
  <Edit3 className="w-5 h-5 mr-3" /> Post a Job
</li>
            {/* <li
              className={`flex items-center p-3 rounded-lg  text-white hover:text-gray-900  cursor-pointer transition duration-300 hover:bg-gray-300 ${activeTab === "status" ? "bg-gray-300" : ""}`}
              onClick={() => { setActiveTab("status"); setIsSidebarOpen(false); }}
            >
              <Activity className="w-5 h-5 mr-3" /> Status
            </li> */}
            <li
              className={`flex items-center p-3 rounded-lg hover:text-gray-900  cursor-pointer text-white transition duration-300 hover:bg-gray-300 ${activeTab === "support" ? "bg-gray-300  text-black" : "text-white"}`}
              onClick={() => { setActiveTab("support"); setIsSidebarOpen(false); }}
            >
              <HelpCircle className="w-5 h-5 mr-3" /> Support
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center justify-center w-full p-3 mt-4 bg-[#83807e] hover:bg-[#245876] rounded-lg transition duration-300"
          onClick={() => {
            sessionStorage.removeItem("user");
            navigate("/login");
          }}
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg m-4 overflow-auto">
        {renderContent()}
      </div>

      {/* Hamburger Menu Button for Mobile */}
      <button
        ref={menuButtonRef}
        className="md:hidden fixed top-4 left-4 z-60 p-3 bg-gray-800 text-white rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
