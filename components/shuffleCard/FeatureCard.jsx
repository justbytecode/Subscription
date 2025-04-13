import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion'
import './styles.css';


const ShuffleCardSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Array of words to cycle through
  const words = [
    "Crypto Payments", "with Security", "Subscription", "Multichain Payments"
  ];

  // Typing speed (milliseconds)
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseBeforeDeleting = 1500;
  const pauseBeforeTyping = 500;

  useEffect(() => {
    let timeout;

    if (!isDeleting && text === words[wordIndex]) {
      // Finished typing a word, pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseBeforeDeleting);
    }
    else if (isDeleting && text === '') {
      // Finished deleting, move to next word and pause before typing
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      timeout = setTimeout(() => { }, pauseBeforeTyping);
    }
    else if (isDeleting) {
      // Deleting characters
      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deletingSpeed);
    }
    else {
      // Typing characters
      timeout = setTimeout(() => {
        setText(words[wordIndex].slice(0, text.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }} className="flex flex-col lg:flex-row justify-center items-center gap-8 min-h-screen px-4 py-12 md:p-12 z-50">
      <div className="text-center lg:text-left mb-8 lg:mb-0">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl tracking-tight leading-tight animate-fade-in">
          We make it easy for you to plug<br />into digital payments <br /> <span className="text-green-500">{text}</span>
          <span className="opacity-100 animate-pulse" aria-hidden="true">|</span>
        </h2>
      </div>

      {/* shuffel card ui */}
      <div>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      </div>

    </motion.div>
  );
}

export default ShuffleCardSection