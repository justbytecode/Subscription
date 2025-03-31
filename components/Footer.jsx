"use client"
import React from 'react';
import { Twitter, Linkedin, Github, X } from "lucide-react";
import Background from './Background';
import { URLS } from './Constant';

const Footer = () => {
  return (
    <footer className="px-10 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white   relative border-t-1  border-gray-700 border-opacity-10 ">
      <Background/>
      <div className="mx-auto p-4 py-6 lg:py-8 relative">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href={URLS.WEBSITE} className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">RecurX</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Resources</h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href={URLS.WEBSITE}className="hover:text-blue-400 transition-colors">RecurX</a>
                </li>
                <li>
                  <a href="/documentation"  className="hover:text-blue-400 transition-colors">Documentation</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Follow us</h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="https://x.com/PayRecurx" className="hover:text-blue-400 transition-colors">X</a>
                </li>
                <li className="mb-4">
                  <a href={URLS.LINKEDIN_RECURX} className="hover:text-blue-400 transition-colors">Linkedin</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Legal</h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">© 2025 <a href={URLS.WEBSITE} className="hover:text-blue-400 transition-colors">RecurX</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 ms-5">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 ms-5">
              <X size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;