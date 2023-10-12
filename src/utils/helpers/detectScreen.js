import { useEffect, useState } from 'react';

export default function useWindowSize() {
  function getSize() {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTM = windowSize?.width <= 1024;
  const isSM = windowSize?.width < 768;
  const isMD = windowSize?.width >= 768 && windowSize?.width < 1024;
  const isML = windowSize.width < 1200;
  const isLG = windowSize?.width > 1024 && windowSize?.width < 1280;
  const isXL = windowSize?.width >= 1280 && windowSize?.width < 1536;
  const is2XL = windowSize?.width >= 1536;
  const isSmTablet = windowSize?.width >= 768 && windowSize?.width < 992;
  return { isTM, isML, isSM, isMD, isLG, isXL, is2XL, isSmTablet };
}

// isMobile: 375px -> 767px;
// isSmallTablet: 768px -> 991px;
// isLargeTablet: 992px -> 1023px;
// isSmallLaptop: 1024px -> 1199px;
// isLargeLaptop: 1200px -> 1399px;
// isDesktop: 1400px -> ...
