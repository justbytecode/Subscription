import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Plus, Minus } from 'lucide-react';
import FeatureLinks from './FeatureLinks';
import FeatureQr from './ui/FeatureQr';
import RecurringPaymentCards from './ui/RecurringPaymentCards';
import InvoicePaymentsCard from './ui/InvoicePaymentsCard';



const FeatureComponent = () => {
  const [openItem, setOpenItem] = useState('links');
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

  const paymentOptions = [

    {
      id: 'recurring',
      title: 'Recurring payments',
      subtitle: 'Subscription businesses choice',
      description: 'Subscription-based payments for your business. Your client needs to set it up just once to be charged regularly.',
      defaultOpen: false,
      component: "INVOICES"
    },
    {
      id: 'qr',
      title: 'QR',
      subtitle: 'Scan and Pay',
      description: 'Scan and Pay through Crypto on RecurX, Scan and Pay Feature.',
      defaultOpen: false,
      component: "featureQR"

    },
    {
      id: 'links',
      title: 'Payment links',
      description: 'Create shareable payment links for your products or services.',
      defaultOpen: true,
      component: "INVOICES"
    },
    {
      id: 'invoices',
      title: 'Invoices',
      description: 'Send professional invoices to your clients for one-time payments.',
      defaultOpen: false,
      component: "INVOICES"
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? "recurring" : id);
  };

  // Animation variants for accordion items
  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const getComponentToRender = (componentName) => {
    switch (componentName) {
      case 'invoices':
        return <InvoicePaymentsCard />;
        case 'recurring':
          return <RecurringPaymentCards />
        case "qr":
          return <FeatureQr/>;
          case "links":
        return <FeatureLinks/>;
      default:
        return <FeatureQr/>
    }
  }

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

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl animate-slide-in">
        <div className="w-full lg:w-1/2 p-6">
          <div className="space-y-0">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className="relative border-b border-gray-800 py-5"
              >
                <div
                  className="flex items-center justify-between cursor-pointer py-2 transition-all duration-300 hover:opacity-50"
                  onClick={() => toggleItem(option.id)}
                >
                  <div>
                    <h3 className="text-xl font-medium">{option.title}</h3>
                    {option.subtitle && (
                      <p className="text-sm text-white/70 mt-1">{option.subtitle}</p>
                    )}
                  </div>

                  <button
                    className={`bg-transparent border border-gray-800 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-300 ${openItem === option.id ? 'bg-white transform rotate-0' : 'transform rotate-0'}`}
                    aria-label={openItem === option.id ? "Collapse" : "Expand"}
                  >
                    <span className={openItem === option.id ? 'text-black' : 'text-white'}>
                      {openItem === option.id ? (
                        <Minus className="h-3 w-3" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                </div>

                <motion.div
                  initial={false}
                  animate={openItem === option.id ? "open" : "closed"}
                  variants={accordionVariants}
                  className="overflow-hidden"
                >
                  {option.description && (
                    <div className="pt-3 pb-1">
                      <p className="text-white/70">{option.description}</p>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full lg:w-1/2">
          {/* Image Based on the selection */}
          {
            getComponentToRender(openItem)
          }
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureComponent;