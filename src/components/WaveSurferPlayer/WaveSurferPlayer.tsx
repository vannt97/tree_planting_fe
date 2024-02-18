import { useCallback, useEffect, useRef, useState } from 'react';
import { useWavesurfer } from 'src/app/hooks/useWavesurfer';
import dbArrow from 'public/icons/db-arrow.svg';
import playIcon from 'public/icons/play-icon.svg';
import Image from 'next/image';
export default function WaveSurferPlayer(props: any) {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <div data-index={0} className="waveSufer-wrapper w-full hidden laptop:flex flex-wrap items-center px-4 ">
        <div className="waveSufer-controls flex items-center justify-center tablet:justify-start w-[25%]">
          <div className="flex ">
            <Image src={dbArrow} width={dbArrow.width} height={dbArrow.height} />
          </div>
          <div className="mx-4 flex cursor-pointer" onClick={onPlayClick}>
            <Image src={playIcon} width={playIcon.width} height={playIcon.height} />
          </div>
          <div className="flex">
            <Image
              src={dbArrow}
              width={dbArrow.width}
              height={dbArrow.height}
              className="-scale-[1]"
            />
          </div>
        </div>
        <div className={`waveSufer-wave w-[75%] pl-3`}>
          <div ref={containerRef} />
          {/* <button onClick={onPlayClick} style={{ marginTop: '1em' }}>
        {isPlaying ? 'Pause' : 'Play'}
      </button> */}
        </div>
      </div>
    </>
  );
}
