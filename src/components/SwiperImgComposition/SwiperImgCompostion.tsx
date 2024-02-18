import { useEffect, useMemo, useState } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
export default function SwiperImgCompostion({ files, index, setIndexImage }) {
  const [indexImage, setIndex] = useState(0);
  const imgSilder = useMemo(() => {
    return files?.map((item: any, index: number) => {
      return (
        <SwiperSlide key={index} className="pb-[10px] laptop:pb-[30px]">
          <div className="relative h-[100%] overflow-hidden rounded-xl tablet:rounded-2xl w-[80%] mx-auto ">
            <Image src={item} alt="" layout="fill" objectFit="contain" />
          </div>
        </SwiperSlide>
      );
    });
  }, [files]);

  return (
    <div className="relative h-[100%] w-[100%] mx-auto" data-index={indexImage}>
      {files.length > 1 ? (
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          // navigation
          navigation={{
            nextEl: '.img-composition-next-btn',
            prevEl: '.img-composition-prev-btn',
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-[100%] "
          onActiveIndexChange={(swiper) => {
            // setIndexImage(swiper.activeIndex);
            setIndex(swiper.activeIndex);
          }}
        >
          {imgSilder}
          <div className="img-composition-next-btn"></div>
          <div className="img-composition-prev-btn"></div>
        </Swiper>
      ) : (
        <div className="pb-0 laptop:pb-[30px] h-full">
          <div className="relative h-full">
            <Image src={files[0]} alt="" layout="fill" objectFit="contain" />
          </div>
        </div>
      )}
    </div>
  );
}
