import React from 'react';
import { Twitter, Linkedin, Github, Mail, Globe, X } from "lucide-react";
import Image from 'next/image';

export const TeamMemberCard = ({ member }) => {
  const { name, role, image, bio, social } = member;
  
  return (
    <div className="bg-gray-900/50 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300 group h-full backdrop-blur-sm border border-gray-800 hover:border-blue-600/50 duration-400 shadow-xs" >
      
      <div 
        className="w-56 h-56 mb-4 overflow-hidden rounded-full border-1 border-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-105"
      >
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
      <p className="text-gray-400 uppercase tracking-wider text-sm mb-4">{role}</p>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-70 my-2" />

      <p className="text-gray-300 mb-6 flex-grow">{bio}</p>

      {/* Social Icons at the Bottom */}
      <div className="flex space-x-4 mt-auto">
        {social.twitter && (
          <a href={social.twitter} target='_blank' className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition hover:-translate-y-1 hover:scale-110">
            {social.twitter.includes('x.com') ? <X size={20} /> : <Twitter size={20} />}
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target='_blank' className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition hover:-translate-y-1 hover:scale-110">
            <Linkedin size={20} />
          </a>
        )}
        {social.github && (
          <a href={social.github} target='_blank' className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition hover:-translate-y-1 hover:scale-110">
            <Github size={20} />
          </a>
        )}
        {social.email && (
          <a href={`mailto:${social.email}`} target='_blank'  className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition hover:-translate-y-1 hover:scale-110">
            <Mail size={20} />
          </a>
        )}
        {social.website && (
          <a href={social.website} target='_blank' className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition hover:-translate-y-1 hover:scale-110">
            <Globe size={20} />
          </a>
        )}
      </div>
    </div>
  );
};
