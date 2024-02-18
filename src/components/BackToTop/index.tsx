import { useEffect, useState } from 'react';
import BackToTopIcon from 'public/icons/backToTopV2.svg';
import Image from 'next/image';
function BackToTop() {
  const [scroll, setScroll] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  useEffect(() => {
    if (typeof Window !== 'undefined') {
      setScreenHeight(window.innerHeight);
    }
    const handleScroll: EventListener = (e: Event) => {
      const window = e.currentTarget as Window;
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scroll]);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div
      onClick={handleScrollToTop}
      className={`backToTop cursor-pointer ${
        scroll && screenHeight && (scroll - screenHeight >= 200 ? 'active' : '')
      }`}
    >
      <Image className='scale-[0.7]' layout="fill" src={BackToTopIcon} alt="Back To Top" />
    </div>
  );
}

export default BackToTop;
