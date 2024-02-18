/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Image from 'next/image';
import treeActive from 'public/icons/treeActive.svg';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { getHistoryAndStory } from 'src/services/treeAPI';
import { useLazyGetStoryAndHistoryQuery } from 'src/services/home';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import TreeDetailHistory from './TreeDetailHistory';
import aboutProgram from 'public/images/about-program-2.jpeg';
import demoTreeMap from 'public/images/demo-tree-map.png';
const TreeDetailStoryTreesJourney = ({ data }: any) => {
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
        {/* <div className="text-center mt-3 w-full">
          <img src={item?.imageLinkTreePlantingsiteStory} alt="" className="w-full " />
        </div> */}
        <div className="flex flex-wrap items-center w-[85%] mobileSM:w-[92%] mx-auto">
          <div className="w-full mobileSM:w-1/2 p-2">
            <img src={aboutProgram.src} alt="" />
          </div>
          <div className="w-full mobileSM:w-1/2 p-2">
            <img className="w-full" src={demoTreeMap.src} alt="" />
          </div>
        </div>
      </SwiperSlide>
    );
  }, []);

  return (
    <div className="w-full tree-detail__story">
      <div className="mb-6">
        <p className="text-white-500 text-[16px] font-bold laptop:text-[24px] mobile:text-[16px] pb-4">
          Câu chuyện {storyAndHistory.listStory[activeIndex]?.label}
        </p>
        <div className="w-[90%] h-[1px] bg-white-500 mb-4"></div>
        <span className=" text-white-500">
          {storyAndHistory.listStory[activeIndex]?.description}
        </span>
      </div>
      <div className="treeDetail__story-image">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {storyAndHistory?.listStory.map((item) => SwiperStoryItem(item))}
         
        </Swiper>

        {/* <div className="flex gap-4 items-center">
          <div className="w-1/2">
            <img src={aboutProgram.src} alt="" />
          </div>
          <div className="w-1/2">
            <img className="w-full" src={demoTreeMap.src} alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TreeDetailStoryTreesJourney;
