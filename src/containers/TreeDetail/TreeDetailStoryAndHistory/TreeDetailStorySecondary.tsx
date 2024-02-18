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
const TreeDetailStorySecondary = ({ data }: any) => {
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

  // console.log("description: ", storyAndHistory.listStory[activeIndex]?.description.length);
  // let description = 'Rừng phòng hộ ven biển tỉnh Bạc Liêu có chiều dài 56km, rộng 7.778 ha. đồng thời mang tới rừng phòng hộ ven biển tỉnh Bình Liêu những cánh rừng mới. Chung tay góp sức cùng Panasonic "Vì một Việt Nam Xanh khỏe mạnh" nhé! đồng thời mang tới rừng phòng hộ ven biển tỉnh Bình Liêu những cánh rừng mới. Chung tay góp sức cùng Panasonic "Vì một Việt Nam Xanh khỏe mạnh" nhé! Diện tích không quá lớn nhưng rừng phòng hộ ven biển có ý nghĩa quan trọng trong bảo vệ môi trường, hạn chế tác động bất lợi của nước biển dâng cao làm sạt lở, đe dọa hệ sinh thái và đa dạng sinh học. Theo Ban Quản lý rừng đặc dụng - phòng hộ ven biển Bạc Liêu, tỉnh có 895 hộ với 3.582 khẩu sống xung quanh khu vực rừng phòng hộ và sinh kế từ rừng. Trong đó, 670 hộ đang sống ở khu vực ven rừng, đầu kênh, ngoài đê biển Đông. Tuy nhiên, tình trạng chặt phá rừng trái phép để lấy củi, làm đất sản xuất vẫn tiếp diễn, khiến diện tích rừng bị suy giảm. Thông qua chương trình "Sống khỏe góp xanh cùng Panasonic", Panasonic mong muốn phát đi thông điệp bảo vệ môi trường, đồng thời mang tới rừng phòng hộ ven biển tỉnh Bình Liêu những cánh rừng mới. Chung tay góp sức cùng Panasonic "Vì một Việt Nam Xanh khỏe mạnh" nhé! Chung tay góp sức cùng Panasonic "Vì một Việt Nam Xanh khỏe mạnh" nhé! Chung tay góp sức cùng Panasonic "Vì một Việt Nam Xanh khỏe mạnh" nhé! Chung tay góp sức cùng Panasonic "Vì một Việt Nam Xanh k';
  // console.log("desciption: ", description.length)

  return (
    <div className="w-full tree-detail__story">
      <div className="mb-2">
        <p className="text-black-600 text-[16px] font-bold laptop:text-[24px] mobile:text-[16px] pb-4">
          Câu chuyện {storyAndHistory.listStory[activeIndex]?.label}
        </p>
        <div className="w-[90%] h-[1px] bg-black-600 mb-4"></div>
        <span className="">
          {storyAndHistory.listStory[activeIndex]?.description}
          {/* {description} */}
        </span>
      </div>
      <div className="treeDetail__story-image">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {storyAndHistory?.listStory.map((item) => SwiperStoryItem(item))}
        </Swiper>
        {/* <div className='flex gap-4 items-center'>
            <div className='w-1/2'>
              <img src={aboutProgram.src} alt="" />
            </div>
            <div className='w-1/2'>
              <img className='w-full' src={demoTreeMap.src} alt="" />
            </div>
        </div> */}
      </div>
    </div>
  );
};

export default TreeDetailStorySecondary;
