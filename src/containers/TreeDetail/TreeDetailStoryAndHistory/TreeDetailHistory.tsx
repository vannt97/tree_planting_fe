import moment from 'moment';
import Image from 'next/image';
import treeActive from 'public/icons/treeActive.svg';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { Swiper, SwiperSlide } from 'swiper/react';

const TreeDetailHistory = ({ data }) => {
  const { storyAndHistory } = useSelector((state: RootState) => state.Trees);
  const SwiperHistoryItem = useCallback(
    (item, index: number) => {
      return (
        <SwiperSlide key={item?.id} className="w-full">
          <div className="flex h-full justify-end flex-col">
            <p className="text-center text-green-primary px-2">
              {moment(item?.time).format('MM/YYYY')}
            </p>
            <p className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] text-center px-2">
              {item?.description}
            </p>
            <div
              className={`w-full text-center journey__line ${index === 0 ? 'right' : ''} ${
                index === Number(data?.treeHistory?.length - 1) ? 'left' : ''
              }`}
            >
              <Image src={treeActive} width={20} height={20} alt="tree active" />
            </div>
            <div className="w-full flex h-[90px] tablet:h-[160px] justify-center px-2 mt-3">
              <img
                src={item?.imageLinkTreePlantingSiteHistory}
                className="journey__img"
                alt="tree active"
              />
            </div>
          </div>
        </SwiperSlide>
      );
    },
    [data]
  );
  return (
    <>
      <div className="text-green-29 italic text-center px-5 mt-8 mb-8">
        <p className="mb-2">
          Cùng xem sự khác biệt của khu vực trồng cây trước và sau chiến dịch nhé!
        </p>
        <p>Hãy cảm thấy tự hào bởi chính bạn đã cùng chúng tôi tạo nên sự thay đổi tích cực này.</p>
      </div>
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
          {/* {provinceId
            ? storyAndHistory?.listHistory.map((item, index) => SwiperHistoryItem(item, index))
            : data?.treePlantingSiteHistory?.map((item, index) => SwiperHistoryItem(item, index))} */}
          {storyAndHistory?.listHistory.map((item, index) => SwiperHistoryItem(item, index))}
        </Swiper>
      </div>{' '}
    </>
  );
};

export default TreeDetailHistory;
