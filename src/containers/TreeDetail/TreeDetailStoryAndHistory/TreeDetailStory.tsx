/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Image from 'next/image';
import treeActive from 'public/icons/treeActive.svg';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { getHistoryAndStory } from 'src/services/treeAPI';
import { useLazyGetStoryAndHistoryQuery } from 'src/services/home';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import TreeDetailHistory from './TreeDetailHistory';

const TreeDetailStory = ({ data }: any) => {
  const dispatch = useDispatch();
  const [getStoryAndHistoryById] = useLazyGetStoryAndHistoryQuery();
  const { provinces } = useSelector((state: any) => state.Trees);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [storyAndHistory, setStoryAndHistory] = useState({
    listHistory: [],
    listStory: [],
    treePlantingSiteName: '',
  });
  const [provinceName, setProvinceName] = useState('');

  useEffect(() => {
    if (data) {
      if (provinces.provinceId) {
        const getDefaultId = data?.find((d) => d.id === provinces.provinceId);
        setProvinceName(`${getDefaultId?.description}, tỉnh ${getDefaultId?.label}`);
      } else {
        const getDefaultId = data?.find((d) => d.provinceCodeInMap === 'geo-42');
        setProvinceName(`${getDefaultId?.description}, tỉnh ${getDefaultId?.label}`);
      }
    }
  }, [data, provinces]);
  useEffect(() => {
    if (!!provinces.provinceId) {
      (async () => {
        const response = await getStoryAndHistoryById({ id: provinces.provinceId }).unwrap();
        setStoryAndHistory({
          listHistory: response?.listHistory,
          listStory: response?.listStory,
          treePlantingSiteName: response?.treePlantingSiteName,
        });
        dispatch(
          getHistoryAndStory({
            listHistory: response?.listHistory,
            listStory: response?.listStory,
            treePlantingSiteName: response?.treePlantingSiteName,
          })
        );
      })();
    } else {
      if (data.length) {
        (async () => {
          const getDefaultId = data?.find((d) => d.provinceCodeInMap === 'geo-42');
          const response = await getStoryAndHistoryById({
            id: getDefaultId?.id,
          }).unwrap();
          setStoryAndHistory({
            listHistory: response?.listHistory,
            listStory: response?.listStory,
            treePlantingSiteName: response?.treePlantingSiteName,
          });
        })();
      }
    }
    return () => setStoryAndHistory({ listHistory: [], listStory: [], treePlantingSiteName: '' });
  }, [provinces, getStoryAndHistoryById, data]);

  const SwiperStoryItem = useCallback((item) => {
    return (
      <SwiperSlide key={item?.id}>
        <div className="text-center mt-3 w-full">
          <img
            src={item?.imageLinkTreePlantingsiteStory}
            alt=""
            className="w-full h-[300px]"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </SwiperSlide>
    );
  }, []);

  return (
    <div className="w-full tree-detail__story bg-white-500 laptop:pt-5 laptop:px-5 laptop:pb-0 mobile:p-0">
      <div className="mb-2">
        <p
          className="text-[16px] font-bold laptop:text-[24px] mobile:text-[16px]"
          style={{ color: '#0C321E' }}
        >
          Câu chuyện {storyAndHistory.listStory[activeIndex]?.label}
        </p>
        <span className="text-[14px] laptop:text-[16px]">
          {storyAndHistory.listStory[activeIndex]?.description}
        </span>
      </div>
      <div className="treeDetail__story-image">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {storyAndHistory?.listStory.map((item) => SwiperStoryItem(item))}
        </Swiper>
      </div>
    </div>
  );
};

export default TreeDetailStory;
