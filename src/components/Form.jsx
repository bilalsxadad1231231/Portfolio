import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { personalData } from '../data/personalData';

const Form = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        // Initialize EmailJS with the correct version
        emailjs.init({
            publicKey: "gjmSO1SG2giy78JJ2",
            limitRate: true,
        });
    }, []);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          to_name: personalData.name,
          to_email: personalData.email,
          message: formData.message,
          reply_to: formData.email
      }

      const toastId = toast.loading("Sending your message...");

      try {
        const response = await emailjs.send(
          "service_l724jd8",
          "template_x7b5fk2",
          templateParams
        );

        console.log('EmailJS Response:', response);

        // Update toast to success
        toast.update(toastId, {
          render: "Message sent successfully! ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error('EmailJS Error:', error);

        // Update toast to error with more details
        toast.update(toastId, {
          render: `Failed to send message: ${error.message || 'Unknown error'} ❌`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
      }
    };

  return (
<div className='w-full md:w-1/2'>
<ToastContainer position="top-center" />   
<form onSubmit={handleSubmit}  >
 
 {/* name input field */}
<div className='mb-5'>
<label className="flex  items-center mb-2 text-border text-sm font-medium">Full Name <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
 </svg>
</label>
<input 
  type="text"
  name='name'
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your name"
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             outline-none focus:border-border focus:ring-border transition-all duration-300
             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
/>
</div>

{/* email input field  */}
<div className='mb-5'>
<label className="flex  items-center mb-2 text-border text-sm font-medium">Email <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
 </svg>
</label>
<input 
  type="email" 
  name='email' 
  value={formData.email}
  onChange={handleChange}
  placeholder="example@gmail.com"
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             outline-none focus:border-border focus:ring-border transition-all duration-300
             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
/>
</div>

{/* text area input field  */}
<div className='mb-5'>
<label className="flex  items-center mb-2 text-border text-sm font-medium">Message<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
 </svg>
</label>
     <textarea 
     name='message'
     value={formData.message} 
     onChange={handleChange}
     rows={5}
      placeholder="Write your message..."
     className="w-full px-4 py-2 border border-gray-300 rounded-lg 
             outline-none focus:border-border focus:ring-border transition-all duration-300
             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"/>
</div>

<button type='submit' className=" bg-border text-white py-3 px-4 rounded-md font-medium hover:opacity-90 transition">
          Send Message
</button>

</form>
</div>
  );
}

export default Form;
