import Image from 'next/image';
import playIcon from 'public/icons/play-icon.svg';
import { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ url, poster }) {
  const [isShowPlayButton, setIsShowPlayButton] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>();
  const playVideo = () => {
    const { current: video } = videoRef;
    if (isLoaded) {
      setIsShowPlayButton(false);
      video.controls = true;
      video.muted = false;
      video.play();
      video.onpause = function () {
        video.controls = false;
        video.muted = true;
        setIsShowPlayButton(true);
      };
      // onPlayVideo();
    }
  };
  useEffect(() => {
    const { current: video } = videoRef;
    video.load();
    // if (
    //   (checkBrowser() == 'Zalo_Browser' && getMobileOperatingSystem() == 'iOS') ||
    //   checkBrowser() == 'FB_Browser'
    // ) {
    //   if (checkBrowser() == 'Zalo_Browser') {
    //     setIsLoaded(true);
    //   }
    // }
    video.addEventListener('loadeddata', (e) => {
      //Video should now be loaded but we can add a second check
      setIsLoaded(true);
    });
  }, [url, poster]);
  return (
    <div className="relative h-[100%] " data-index={0}>
      {isShowPlayButton && (
        <div
          onClick={playVideo}
          className="play cursor-pointer hidden laptop:block absolute w-[20px] laptop:w-[50px] top-[50%] -translate-x-1/2 -translate-y-1/2 left-[50%] z-10"
        >
          <Image src={playIcon} width={playIcon.width} height={playIcon.height} />
        </div>
      )}
      <div className="h-[100%]">
        <video
          ref={videoRef}
          className="relative z-1 h-[100%] w-[100%]"
          preload="metadata"
          muted
          playsInline
          loop
        >
          <source src={url} type="video/mp4" />
          <source src={url} type="video/mov" />
        </video>
      </div>
    </div>
  );
}
