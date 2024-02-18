/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Image from 'next/image';
import treeActive from 'public/icons/treeActive.svg';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { getHistoryAndStory } from 'src/services/treeAPI';
import { useLazyGetStoryAndHistoryQuery } from 'src/services/home';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import TreeDetailHistory from './TreeDetailHistory';
import productHome5 from 'public/images/product-home-5.png';
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
        <div className="text-center mt-3 w-full w-[85%] mx-auto">
          <img src={item?.imageLinkTreePlantingsiteStory} alt="" className="w-full " />
        </div>
      </SwiperSlide>
    );
  }, []);

  return (
    <div className="w-full tree-detail__story  laptop:pt-5  laptop:pb-0 mobile:p-0">
      <div className="mb-2">
        <p className="mt-4 leading-auto tablet:mt-0 text-[16px] font-bold laptop:text-[24px] mobile:text-[16px] mb-2">
          Câu chuyện {storyAndHistory.listStory[activeIndex]?.label}
        </p>
        <span className="">{storyAndHistory.listStory[activeIndex]?.description}</span>
      </div>
      <div className="treeDetail__story-image">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {storyAndHistory?.listStory.map((item) => SwiperStoryItem(item))}
        </Swiper>
      </div>
    </div>
  );
};

export default TreeDetailStory;
