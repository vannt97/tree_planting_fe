/* eslint-disable @next/next/no-img-element */
import React from 'react';
import treeActive from 'public/icons/treeActive.svg';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';

const Process = ({ data }: any) => {
  return (
    <div className="mb-10 mt-4">
      <p className="text-center text-green-primary text-[24px] px-2 font-bold mt-6 uppercase">
        Hành trình
      </p>
      <p className="text-center text-green-primary text-[24px] px-2 font-bold mb-2 uppercase">
        Sinh trưởng của cây
      </p>

      <div className="journey__swiper">
        <Swiper
          modules={[]}
          spaceBetween={0}
          breakpoints={{
            0: {
              slidesPerView: 2.2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 0,
            },
            1028: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
        >
          {data?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={item?.id} className="w-full">
                <div className="flex h-full justify-end flex-col">
                  <p className="text-center text-green-primary px-2">
                    {moment(item?.timeLine).format('MM/YYYY')}
                  </p>
                  <p className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] text-center px-2">
                    {item?.label}
                  </p>
                  <div
                    className={`w-full text-center journey__line ${index === 0 ? 'right' : ''} ${
                      index === data.length - 1 ? 'left' : ''
                    }`}
                  >
                    <Image src={treeActive} width={20} height={20} alt="tree active" />
                  </div>
                  <div className="w-full flex h-[90px] tablet:h-[160px] justify-center px-2 mt-3">
                    <img
                      src={item?.imageLinkTreeGrouwthJourney}
                      className="journey__img"
                      alt="tree active"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Process;
