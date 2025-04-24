"use client"
import React from 'react';
import { Twitter, Linkedin, Github, X } from "lucide-react";
import Background from './Background';
import { URLS } from './Constant';

const footerSections = [
  {
    title: "Resources",
    links: [
      { href: URLS.WEBSITE, text: "RecurX" },
      { href: "/documentation", text: "Documentation" },
      { href: "/product", text: "Product" },
      { href: "/pricing", text: "Pricing" },

    ]
  },
  {
    title: "Quick Links",
    links: [
      { href: "/team", text: "About us" },
      { href: "/contact-us", text: "Contact us" },
      { href: "/career", text: "Career" },
      { href: "/blogs", text: "Blogs" },
    ]
  },
  {
    title: "Follow us",
    links: [
      { href: "https://x.com/PayRecurx", text: "X" },
      { href: URLS.LINKEDIN_RECURX, text: "Linkedin" },
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "#", text: "Privacy Policy" },
      { href: "#", text: "Terms & Conditions" },
    ]
  }
];

const socialIcons = [
  { Icon: Linkedin, href: URLS.LINKEDIN_RECURX },
  { Icon: X, href: URLS.X_RECURX },
];

const Footer = () => {
  return (
    <footer className="px-10 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white border-t-1 border-gray-700 border-opacity-10">
      <Background />
      <div className="mx-auto p-4 py-6 lg:py-8 relative">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href={URLS.WEBSITE} className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                RecurX
              </span>
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="min-w-[80px]">
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  {section.title}
                </h2>
                <ul className="text-gray-300 font-medium">
                  {section.links.map((link) => (
                    <li key={link.text} className="mb-4">
                      <a href={link.href} className="hover:text-blue-400 transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">
            © 2025 <a href={URLS.WEBSITE} className="hover:text-blue-400 transition-colors">RecurX</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {socialIcons.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-gray-400 hover:text-blue-500 transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 ms-5"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;