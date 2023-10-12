import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>(0);

  const handleWindowResize = () => {
    if (typeof window !== 'undefined') {
      setWidth(window?.innerWidth);
      setHeight(window?.innerHeight);
    }
  };

  useEffect(() => {
    // component is mounted and window is available
    setWidth(window.innerWidth)
  }, []);


  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return {
    width,
    height,
  };
};

export default useWindowSize;
