import React, { useState, useEffect } from 'react';
import { ClipboardCopy, Check, BookOpen } from 'lucide-react';
import {motion} from "framer-motion";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useRouter } from 'next/navigation'

// Enhanced Syntax Highlighter with Copy Button and Typewriter Effect
const CodeHighlighter = ({ code, language = 'javascript', showLineNumbers = true }) => {
  const [copied, setCopied] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let currentPosition = 0;
    const codeLines = code.split('\n');
    let currentDisplayedLines = Array(codeLines.length).fill('');
    
    const typingInterval = setInterval(() => {
      let lineIndex = 0;
      let charPosition = 0;
      let totalChars = 0;
      
      // Find which line and character position we're at
      for (let i = 0; i < codeLines.length; i++) {
        if (totalChars + codeLines[i].length >= currentPosition) {
          lineIndex = i;
          charPosition = currentPosition - totalChars;
          break;
        }
        totalChars += codeLines[i].length + 1; // +1 for newline
      }
      
      // Update the current line up to the current character
      if (lineIndex < codeLines.length) {
        currentDisplayedLines[lineIndex] = codeLines[lineIndex].substring(0, charPosition + 1);
        
        // Join all lines for display, preserving empty lines
        setDisplayedCode(currentDisplayedLines.join('\n'));
        
        // Move to next character
        currentPosition++;
        
        // Check if we've reached the end
        const totalLength = code.length + codeLines.length - 1; // Add newlines
        if (currentPosition >= totalLength) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }
    }, 30); // Adjust speed here
    
    return () => clearInterval(typingInterval);
  }, [code]);
  
  const copyToClipboard = () => {
    // Copy the current displayed code
    navigator.clipboard.writeText(displayedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg my-6 border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-300 uppercase">{language}</span>
          {isTyping && <span className="text-xs text-green-400">typing...</span>}
        </div>
        {/* <button
          onClick={copyToClipboard}
          className="p-1.5 rounded text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <Check size={16} className="text-green-400" /> : <ClipboardCopy size={16} />}
          <span className={`ml-1 text-xs ${copied ? 'text-green-400' : 'text-gray-300'}`}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button> */}
      </div>
      
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={dracula}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#282a36',
            borderRadius: 0,
            fontSize: '0.875rem',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            textAlign: 'right',
            userSelect: 'none',
            opacity: 0.7,
            paddingRight: '1em',
            borderRight: '1px solid #444',
            marginRight: '1em',
          }}
        >
          {displayedCode}
        </SyntaxHighlighter>
      </div>

    </div>
  );
};

const Docs = () => {
  // Example code snippet
  const router = useRouter();
  const exampleCode = `
  import { RecurX } from '@recurx/sdk';

// Initialize the client
const recurx = new Recurx({
  apiKey: 'your_api_key',
  environment: 'sandbox' // or 'production'
});

// Create a payment
async function createPayment() {
  try {
    const payment = await recurx.payments.create({
      amount: 1000, // $10.00
      currency: 'USD',
      description: 'Order #1234',
      customer: {
        email: 'customer@example.com'
      }
    });
    
    console.log(payment);
  } catch (error) {
    console.error(error);
  }
}`;

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight inline-block">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            The RecurX API By Developers, For Developers
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16">
          Create and manage decentralized subscription plans with our easy to use APIs, libraries to support your programming language, and interactive documentation.
        </p>
      </div>

      {/* Documentation Section */}
      <div className="container mx-auto px-4 pb-16">
          <CodeHighlighter 
            code={exampleCode} 
            language="javascript" 
          />
      </div>
      
      {/* Main documentation button - if you want an additional button outside the code block */}
      <div className="container mx-auto px-4 pb-16 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            router.push('/documentation')
            // window.location.href = '/documentation';
          }}
          className="relative inline-flex items-center gap-2 px-6 py-3 rounded-md transition-colors overflow-hidden group cursor-pointer"
        >
          {/* Background with gradient that shows on hover */}
          <button
            className="relative flex items-center bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 overflow-hidden font-medium transition-all rounded-md group cursor-pointer "
          >
            <span
              className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
            >
              <span
                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
              ></span>
            </span>
            <span
              className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
            >
              <span
                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
              ></span>
            </span>
            <span
              className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-violet-700 rounded-md group-hover:translate-x-0"
            ></span>
            <span
              className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white text-xl "
            >
               <div className='flex items-center gap-2'><BookOpen size={16} />
               Explore Documentation</div>
              </span>
          </button>
          
          {/* Content stays on top of the background */}
          {/* <div className="relative z-10 flex items-center gap-2">
            <BookOpen size={16} />
            <span className="text-lg font-medium">Explore Full Documentation</span>
          </div> */}
          
        </motion.div>
      </div>
    </div>
  );
};

export default Docs;