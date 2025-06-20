"use client"
import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Linkedin, X,  } from 'lucide-react';
import { URLS } from './Constant';
import { LinkedInIcon } from './icons/linkedin-icon';
import { XIcon } from './icons/x-icon';

const Footer = () => {
  return (
   
    <footer className="py-12 border-white/10 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden relative font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            RecurX
          </motion.div>
          <motion.p
            className="text-white/70 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The future of payments is here. Zero fees, instant settlements, global reach.
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href={URLS.X_RECURX} className="text-white/70 hover:text-white transition-colors">
            <XIcon className="h-7 w-7 text-white duration-300 font-semibold" />

            </a>
            <a href={URLS.LINKEDIN_RECURX} className="text-white/70 hover:text-white transition-colors cursor-pointer">
            <LinkedInIcon className="h-7 w-7 text-white duration-300 font-semibold" />

            </a>
            {/* <a href="#" className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </a> */}
          </motion.div>
        </div>

        <div>
          <motion.h3
            className="text-lg font-semibold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Links
          </motion.h3>
          <motion.ul
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <li>
              <a href="/product" className="text-white/70 hover:text-white transition-colors">
                Product
              </a>
            </li>
            <li>
              <a href="/pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="/careers" className="text-white/70 hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="/airdrop" className="text-white/70 hover:text-white transition-colors">
                Airdrop
              </a>
            </li>
          </motion.ul>
        </div>

        <div>
          <motion.h3
            className="text-lg font-semibold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Company
          </motion.h3>
          <motion.ul
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <li>
              <a href="/about-us" className="text-white/70 hover:text-white transition-colors">
                About us
              </a>
            </li>
            {/* <li>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Blog
              </a>
            </li> */}
            <li>
              <a href="/contact-us" className="text-white/70 hover:text-white transition-colors">
                Contact us
              </a>
            </li>
            {/* <li>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Press
              </a>
            </li> */}
          </motion.ul>
        </div>

        <div>
          <motion.h3
            className="text-lg font-semibold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Legal
          </motion.h3>
          <motion.ul
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <li>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Compliance
              </a>
            </li>
          </motion.ul>
        </div>
      </div>

      <motion.div
        className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        © {new Date().getFullYear()} RecurX. All rights reserved.
      </motion.div>
    </div>
  </footer>
  
  );
};

export default Footer;