'use client';

import { useEffect } from 'react';

export default function FaviconSwitcher() {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
      
      favicon.rel = 'icon';
      favicon.href = isDark ? '/Recurx_Transparent_dark.ico' : '/Recurx_Transparent_light.ico';
      
      if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(favicon);
      }
    };

    // Initial favicon set
    updateFavicon();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => updateFavicon();
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return null;
}