import { ReactElement, memo, useEffect, useMemo, useRef, useState } from 'react';
import decorLeaf11 from 'public/images/decor-leaf-11.png';
import treesJourneyDemo from 'public/images/trees-journey-demo.png';
import itemThuCamOn from 'public/images/item-thu-cam-on.png';
import bgAboutProgram from 'public/images/bg-about-program.png';
import bgTreesJourneyBottom from 'public/images/trees-journey-bottom.png';
import MapTreesJourney from '../TreeDetail/MapTreesJourney';
import bgTreesJourneyBottomBlur from 'public/images/trees-journey-bottom-blur.png';
import { useRouter } from 'next/router';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  useLazyGetCampaignIsRunningQuery,
  usePutReadyToPlayMutation,
  useUpdateTotalShareMutation,
} from 'src/services/treeAPI';
import { encodeBase64, slugify } from 'src/utils/helpers/common';
import copy from 'copy-to-clipboard';
import { message } from 'antd';
import MapIframe from 'src/constant/MapIframe.json';
import TreeImage from 'public/images/treeDetail.png';
import moment from 'moment';
import processTree1 from 'public/images/process-tree-1.png';
import processTree2 from 'public/images/process-tree-2.png';
import processTree3 from 'public/images/process-tree-3.png';
import CertificateComponent from 'src/components/CertificateComponent';
import { FacebookShareButton } from 'react-share';
import Image from 'next/image';
import copyIcon from 'public/icons/copy.svg';
import downloadIcon from 'public/icons/download.svg';
import facebookI from 'public/icons/facebook.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import TimeLineLabel2 from 'public/images/timeline-label-2.png';
import TimeLineLabel1 from 'public/images/timeline-label.png';
import { TREES } from 'src/constant/trees';
import decorLeaf12 from 'public/images/decor-leaf-12.png';
import decorLeaf10 from 'public/images/decor-leaf-10.png';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
const TreesJourney = ({ data, getTracking, username, trackingData }: any) => {
  // Tree detail -----------------------------------------------------
  const router = useRouter();

  const btnDownload = useRef<any>(null);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [oldTreeName, setOldTreeName] = useState<string>('');
  const [mapLocation, setMapLocation] = useState<{
    center: { lat: number; lng: number };
    zoom: number;
  }>({ center: { lat: 0, lng: 0 }, zoom: 10 });
  const [onUpdateTotalShare] = useUpdateTotalShareMutation();
  const [updateHistory] = usePutReadyToPlayMutation();
  const [getCampaignIsRunning] = useLazyGetCampaignIsRunningQuery();

  useEffect(() => {
    setOldTreeName(data?.treeName || username);
  }, [data]);

  useEffect(() => {
    if (data && Object?.keys(data)?.length) {
      setMapLocation({
        center: {
          lat: Number(data?.latitude),
          lng: Number(data?.longitude),
        },
        zoom: 10,
      });
    }
  }, [data]);

  const handleCopyUrlCertificate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    copy(
      `${window.location.origin}/certificate?name=${encodeBase64(
        `${username ?? ''}`
      )}&treeCode=${encodeBase64(data.publicCode)}`
    );
    // navigator.clipboard.writeText(
    //   `${window.location.origin}/certificate?name=${encodeBase64(
    //     `${localStorage.getItem('user_name') ?? ''}`
    //   )}&treeCode=${encodeBase64(data.publicCode)}`
    // );
    message.success({
      content: 'Đã copy thành công!',
      duration: 5,
    });
  };

  const handleDownloadCertificate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    btnDownload.current.click();
  };

  const GoogleMap = useMemo(() => {
    if (data?.provinceCodeInMap) {
      const url = MapIframe.find((iframe) => iframe.key === data?.provinceCodeInMap)?.url;
      if (url) {
        return (
          <div className="h-full">
            <div className="h-full">
              <div className="" style={{ width: '100%', height: '100%' }}>
                <iframe src={url} width="100%" height="100%"></iframe>
              </div>
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }, [data]);

  const onShareFacebook = async () => {
    try {
      await onUpdateTotalShare({ publicCode: router.query.id }).unwrap();
      const response = await getCampaignIsRunning({
        publicCode: router?.query?.id as string,
      }).unwrap();
      if (response?.data) {
        if (response?.data?.campaignDuration?.length !== 0) {
          await updateHistory({ publicCode: router.query.id }).unwrap();
          router.push(`/wheel/${router.query.id}`);
        }
      }
    } catch (error) {
      if (error?.data) {
        if (error?.data?.StatusCode === 404) {
          return;
        }
      }
    }
  };

  const { storyAndHistory } = useSelector((state: RootState) => state.Trees);

  useEffect(() => {
    document.querySelector('video')?.play();
  }, []);

  const treeDetailImg = useMemo(() => {
    if (!data) return;
    let index = TREES.findIndex((item) => {
      return item?.name === slugify(data?.treeName);
    });
    if (index != -1) {
      return (
        <img className="w-[45%] laptop:w-[80%] mx-auto " src={TREES[index].urlDetail} alt="" />
      );
    }
    return <img className="w-[45%] laptop:w-[80%] mx-auto " src={itemThuCamOn.src} alt="" />;
  }, [data]);

  const timeLineContent = useMemo(() => {
    let isFirstTimeLine = false;
    let isMidTimeLine = false;
    let isLastTimeLine = false;
    console.log("demo:",data?.treeHistory )
    // console.log("date data: ",moment(data?.treeHistory[2]?.timeLine).format('DD/MM/YYYY'))
    // if (moment() > moment(data?.treeHistory[2]?.timeLine)) {
    //   console.log('m,oment: ', true);
    // } else {
    //   console.log('m,oment: ', false);
    // }
    if(moment() > moment(data?.treeHistory[2]?.timeLine)){
      isFirstTimeLine = true;
    }
    if(moment() > moment(data?.treeHistory[1]?.timeLine)){
      isMidTimeLine = true;
    }
    if(moment() > moment(data?.treeHistory[0]?.timeLine)){
      isLastTimeLine = true;
    }
    return (
      <>
        <div
          id="timeline-desktop"
          className="hidden laptop:block w-[100%] laptop:w-[60%] desktop:w-[50%] relative"
        >
          <div className={`${isFirstTimeLine ? '' : 'opacity-50'} absolute left-[13.5%] top-[21%] desktop:top-[24%] desktop:left-[14.5%] desktopXL:top-[27%] desktopXL:left-[15.5%] `}>
            <img src={TimeLineLabel1.src} alt="" />
            <p className="text-white-500 font-bold absolute top-[27%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full text-center">
              {data?.treeHistory[2]?.timeLine
                ? `${moment(data?.treeHistory[2]?.timeLine)?.format('DD')} Th ${moment(
                    data?.treeHistory[2]?.timeLine
                  )?.format('MM')}`
                : ''}
            </p>
          </div>
          <div className={`${isMidTimeLine ? '' : 'opacity-50'}  absolute top-[7%] left-[45.5%] desktopXL:top-[9%] desktopXL:left-[46.5%] `}>
            <img src={TimeLineLabel1.src} alt="" />
            <p className="text-white-500 font-bold absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full text-center">
              {data?.treeHistory[1]?.timeLine
                ? `${moment(data?.treeHistory[1]?.timeLine)?.format('DD')} Th ${moment(
                    data?.treeHistory[1]?.timeLine
                  )?.format('MM')}`
                : ''}
            </p>
          </div>
          <div className={`${isLastTimeLine ? '' : 'opacity-50'} absolute -top-[2%] left-[79%] desktopXL:top-[0%] desktopXL:left-[80%] `}>
            <img src={TimeLineLabel1.src} alt="" />
            <p className="text-white-500 font-bold absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full text-center">
              {data?.treeHistory[0]?.timeLine
                ? `${moment(data?.treeHistory[0]?.timeLine)?.format('DD')} Th ${moment(
                    data?.treeHistory[0]?.timeLine
                  )?.format('MM')}`
                : ''}
            </p>
          </div>
          <img className="absolute top-[15%] left-[18%] w-[68%]" src={TimeLineLabel2.src} alt="" />
          <div className="w-[90%] mx-auto flex flex-col laptop:flex-row h-full justify-between items-end text-white-500">
            <div className={`${isFirstTimeLine ? '' : 'opacity-50'}`}>
              <img className="mb-8 mx-auto" src={processTree1.src} alt="" />
              <p className="mb-2 desktop:mb-8 w-[95%] desktop:w-[86%] mx-auto text-center tree-detail__process-title">
                {/* {data?.treeHistory[2]?.title
                        ? data?.treeHistory[2]?.title
                        : 'Cây của bạn đã có tên trong danh sách trồng'} */}
                Cây của bạn đã có tên trong danh sách trồng
              </p>
            </div>
            <div className={`${isMidTimeLine ? '' : 'opacity-50'}`}>
              <img className="mb-8 mx-auto" src={processTree2.src} alt="" />
              <p className="mb-2 desktop:mb-8 w-[95%] desktop:w-[86%] mx-auto text-center tree-detail__process-title">
                {/* {data?.treeHistory[1]?.title
                        ? data?.treeHistory[1]?.title
                        : 'Khu vực trồng cây sẵn sàng đón cây về rừng'} */}
                Khu vực trồng cây sẵn sàng đón cây về rừng
              </p>
            </div>
            <div className={`${isLastTimeLine ? '' : 'opacity-50'}`}>
              <img className="mb-8 mx-auto" src={processTree3.src} alt="" />
              <p className="mb-2 desktop:mb-8 w-[95%] desktop:w-[86%] mx-auto text-center tree-detail__process-title">
                {/* {data?.treeHistory[0]?.title
                        ? data?.treeHistory[0]?.title
                        : 'Tuyệt vời, cây của bạn đã được trồng'} */}
                Tuyệt vời, cây của bạn đã được trồng
              </p>
            </div>
          </div>
        </div>

        <div
          id="timeline-mobile"
          className="flex justify-center laptop:hidden flex-col relative text-white-500 "
        >
          <div className={`text-center  flex h-[100%] ${isFirstTimeLine ? '' : 'opacity-50'}`}>
            <div className="relative mr-4 laptop:mr-10">
              <div className="absolute top-0 z-[1] h-full w-[2px] bg-black-600 left-[50%] -translate-x-1/2"></div>
              <div className="relative -translate-y-3 z-[2]">
                <img className=" w-full mx-auto" src={TimeLineLabel1.src} alt="" />
              </div>
              <p className="w-full absolute z-[3] top-[5%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
                {moment(data?.treeHistory[2]?.timeLine)?.format('DD')} Th
                {moment(data?.treeHistory[2]?.timeLine)?.format('MM')}
              </p>
            </div>
            <div className="w-full">
              <p className="mb-4 w-[60%] mx-auto">
                {data?.treeHistory[2]?.title
                  ? data?.treeHistory[2]?.title
                  : 'Cây của bạn đã có tên trong danh sách trồng'}
              </p>
              <img className="mx-auto mb-4" src={processTree1.src} alt="" />
            </div>
          </div>
          <div className={`text-center  flex h-[100%] ${isMidTimeLine ? '' : 'opacity-50'}`}>
            <div className="relative mr-4 laptop:mr-10">
              <div className="absolute top-0 z-[1] h-full w-[2px] bg-black-600 left-[50%] -translate-x-1/2"></div>
              <div className="relative -translate-y-3 z-[2]">
                <img className=" w-full mx-auto" src={TimeLineLabel1.src} alt="" />
              </div>
              <p className="w-full absolute z-[3] top-[5%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
                {moment(data?.treeHistory[1]?.timeLine)?.format('DD')} Th
                {moment(data?.treeHistory[1]?.timeLine)?.format('MM')}
              </p>
            </div>
            <div className="w-full">
              <p className="mb-4 w-[60%] mx-auto">
                {data?.treeHistory[1]?.title
                  ? data?.treeHistory[1]?.title
                  : 'Khu vực trồng cây sẵn sàng đón cây về rừng'}
              </p>
              <img className="mx-auto mb-4" src={processTree2.src} alt="" />
            </div>
          </div>
          <div className={`text-center  flex h-[100%] ${isLastTimeLine ? '' : 'opacity-50'}`}>
            <div className="relative mr-4 laptop:mr-10">
              <div className="absolute top-0 z-[1] h-full w-[2px] bg-black-600 left-[50%] -translate-x-1/2"></div>
              <div className="relative -translate-y-3 z-[2]">
                <img className=" w-full mx-auto" src={TimeLineLabel1.src} alt="" />
              </div>
              <p className="w-full absolute z-[3] top-[5%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
                {moment(data?.treeHistory[0]?.timeLine)?.format('DD')} Th
                {moment(data?.treeHistory[0]?.timeLine)?.format('MM')}
              </p>
            </div>
            <div className="w-full">
              <p className="mb-4 w-[60%] mx-auto">
                {data?.treeHistory[0]?.title
                  ? data?.treeHistory[0]?.title
                  : 'Tuyệt vời, cây của bạn đã được trồng'}
              </p>
              <img className="mx-auto mb-4" src={processTree3.src} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }, [data]);
  return (
    <>
      <section className="trees-journey">
        <article>
          <div className="relative mb-10 laptop:mb-8 desktop:mb-20">
            <img
              className="hidden tablet:block absolute top-0 right-0"
              src={decorLeaf11.src}
              alt=""
            />
            <h1 className="text-center tablet:text-left w-[90%] mb-4 laptop:mb-16 mx-auto pt-10 color-primary font-bold text-2xl tablet:text-2.5xl">
              {username} ơi, cùng xem hành trình{' '}
              <span className="inline tablet:block">cây của bạn đến với rừng nhé!</span>
            </h1>
            <div className="relative pt-10 pb-0 desktop:py-10 hidden laptop:block mb-20">
              <div className="relative bg-white-500  mx-auto w-[300px] desktop:w-[350px] aspect-square rounded-full border-solid border-2 border-green-primary">
                <div className="w-full h-full overflow-hidden">
                  <img
                    className="absolute w-[90%] h-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                    src={
                      data?.imageLinkTreeType ||
                      data?.imageLinkTreePlantingSite ||
                      treesJourneyDemo.src
                    }
                    alt=""
                  />
                </div>
                <div className="hidden laptop:block rounded-full tree-detail__name top-0 right-[110%] bg-white-500 absolute ">
                  <div className="w-max tree-detail__session-1-part px-6 desktopXL:px-16 py-4 rounded-full border-2 inline-block border-green-primary">
                    <p className="">Người đăng ký trồng</p>
                    <b className="">Anh/Chị {username}</b>
                  </div>
                </div>
                <div className="hidden laptop:block rounded-full tree-detail__category bg-white-500 absolute top-0 left-[110%]">
                  <div className="w-max tree-detail__session-1-part px-10 py-4 rounded-full border-2 inline-block border-green-primary">
                    <p className="">Loài cây</p>
                    {data?.treeHistory[2].treeName ? (
                      <b>{data?.treeHistory[2].treeName}</b>
                    ) : (
                      <b>Tràm</b>
                    )}
                  </div>
                  <div className=" rounded-full absolute left-[105%] desktop:left-[120%]  top-0 w-[270px] laptop:w-[190px] desktopSM:w-[250px] desktop:w-[300px]">
                    <div className="tree-detail__session-1-part px-8 desktop:px-8 py-4 rounded-full border-2 inline-block border-green-primary">
                      <p className="">Nơi trồng</p>
                      {data?.location ? (
                        <b>{data?.location}</b>
                      ) : (
                        <b>Khu bảo tồn thiên nhiên Phong Điền</b>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden laptop:block rounded-full tree-detail__place bg-white-500 absolute bottom-0 left-[100%] desktopSM:left-[110%] w-[350px] desktopSM:w-[420px] desktop:w-[465px] desktopXXL:w-[550px]">
                  <div className="tree-detail__session-1-part relative z-10  px-10 py-4 desktop:py-4 rounded-full border-2 inline-block border-green-primary">
                    <b className="">Đặc điểm</b>
                    {data?.descriptionTreeType ? (
                      <p className="text-green-primary">{data?.descriptionTreeType}</p>
                    ) : (
                      <p className="text-green-primary">
                        Cây tràm vừa cung cấp các sản phẩm kinh tế cao vừa là nơi cư trú của nhiều
                        loài động vật quý hiếm (các loài chim, khỉ, trăn…),vừa giữ vai trò cân bằng
                        và bảo vệ môi trường. Tràm giúp chống gió, ngăn tốc độ lũ quét, cải tạo môi
                        sinh rất quan trọng. Bảo vệ người dân và đất nơi gần biển, hòa hợp giữa con
                        người và thiên nhiên.
                      </p>
                    )}
                  </div>
                </div>
                <div className="hidden laptop:block rounded-full tree-detail__attr bg-white-500 absolute bottom-0 right-[100%] desktopSM:right-[110%] w-[350px] desktopSM:w-max ">
                  <div className="tree-detail__session-1-part w-full  text-right pl-[0.4rem] pr-10 desktopSM:px-10 desktopXL:px-10 py-4 rounded-full border-2 inline-block border-green-primary">
                    <p className="">Khả năng hấp thụ CO2 lượng carbon tích lũy 3 năm tuổi</p>
                    {data?.currentCO2AbsorptionCapacity ? (
                      <b>{data?.currentCO2AbsorptionCapacity} tấn/ha</b>
                    ) : (
                      <b>200.00 tấn/ha</b>
                    )}
                    <p className=" whitespace-wrap">
                      Khả năng hấp thụ CO2 lượng carbon tích lũy 10 năm tuổi
                    </p>
                    {data?.abilityToAbsorbCO2AsAnAdult ? (
                      <b>{data?.abilityToAbsorbCO2AsAnAdult} tấn/ha</b>
                    ) : (
                      <b>0.245 tấn/ha</b>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center laptop:hidden mt-10 mb-20">
              <div className="flex-1 tablet:w-auto px-6 mb-4 tablet:mb-0">
                <div className="relative bg-white-500 overflow-hidden mx-auto w-full aspect-square rounded-full border-solid border-2 border-green-primary">
                  <img
                    className="absolute object-cover w-[90%] aspect-square top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    src={
                      data?.imageLinkTreeType ||
                      data?.imageLinkTreePlantingSite ||
                      treesJourneyDemo.src
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center px-6 w-[100%] tablet:w-[50%]">
                <div className="text-left mb-4 rounded-full bg-white-500 ">
                  <div className=" text-xl px-6 desktopXL:px-16 py-4 rounded-full border-2 text-center block border-green-primary">
                    <p className="text-xl">Người đăng ký trồng</p>
                    <b>Anh/Chị {username}</b>
                  </div>
                </div>
                <div className="text-left mb-4 rounded-full bg-white-500">
                  <div className=" text-xl px-4 py-2 rounded-full border-2 block border-green-primary mb-4 mr-2">
                    <span className="text-xl">Loài cây: </span>
                    {data?.treeHistory[2].treeName ? (
                      <b>{data?.treeHistory[2].treeName}</b>
                    ) : (
                      <b>Tràm</b>
                    )}
                  </div>
                  <div className=" text-xl px-4 py-2 rounded-full border-2 block border-green-primary">
                    <span className="text-xl">Nơi trồng: </span>
                    {data?.location ? (
                      <b>{data?.location}</b>
                    ) : (
                      <b>Khu bảo tồn thiên nhiên Phong Điền</b>
                    )}
                  </div>
                </div>
                <div className="mb-4 text-primary-150">
                  <div className="text-xl px-6 desktopXL:px-16 py-4 rounded-3xl border-2 inline-block border-primary-150">
                    <b className="text-2xl text-primary-150 ">Đặc điểm</b>

                    {data?.descriptionTreeType ? (
                      <p className="text-justify">{data?.descriptionTreeType}</p>
                    ) : (
                      <p className="text-justify">
                        Cây tràm vừa cung cấp các sản phẩm kinh tế cao vừa là nơi cư trú của nhiều
                        loài động vật quý hiếm (các loài chim, khỉ, trăn…),vừa giữ vai trò cân bằng
                        và bảo vệ môi trường. Tràm giúp chống gió, ngăn tốc độ lũ quét, cải tạo môi
                        sinh rất quan trọng. Bảo vệ người dân và đất nơi gần biển, hòa hợp giữa con
                        người và thiên nhiên.
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-left rounded-3xl text-white-500">
                  <div className="bg-primary-150 text-xl px-6 desktopXL:px-16 py-4 rounded-3xl border-2 block">
                    <p className="text-xl">
                      Khả năng hấp thụ CO2 lượng carbon tích lũy{' '}
                      <span className="block">3 năm tuổi</span>
                    </p>
                    <p>
                      {data?.currentCO2AbsorptionCapacity ? (
                        <b className="mb-2">{data?.currentCO2AbsorptionCapacity} tấn/ha</b>
                      ) : (
                        <b className="mb-2">200.00 tấn/ha</b>
                      )}
                    </p>
                    <div className="mb-2 h-[2px] w-full bg-white-500"></div>
                    <p className="text-xl">
                      Khả năng hấp thụ CO2 lượng carbon tích lũy{' '}
                      <span className="block">10 năm tuổi</span>
                    </p>
                    <p>
                      {data?.abilityToAbsorbCO2AsAnAdult ? (
                        <b className="mb-2">{data?.abilityToAbsorbCO2AsAnAdult} tấn/ha</b>
                      ) : (
                        <b className="mb-2">0.245 tấn/ha</b>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[90%] px-6 pt-6 pb-0 laptop:p-6 mx-auto rounded-3xl bg-green-primary flex flex-wrap justify-center laptop:justify-start mb-10 laptop:mb-0 desktop:mb-16">
              <div className="w-[100%] laptop:w-[40%] desktop:w-[50%] py-4 px-6 flex items-center relative flex-wrap mb-10 laptop:mb-0">
                <div className="absolute top-0 left-0 w-full h-full bg-white-500 opacity-10 rounded-3xl "></div>
                <div className=" relative w-[100%] laptop:w-[50%] mb-6 laptop:mb-0">
                  {treeDetailImg}
                  {/* <img className="w-[45%] laptop:w-[80%] mx-auto " src={itemThuCamOn.src} alt="" /> */}
                </div>
                <div className="text-white-500 relative w-[100%] laptop:w-[50%]">
                  <p className="text-center laptop:text-left text-2xl desktop:text-3xl font-bold mb-3">
                    Kế hoạch
                    <span className="block">trồng cây của bạn:</span>
                  </p>
                  <p className="text-1.5xl desktop:text-2xl mb-2 laptop:mb-6">
                    Loại cây: <span className="font-bold ">{data?.treeHistory[2].treeName}</span>
                  </p>
                  <p className="text-1.5xl desktop:text-2xl mb-2 laptop:mb-6">
                    Thời gian trồng dự kiến:
                    <span className="block font-bold">
                      {moment(data?.treeHistory[0]?.timeLine).format('MM/YYYY')}
                    </span>
                  </p>
                  <p className="text-1.5xl desktop:text-2xl mb-2 laptop:mb-6">
                    Địa điểm trồng:
                    <span className="block font-bold">
                      {data?.treeHistory[2]?.plantingLocation}
                    </span>
                  </p>
                </div>
              </div>
              {timeLineContent}
            </div>
          </div>
        </article>
        <article
          className="pb-[30px] laptop:pb-[110px] desktop:pb-[150px] desktopXL:pb-[160px] bg-secondary-color pt-10 laptop:pt-8 desktop:pt-20"
          id=""
        >
          <div className="w-[90%] mx-auto grid grid-cols-1 laptop:grid-cols-2 gap-6">
            <div>
              <div className="aspect-[16/11] bg-green-primary mb-4">{GoogleMap}</div>
              <p className="text-center text-green-primary text-[15px] desktop:text-[26px] font-bold">
                Vị trí cây của bạn
              </p>
            </div>
            <div className="text-center">
              <div
                style={{
                  boxShadow: '0px 4px 4px 0px #00000040',
                }}
                className="tree-detail__certificate aspect-[16/11] mb-4 relative"
              >
                <CertificateComponent
                  btnRef={btnDownload}
                  info={{
                    location: data?.location,
                    date: data?.addedStamp,
                    provinceName: data?.labelTreePlantingSite,
                    provinceCode: data?.provinceCode,
                  }}
                  name={username || ''}
                />
              </div>
              <p className="text-center text-green-primary text-[15px] desktop:text-[26px] mb-2 desktop:mb-4 font-bold">
                Cảm ơn bạn! Hãy chia sẻ chứng nhận trồng cây này để người thân, bạn bè của bạn có
                thể giúp rừng có thêm nhiều cây xanh.
              </p>
              <div className="relative">
                <div className={`treeDetail__share ${showShare ? 'active' : ''}`}>
                  <div className="flex gap-4 justify-between items-center">
                    <span className="cursor-pointer">
                      <FacebookShareButton
                        url={`${
                          process.env.NEXT_PUBLIC_DOMAIN_TEST
                        }/certificate?treeCode=${encodeBase64(
                          data?.publicCode
                        )}&name=${encodeBase64(`${username ?? ''}`)}`}
                        quote={''}
                        hashtag={'#SongkhoeGopxanh'}
                        onShareWindowClose={() => onShareFacebook()}
                      >
                        <Image height={40} width={40} src={facebookI} alt="" />
                      </FacebookShareButton>
                    </span>
                    <span onClick={(e) => handleDownloadCertificate(e)} className="cursor-pointer">
                      <Image height={40} width={40} src={downloadIcon} alt="" />
                    </span>
                    <span onClick={(e) => handleCopyUrlCertificate(e)} className="cursor-pointer">
                      <Image height={40} width={40} src={copyIcon} alt="" />
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-center py-2 px-4 desktop:py-3 desktop:px-10 font-bold home__form-btn text-white-500 text-[15px] desktop:text-xl "
                  onClick={() => setShowShare(!showShare)}
                >
                  CHIA SẺ NGAY
                </button>
              </div>
            </div>
          </div>
        </article>
        <article
          style={{
            backgroundImage: `url(${bgAboutProgram.src})`,
          }}
          id=""
          className="relative py-6 tablet:py-0 z-[3] -mb-[0px] -translate-y-[0px] laptop:-translate-y-[100px] desktop:-translate-y-[120px] laptop:-mb-[100px] desktop:-mb-[120px] bg-auto laptop:bg-cover desktopXL:bg-contain bg-no-repeat bg-center"
        >
          <div className=" w-full">
            <MapTreesJourney trackingData={trackingData} />
          </div>
        </article>

        <article className="block overflow-hidden relative bg-white-500 mobileSM:bg-green-10 -mb-[4rem] laptop:-mb-[6rem] pb-[4rem] tablet:pb-[9rem]">
          <div className="mb-8 tablet:mb-20 relative">
            <video
              style={{ scale: '1.005' }}
              className="w-full "
              preload="auto"
              muted={true}
              loop={true}
              playsInline
            >
              <source src="/video/tracking_1920.mp4" type="video/mp4" />
            </video>
            <div className="absolute -bottom-[50%] mobileSM:-bottom-[18%] left-0 w-[12%] laptop:w-auto">
              <Image
                className=""
                src={decorLeaf12.src}
                width={decorLeaf12.width}
                height={decorLeaf12.height}
                alt="song khoe gop xanh"
              />
            </div>
            <div className="absolute -bottom-[13%] right-0 w-[15%] laptop:w-auto">
              <Image
                className=""
                src={decorLeaf10.src}
                width={decorLeaf10.width}
                height={decorLeaf10.height}
                alt="song khoe gop xanh"
              />
            </div>
          </div>
          <div className="relative mx-auto w-[90%] laptop:w-[80%] py-6 ">
            {/* <div
              style={{
                background:
                  'radial-gradient(49.98% 49.89% at 50.36% 41.7%, #FFFFFF 0%, #FFFFFE 10%, #F0F0EF 13%, white 31%, white 47%, white 63%, white 76%, white 87%, transparent 94%)',
              }}
              className="absolute w-[90%] h-[5px] top-1 left-[50%] -translate-x-1/2 blur-sm"
            ></div>
            <div
              style={{
                background:
                  'radial-gradient(49.98% 49.89% at 50.36% 41.7%, #FFFFFF 0%, #FFFFFE 10%, #F0F0EF 13%, white 31%, white 47%, white 63%, white 76%, white 87%, transparent 94%)',
              }}
              className="absolute w-[90%] h-[5px] bottom-1 left-[50%] -translate-x-1/2 blur-sm"
            ></div>
            <div
              style={{
                background: 'radial-gradient(white 5%, white 25%, transparent 70%)',
              }}
              className="absolute w-[10px] h-[100%] left-0 top-[0px] blur-sm"
            ></div>
            <div
              style={{
                background: 'radial-gradient(white 5%, white 25%, transparent 70%)',
              }}
              className="absolute w-[10px] h-[100%] right-0 top-[0px] blur-sm"
            ></div> */}
            {/* <div className=" opacity-25 -z-[1] absolute w-full h-full left-0 top-0 bg-white-500 rounded-3xl"></div>
            <div
              className="-z-[1] blur-xl absolute w-[98%] h-[95%] mobileSM:h-[88%]  left-[50%] -translate-x-1/2 top-[50%] rounded-2xl -translate-y-1/2  "
              style={{ backgroundImage: `url(${bgTreesJourneyBottomBlur.src})` }}
            ></div> */}
            <div className="absolute w-full h-full left-0 top-0 z-[1] bg-green-primary rounded-3xl"></div>

            <p className="relative z-[2] text-center uppercase font-semibold text-1xl text-white-500 mt-16 mobileSM:mt-0 mb-16 mobileSM:mb-4 px-6 mobileSM:px-16">
              Cùng xem sự khác biệt của khu vực trồng cây trước và sau chiến dịch nhé! Hãy cảm thấy
              tự hào bởi chính bạn đã{' '}
              <span className="inline desktop:block">
                cùng chúng tôi tạo nên sự thay đổi tích cực này.
              </span>
            </p>
            <div className="hidden mobileSM:grid relative z-[2] mobileSM:grid-cols-3 grid-cols-1 text-center text-white-500">
              {storyAndHistory?.listHistory.map((item, index) => {
                return (
                  <div className="mb-16 mobileSM:mb-0" key={index}>
                    <div className="w-[70%] mx-auto mb-3 aspect-video overflow-hidden">
                      <img className="aspect-video object-contain" src={item?.imageLinkTreePlantingSiteHistory} alt="" />
                    </div>
                    <p className="uppercase font-bold">{moment(item?.time).format('MM/YYYY')}</p>
                    <span className="uppercase ">{item?.description}</span>
                  </div>
                );
              })}
            </div>
            <div className="tree-detail__swiper block mobileSM:hidden relative z-[2] text-center text-white-500">
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={0}
                // autoplay={
                //   dataImage?.bannerIsVideo
                //     ? false
                //     : {
                //         delay: 5000,
                //         disableOnInteraction: false,
                //       }
                // }
                navigation={true}
                slidesPerView={1}
                // pagination={{ clickable: true }}
              >
                {/* <SwiperSlide className=" ">
              <div className="relative">
                <div className="">
                  <video className="w-full" preload="auto" muted={true} loop={true} playsInline>
                    <source src="/video/home_1920.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </SwiperSlide> */}
                {storyAndHistory?.listHistory.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="mb-16 mobileSM:mb-0">
                        <div className="w-[70%] mx-auto mb-3 aspect-video overflow-hidden">
                          <img className="aspect-video object-contain" src={item?.imageLinkTreePlantingSiteHistory} alt="" />
                        </div>
                        <p className="uppercase font-bold">
                          {moment(item?.time).format('MM/YYYY')}
                        </p>
                        <span className="uppercase ">{item?.description}</span>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </article>
        {/* <article
          id=""
          style={{
            backgroundImage: `url(${bgTreesJourneyBottom.src})`,
          }}
          className="block tablet:hidden relative bg-cover bg-no-repeat bg-center h-auto mobileSM:h-[1700px] -mb-[60px] translate-y-[0] mobileSM:-mb-[220px] mobileSM:-translate-y-[120px] pt-0 mobileSM:pt-20 mobileSM:pt-0 pb-32 mobileSM:pb-0 mobileSM:py-0"
        >
          <h1 className="w-[80%] pt-[120px] mobileSM:pt-[200px] mx-auto text-green-primary font-bold uppercase text-center mb-40 mobileSM:mb-8 text-2xl tablet:text-4xl">
            Chỉ với hành động nhỏ, <span className="block tablet:inline"> bạn đã giúp rừng </span>{' '}
            <span className="block tablet:inline"> xanh tươi hơn.</span>{' '}
            <br className="hidden tablet:block" />
            <span className="inline talbet:block">
              <span className="block tablet:inline-block">Cùng Panasonic xem</span>{' '}
              <span className="block tablet:inline-block">điều kỳ diệu phía dưới nhé!</span>
            </span>
          </h1>
          <div className="relative mobileSM:absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[90%] laptop:w-[80%] py-6">
            <div
              style={{
                background:
                  'radial-gradient(49.98% 49.89% at 50.36% 41.7%, #FFFFFF 0%, #FFFFFE 10%, #F0F0EF 13%, white 31%, white 47%, white 63%, white 76%, white 87%, transparent 94%)',
              }}
              className="absolute w-[90%] h-[5px] top-1 left-[50%] -translate-x-1/2 blur-sm"
            ></div>
            <div
              style={{
                background:
                  'radial-gradient(49.98% 49.89% at 50.36% 41.7%, #FFFFFF 0%, #FFFFFE 10%, #F0F0EF 13%, white 31%, white 47%, white 63%, white 76%, white 87%, transparent 94%)',
              }}
              className="absolute w-[90%] h-[5px] bottom-1 left-[50%] -translate-x-1/2 blur-sm"
            ></div>
            <div
              style={{
                background: 'radial-gradient(white 5%, white 25%, transparent 70%)',
              }}
              className="absolute w-[10px] h-[100%] left-0 top-[0px] blur-sm"
            ></div>
            <div
              style={{
                background: 'radial-gradient(white 5%, white 25%, transparent 70%)',
              }}
              className="absolute w-[10px] h-[100%] right-0 top-[0px] blur-sm"
            ></div>
            <div className=" opacity-25 -z-[1] absolute w-full h-full left-0 top-0 bg-white-500 rounded-3xl"></div>
            <div
              className="-z-[1] blur-xl absolute w-[98%] h-[95%] mobileSM:h-[88%]  left-[50%] -translate-x-1/2 top-[50%] rounded-2xl -translate-y-1/2  "
              style={{ backgroundImage: `url(${bgTreesJourneyBottomBlur.src})` }}
            ></div>
            <p className="text-center uppercase font-semibold text-1xl text-white-500 mt-16 mobileSM:mt-0 mb-16 mobileSM:mb-4 px-6 mobileSM:px-16">
              Cùng xem sự khác biệt của khu vực trồng cây trước và sau chiến dịch nhé! Hãy cảm thấy
              tự hào bởi chính bạn đã{' '}
              <span className="inline tablet:block">
                cùng chúng tôi tạo nên sự thay đổi tích cực này.
              </span>
            </p>
            <div className="grid mobileSM:grid-cols-3 grid-cols-1 text-center text-white-500">
              {storyAndHistory?.listHistory.map((item, index) => {
                return (
                  <div className="mb-16 mobileSM:mb-0" key={index}>
                    <div className="w-[70%] mx-auto mb-3 aspect-video overflow-hidden">
                      <img className="" src={item?.imageLinkTreePlantingSiteHistory} alt="" />
                    </div>
                    <p className="uppercase font-bold">{moment(item?.time).format('MM/YYYY')}</p>
                    <span className="uppercase ">{item?.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </article> */}
      </section>
    </>
  );
};

export default memo(TreesJourney);
{
  /* <video
            style={{ scale: '1.005' }}
            className="w-full"
            preload="auto"
            muted={true}
            loop={true}
            playsInline
          >
            <source src="/video/tracking_1920.mov" type="video/mp4" />
          </video> */
}

{
  /* <div className="relative mobileSM:absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[90%] laptop:w-[80%] py-6">
            <div
              style={{
                background:
                  'radial-gradient(49.98% 49.89% at 50.36% 41.7%, #FFFFFF 0%, #FFFFFE 10%, #F0F0EF 13%, white 31%, white 47%, white 63%, white 76%, white 87%, transparent 94%)',
              }}
              className="absolute w-[90%] h-[5px] top-1 left-[50%] -translate-x-1/2 blur-sm"
            ></div>
            <div
              style={{
                background:
                  'radial-gradient(49.98% 49.89% at 50.36% 41.7%, #FFFFFF 0%, #FFFFFE 10%, #F0F0EF 13%, white 31%, white 47%, white 63%, white 76%, white 87%, transparent 94%)',
              }}
              className="absolute w-[90%] h-[5px] bottom-1 left-[50%] -translate-x-1/2 blur-sm"
            ></div>
            <div
              style={{
                background: 'radial-gradient(white 5%, white 25%, transparent 70%)',
              }}
              className="absolute w-[10px] h-[100%] left-0 top-[0px] blur-sm"
            ></div>
            <div
              style={{
                background: 'radial-gradient(white 5%, white 25%, transparent 70%)',
              }}
              className="absolute w-[10px] h-[100%] right-0 top-[0px] blur-sm"
            ></div>
            <div className=" opacity-25 -z-[1] absolute w-full h-full left-0 top-0 bg-white-500 rounded-3xl"></div>
            <div
              className="-z-[1] blur-xl absolute w-[98%] h-[95%] mobileSM:h-[88%]  left-[50%] -translate-x-1/2 top-[50%] rounded-2xl -translate-y-1/2  "
              style={{ backgroundImage: `url(${bgTreesJourneyBottomBlur.src})` }}
            ></div>
            <p className="text-center uppercase font-semibold text-1xl text-white-500 mt-16 mobileSM:mt-0 mb-16 mobileSM:mb-4 px-6 mobileSM:px-16">
              Cùng xem sự khác biệt của khu vực trồng cây trước và sau chiến dịch nhé! Hãy cảm thấy
              tự hào bởi chính bạn đã{' '}
              <span className="inline desktop:block">
                cùng chúng tôi tạo nên sự thay đổi tích cực này.
              </span>
            </p>
            <div className="grid mobileSM:grid-cols-3 grid-cols-1 text-center text-white-500">
              {storyAndHistory?.listHistory.map((item, index) => {
                return (
                  <div className="mb-16 mobileSM:mb-0" key={index}>
                    <div className="w-[70%] mx-auto mb-3 aspect-video overflow-hidden">
                      <img className="" src={item?.imageLinkTreePlantingSiteHistory} alt="" />
                    </div>
                    <p className="uppercase font-bold">{moment(item?.time).format('MM/YYYY')}</p>
                    <span className="uppercase ">{item?.description}</span>
                  </div>
                );
              })}
            </div>
          </div> */
}
