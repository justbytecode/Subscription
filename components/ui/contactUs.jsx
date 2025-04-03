"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Phone, Mail, Send, ChevronRight } from "lucide-react";

const ContactUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="text-white  relative font-manrope">
      {/* Contact Header */}

      <section className="relative z-10  pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:justify-between items-center  mx-4 p-10">
            {/* Left column - Contact info */}
            <motion.div 
              className="w-full px-4 lg:w-1/2 xl:w-6/12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <motion.div
                  className="mb-9 text-base leading-relaxed text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="mb-9 text-base leading-relaxed text-gray-300">
                    Looking to get in touch? We'd love to hear from you! Whether you have questions about our services, 
                    want to <span className="text-blue-600">discuss partnership opportunities</span>, or need support, our team is here to help.
                  </p>
                </motion.div>

                {/* Contact Info Items */}
                <div className="space-y-8">
                  <ContactInfoItem 
                    icon={<Home size={24} />}
                    title="Our Location"
                    details="<recurXAddress>"
                    delay={0.5}
                  />
                  <ContactInfoItem 
                    icon={<Phone size={24} />}
                    title="Phone Number"
                    details="+91 <recurxPhone>"
                    delay={0.6}
                  />
                  <ContactInfoItem 
                    icon={<Mail size={24} />}
                    title="Email Address"
                    details="<RecurXEmail>"
                    delay={0.7}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right column - Contact form */}
            <motion.div 
              className="w-full px-4 lg:w-18/12 xl:w-6/12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-lg  p-8 shadow-xl sm:p-12 ">
                <form>
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    delay={0.3}
                  />
                  <ContactInputBox
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    delay={0.4}
                  />
                  <ContactInputBox
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                    delay={0.5}
                  />
                  <ContactTextArea
                    rows="6"
                    placeholder="Your Message"
                    name="message"
                    delay={0.6}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <button
                      type="submit"
                      className="w-full group rounded border border-blue-600 bg-blue-600 p-3 text-white transition hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <span>Send Message</span>
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </form>

                {/* Decorative elements */}
                <motion.div 
                  className="absolute -right-4 -top-4 z-[-1]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <svg
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                      fill="#3B82F6"
                    />
                  </svg>
                </motion.div>
                <motion.div 
                  className="absolute -bottom-6 -left-6 z-[-1]"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 0.6, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <svg
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                      fill="#3B82F6"
                      fillOpacity="0.2"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact form components with animations
const ContactTextArea = ({ rows, placeholder, name, delay = 0 }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <textarea
        rows={rows}
        placeholder={placeholder}
        name={name}
        className="w-full resize-none rounded border border-gray-700 bg-gray-900 bg-opacity-50 px-4 py-3 text-base text-white outline-none focus:border-blue-600 transition"
      />
    </motion.div>
  );
};

const ContactInputBox = ({ type, placeholder, name, delay = 0 }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full rounded border border-gray-700 bg-gray-900 bg-opacity-50 px-4 py-3 text-base text-white outline-none focus:border-blue-600 transition"
      />
    </motion.div>
  );
};

const ContactInfoItem = ({ icon, title, details, delay = 0 }) => {
  return (
    <motion.div 
      className="flex items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      <div className="mr-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded bg-blue-600/10 text-blue-600">
        {icon}
      </div>
      <div>
        <h4 className="mb-1 text-xl font-bold text-white">{title}</h4>
        <p className="text-base text-gray-400">{details}</p>
      </div>
    </motion.div>
  );
};

export default ContactUs;