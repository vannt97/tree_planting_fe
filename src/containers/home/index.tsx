/* eslint-disable @next/next/no-img-element */
// @ts-nocheck

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

import Script from 'next/script';
import bgHomeForm from 'public/images/bg-home-form.png';
import bgTheoDoiCayCuaBan from 'public/images/bg-theo-doi-cay-cua-ban.png';
import registerCropImg from 'public/images/dangkytrongcay.png';
import downloadStoreImg from 'public/images/download-app-store.png';
import downloadGgPlayImg from 'public/images/download-gg-play.png';
import home1Img from 'public/images/home-1.png';
import bgPattern from 'public/images/bg-pattern.png';
import bgAboutProgram from 'public/images/bg-about-program.png';
import aboutProgram from 'public/images/about-program.png';
import decorLeaf1 from 'public/images/decor-leaf-1.png';
import decorLeaf2 from 'public/images/decor-leaf-2.png';
import decorLeaf3 from 'public/images/decor-leaf-3.png';
import decorLeaf4 from 'public/images/decor-leaf-4.png';
import decorLeaf5 from 'public/images/decor-leaf-5.png';
import decorLeaf6 from 'public/images/decor-leaf-6.png';
import decorLeaf7 from 'public/images/decor-leaf-7.png';
import decorLeaf8 from 'public/images/decor-leaf-8.png';
import decorLeaf9 from 'public/images/decor-leaf-9.png';
import decorLeaf10 from 'public/images/decor-leaf-10.png';
import productHome1 from 'public/images/product-home-1.png';
import productHome2 from 'public/images/product-home-2.png';
import productHome3 from 'public/images/product-home-3.png';
import productHome4 from 'public/images/product-home-4.png';
import productHome5 from 'public/images/product-home-5.png';
import { useEffect, useMemo, useState } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeFormFollow from './HomeFormFollow';
import HomeFormRegister from './HomeFormRegister';
import HomePost from './HomePost';

import Head from 'next/head';
import { useGetVideoQuery } from 'src/services/auth';
import { useGetImgPartnersQuery } from 'src/services/home';
import Map from '../TreeDetail/Map';
import useWindowSize from 'src/app/hooks/useWindowSize';
import { decodeBase64 } from 'src/utils/helpers/common';
import WheelLucky from 'src/components/WheelLucky';

function HomePage({ imageData: dataImage }) {
  const width = useWindowSize()?.width;
  const { data: videoData } = useGetVideoQuery();
  const { data: listImgPartners } = useGetImgPartnersQuery();
  const [showPopupThank, setShowPopupThank] = useState(false);
  // console.log(decodeBase64('024118'));
  const VideoMemo = useMemo(() => {
    let arr = [];
    const formatImage = dataImage.entity.map((item: any) => {
      if (item.link) {
        return { ...item, isLink: true };
      }
      return { ...item, isLink: false };
    });
    const formatVideo = dataImage.bannerVideo.map((item: any) => {
      if (item.linkVideo) {
        return { ...item, isVideo: true };
      }
      return { ...item, isVideo: false };
    });
    if (!dataImage?.bannerIsVideo) {
      arr = [...formatVideo.sort((a: any, b: any) => a.order - b.order)];
    } else {
      arr = [...formatImage.sort((a: any, b: any) => a.order - b.order)];
    }

    return arr.map((item, index) => {
      if (item.isLink) {
        return (
          <SwiperSlide key={index}>
            <a
              key={item.link}
              href={`${item.link || ''}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={item.url} className="w-full home__banner-img" alt="" />
            </a>
          </SwiperSlide>
        );
      } else if (item.isVideo) {
        if (index === 0) {
          return (
            <div className="swiper-video" key={index}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${item.linkVideo}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          );
        } else {
          return <></>;
        }
      }
      return (
        <SwiperSlide key={index}>
          <div key={item.url}>
            <img src={item.url} className="w-full home__banner-img" alt="" />
          </div>
        </SwiperSlide>
      );
    });
  }, [dataImage, width]);

  const handleShowPopupThank = () => {
    setShowPopupThank(!showPopupThank);
  };

  useEffect(() => {
    const id = localStorage.getItem('redirect');
    const header = document.getElementById('header');
    const titleElement1 = document.getElementById('tree-map');
    if (typeof window !== 'undefined' && id && header && titleElement1.offsetHeight) {
      const titleElement = document.getElementById(id);
      const scrollHeight =
        titleElement.getBoundingClientRect().top - header.clientHeight - 100 + window.scrollY;
      if (scrollHeight && id) {
        window.scrollTo({
          top:
            id === ('news' || id === 'partner')
              ? scrollHeight + titleElement1.offsetHeight
              : scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
    return () => localStorage.setItem('redirect', '');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onload = () => {
        localStorage.setItem('redirect', '');
      };
    }
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {/* <WheelLucky /> */}
      <section className="home z-0">
        <div className="landing__banner">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            autoplay={
              dataImage?.bannerIsVideo
                ? false
                : {
                    delay: 5000,
                    disableOnInteraction: false,
                  }
            }
            loop={dataImage && dataImage.length > 1 ? true : false}
            navigation
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {VideoMemo}
          </Swiper>
        </div>
        <article className="container-custom relative z-[5]">
          <img src={decorLeaf1.src} alt="leaf" className="absolute w-[12%] -top-[4%] left-0" />
          <img src={decorLeaf2.src} alt="leaf" className="absolute -bottom-[40%] right-0" />

          <h1 className="color-primary font-bold uppercase text-center mb-3 mt-8 text-2xl tablet:text-2.5xl">
            CÁCH THỨC THAM GIA&nbsp;
            <br className="block tablet:hidden" />
            CHƯƠNG TRÌNH
          </h1>

          <p className="color-text-55 text-center color-text-33 ">
            Rừng đầy ắp những câu chuyện truyền cảm hứng về cuộc sống khỏe mạnh. Nếu rừng không còn
          </p>
          <p className="color-text-55 text-center color-text-33 mb-6">
            {/* <span>
              Rừng đầy ắp những câu chuyện truyền cảm hứng về cuộc sống khỏe mạnh. Nếu rừng không
              còn{' '}
            </span> */}
            cây, chuyện hay cũng không còn. Hãy cùng Panasonic sống khỏe, góp xanh để giữ chuyện
            rừng còn mãi.
          </p>

          <p className="text-center color-text-33 ">
            Từ ngày 1/11/2023 - 31/3/2024 với mỗi sản phẩm thuộc bộ GIẢI PHÁP SỨC KHỎE TOÀN DIỆN
            được
          </p>

          <p className="text-center color-text-33">
            {/* <span>
              Từ ngày 1/11/2023 - 31/3/2024 với mỗi sản phẩm thuộc bộ GIẢI PHÁP SỨC KHỎE TOÀN DIỆN
              được
            </span> */}
            bán ra, Panasonic Việt Nam sẽ trồng một cây xanh để phát triển rừng.
          </p>
          <div className="w-[85%] mx-auto grid grid-cols-3 my-10 gap-4 tablet:gap-8">
            <a
              href={'#regiterWarranty'}
              className="bg-secondary-color home__intro flex  tablet:p-3 laptop:px-5 laptop:py-16 flex-col items-center"
            >
              <span className="home__intro-img">
                <svg
                  className="leaf-electric"
                  width="29"
                  height="35"
                  viewBox="0 0 29 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_948_2522)">
                    <path
                      d="M8.56054 16.1383C13.0635 16.1383 16.7138 12.5256 16.7138 8.06917C16.7138 3.61269 13.0635 0 8.56054 0C4.05759 0 0.407227 3.61269 0.407227 8.06917C0.407227 12.5256 4.05759 16.1383 8.56054 16.1383Z"
                      fill="#DCEEC0"
                    />
                    <path
                      d="M21.885 33.958L14.2747 26.4267L18.9061 21.8437C19.6963 21.0618 20.7679 20.6226 21.8853 20.6226C23.0027 20.6226 24.0743 21.0618 24.8645 21.8437L26.518 23.4801C27.308 24.2621 27.7518 25.3227 27.7518 26.4286C27.7518 27.5344 27.308 28.595 26.518 29.377L21.885 33.958ZM15.1036 26.4267L21.885 33.1382L26.1014 28.9679C26.4383 28.6346 26.7056 28.2388 26.8879 27.8032C27.0702 27.3677 27.1641 26.9008 27.1641 26.4293C27.1641 25.9579 27.0702 25.491 26.8879 25.0554C26.7056 24.6199 26.4383 24.2241 26.1014 23.8908L24.4479 22.2543C24.1111 21.9209 23.7112 21.6564 23.2711 21.476C22.831 21.2955 22.3593 21.2026 21.8829 21.2026C21.4065 21.2026 20.9348 21.2955 20.4946 21.476C20.0545 21.6564 19.6546 21.9209 19.3178 22.2543L15.1036 26.4267Z"
                      fill="#00874A"
                    />
                    <path
                      d="M20.2424 31.7931L17.416 34.5903L17.8301 35.0002L20.6566 32.2029L20.2424 31.7931Z"
                      fill="#00874A"
                    />
                    <path
                      d="M15.866 27.823L13.2217 30.4399L13.6358 30.8498L16.2801 28.2328L15.866 27.823Z"
                      fill="#00874A"
                    />
                    <path
                      d="M5.62532 25.5842C4.54529 25.5841 3.48955 25.2671 2.59157 24.6732C1.69358 24.0793 0.993686 23.2353 0.580359 22.2478C0.167033 21.2603 0.0588423 20.1736 0.269457 19.1253C0.480073 18.0769 1.00004 17.1139 1.76362 16.358L11.3965 6.82446L11.811 7.23463L2.17806 16.7676C1.26379 17.6724 0.750154 18.8997 0.750154 20.1793C0.750154 21.4589 1.26379 22.6861 2.17806 23.591C3.09233 24.4958 4.33235 25.0041 5.62532 25.0041C6.91829 25.0041 8.15832 24.4958 9.07259 23.591L18.4575 14.3035C18.9857 13.7802 19.6128 13.3651 20.3032 13.0818C20.9935 12.7985 21.7335 12.6526 22.4808 12.6524C23.2282 12.6522 23.9682 12.7978 24.6587 13.0807C25.3492 13.3637 25.9766 13.7785 26.505 14.3015C27.0335 14.8245 27.4527 15.4454 27.7386 16.1288C28.0245 16.8121 28.1715 17.5445 28.1713 18.2842C28.1711 19.0238 28.0237 19.7561 27.7375 20.4393C27.4512 21.1226 27.0318 21.7433 26.503 22.266L25.6902 23.071L25.2763 22.6608L26.0891 21.8564C27.0313 20.906 27.5563 19.626 27.5499 18.2947C27.5435 16.9633 27.0063 15.6883 26.055 14.7468C25.1038 13.8054 23.8155 13.2737 22.4702 13.2674C21.125 13.2611 19.8316 13.7806 18.8714 14.7131L9.48703 24.0011C8.98108 24.5046 8.37926 24.9038 7.7164 25.1755C7.05354 25.4472 6.3428 25.5862 5.62532 25.5842Z"
                      fill="#00874A"
                    />
                    <path
                      d="M4.67003 17.3557C3.65222 17.3552 2.64026 17.2033 1.66814 16.9049L1.52039 16.8595L1.47506 16.7132C0.927618 14.9757 0.87133 13.123 1.31232 11.356C1.7533 9.58906 2.67472 7.97533 3.97663 6.68986C5.27561 5.40154 6.90616 4.48973 8.69151 4.0533C10.4769 3.61688 12.3488 3.67249 14.1045 4.21411L14.2523 4.25951L14.2981 4.40573C14.7666 5.89968 14.8741 7.48165 14.6118 9.02422C14.3495 10.5668 13.7248 12.0268 12.7881 13.2868C11.8514 14.5467 10.6287 15.5713 9.21869 16.278C7.80865 16.9848 6.25059 17.3539 4.67003 17.3557ZM1.98978 16.3949C3.62663 16.8694 5.36234 16.8991 7.01482 16.4811C8.66731 16.0631 10.1757 15.2127 11.3817 14.0191C12.5878 12.8255 13.4471 11.3327 13.8694 9.69723C14.2918 8.06179 14.2618 6.34401 13.7824 4.72404C12.1457 4.24751 10.4095 4.21665 8.75667 4.63471C7.10381 5.05276 5.59547 5.90426 4.39054 7.0995C3.18293 8.29215 2.3227 9.78507 1.90047 11.421C1.47824 13.0569 1.50964 14.7752 1.99138 16.3949H1.98978Z"
                      fill="#00874A"
                    />
                    <path d="M4.3436 9.78149H4.14838V14.4728H4.3436V9.78149Z" fill="#00874A" />
                    <path d="M10.1047 12.356H6.28672V12.5492H10.1047V12.356Z" fill="#00874A" />
                    <path d="M8.22771 6.91479H8.03249V10.2378H8.22771V6.91479Z" fill="#00874A" />
                    <path
                      d="M17.6824 26.3294L17.5444 26.4661L21.9119 30.7885L22.0499 30.6519L17.6824 26.3294Z"
                      fill="#00874A"
                    />
                    <path
                      d="M18.9279 25.0931L18.7898 25.2297L23.1573 29.5522L23.2954 29.4155L18.9279 25.0931Z"
                      fill="#00874A"
                    />
                    <path
                      d="M20.1966 23.8307L20.0586 23.9673L24.4261 28.2897L24.5641 28.1531L20.1966 23.8307Z"
                      fill="#00874A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_948_2522">
                      <rect width="28" height="35" fill="white" transform="translate(0.166672)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className="color-primary home__intro-text text-base tablet:text-1xl mt-2 text-center font-bold">
                Kích hoạt
                <br className="block tablet:hidden" /> bảo hành
              </span>
            </a>

            <a
              href="#followTree"
              to="followTree"
              className="bg-secondary-color home__intro flex  tablet:p-3 laptop:p-5 laptop:py-16 flex-col items-center"
            >
              <span className="home__intro-img">
                <svg
                  className="map-pin"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.4375 14.2188C28.4375 24.0625 17.5 31.7188 17.5 31.7188C17.5 31.7188 6.56251 24.0625 6.56251 14.2188C6.56251 11.3179 7.71485 8.53595 9.76603 6.48477C11.8172 4.43359 14.5992 3.28125 17.5 3.28125C20.4008 3.28125 23.1828 4.43359 25.234 6.48477C27.2852 8.53595 28.4375 11.3179 28.4375 14.2188V14.2188Z"
                    stroke="#00874A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.6336 20.5751C21.5148 20.5751 24.6611 17.3937 24.6611 13.4693C24.6611 9.54489 21.5148 6.36353 17.6336 6.36353C13.7524 6.36353 10.6061 9.54489 10.6061 13.4693C10.6061 17.3937 13.7524 20.5751 17.6336 20.5751Z"
                    fill="#DCEEC0"
                  />
                  <path d="M16.9217 12.0564H16.6963V24.3937H16.9217V12.0564Z" fill="#00874A" />
                  <path
                    d="M15.1611 16.8172C14.4811 16.8164 13.8269 16.5537 13.3315 16.0826C12.8361 15.6116 12.5367 14.9674 12.4941 14.2812L12.4843 14.1161L12.6074 14.0053C12.9792 13.6633 13.4395 13.4352 13.9346 13.3475C14.4297 13.2599 14.9392 13.3163 15.4038 13.5103C15.8696 13.7009 16.2723 14.0213 16.5649 14.4344C16.8575 14.8475 17.028 15.3361 17.0566 15.8434L17.0671 16.009L16.9439 16.1192C16.4557 16.5672 15.8204 16.8159 15.1611 16.8172ZM13.1869 14.4063C13.2365 14.7532 13.3748 15.0809 13.5882 15.3571C13.8016 15.6333 14.0827 15.8483 14.4035 15.9809C14.7244 16.1134 15.074 16.1589 15.4176 16.1129C15.7612 16.0668 16.0869 15.9308 16.3626 15.7182C16.3142 15.3709 16.1764 15.0425 15.9628 14.7661C15.7492 14.4897 15.4674 14.275 15.1457 14.1435C14.8252 14.0095 14.4754 13.9632 14.1315 14.0094C13.7876 14.0555 13.4618 14.1924 13.1869 14.4063Z"
                    fill="#00874A"
                  />
                  <path
                    d="M18.7857 16.98C17.9884 16.9782 17.2194 16.6814 16.6237 16.1456L16.5005 16.036L16.5091 15.871C16.5407 15.2495 16.7451 14.6496 17.099 14.1403C17.4528 13.6311 17.9417 13.2333 18.5093 12.9926C19.0769 12.7519 19.7001 12.6781 20.3074 12.7797C20.9146 12.8814 21.4811 13.1543 21.9417 13.5672L22.0649 13.6761L22.0562 13.8418C22.0271 14.464 21.8237 15.0651 21.4697 15.5749C21.1157 16.0848 20.6257 16.4825 20.0568 16.7215C19.6543 16.8923 19.2222 16.9801 18.7857 16.98ZM17.1988 15.7396C17.5613 16.027 17.9933 16.2109 18.4499 16.2722C18.9065 16.3335 19.371 16.27 19.795 16.0883C20.2202 15.9096 20.5903 15.619 20.8668 15.2467C21.1433 14.8744 21.3161 14.434 21.3672 13.9713C21.004 13.6853 20.572 13.5023 20.1158 13.4411C19.6595 13.3798 19.1953 13.4424 18.7709 13.6226C18.3464 13.8028 17.9771 14.094 17.7008 14.4663C17.4246 14.8385 17.2513 15.2785 17.1988 15.7409V15.7396Z"
                    fill="#00874A"
                  />
                  <path
                    d="M16.809 12.5697C16.4631 12.5697 16.125 12.4659 15.8374 12.2716C15.5498 12.0773 15.3257 11.8012 15.1933 11.478C15.0609 11.1549 15.0263 10.7993 15.0938 10.4563C15.1613 10.1133 15.3278 9.7982 15.5724 9.5509C15.817 9.30359 16.1286 9.13517 16.4679 9.06694C16.8071 8.9987 17.1587 9.03373 17.4783 9.16757C17.7978 9.30141 18.071 9.52807 18.2632 9.81887C18.4553 10.1097 18.5579 10.4516 18.5579 10.8013C18.5574 11.2701 18.373 11.7197 18.0451 12.0512C17.7173 12.3827 17.2727 12.5692 16.809 12.5697ZM16.809 9.71726C16.5968 9.71726 16.3894 9.78089 16.213 9.90011C16.0366 10.0193 15.8991 10.1888 15.8179 10.387C15.7367 10.5852 15.7155 10.8034 15.757 11.0138C15.7984 11.2242 15.9006 11.4175 16.0507 11.5691C16.2008 11.7208 16.392 11.8241 16.6001 11.8658C16.8083 11.9076 17.024 11.8861 17.22 11.8039C17.416 11.7217 17.5835 11.5825 17.7013 11.4041C17.8191 11.2256 17.8819 11.0159 17.8818 10.8013C17.8813 10.5138 17.7681 10.2383 17.567 10.0351C17.3659 9.83189 17.0933 9.71759 16.809 9.71726Z"
                    fill="#00874A"
                  />
                </svg>
              </span>
              <span className="color-primary mt-2 text-center text-base tablet:text-1xl font-bold home__intro-text">
                Theo dõi cây
              </span>
            </a>

            <a
              href="#registerPlanting"
              to="registerPlanting"
              className="bg-secondary-color home__intro flex  tablet:p-3 laptop:p-5 laptop:py-16 flex-col items-center"
            >
              <span className="home__intro-img">
                <svg
                  className="tree-electric"
                  width="30"
                  height="35"
                  viewBox="0 0 30 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_948_2456)">
                    <path
                      d="M15.6239 21.4553C19.3464 21.4553 22.3641 18.3353 22.3641 14.4867C22.3641 10.638 19.3464 7.51807 15.6239 7.51807C11.9014 7.51807 8.88376 10.638 8.88376 14.4867C8.88376 18.3353 11.9014 21.4553 15.6239 21.4553Z"
                      fill="#DCEEC0"
                    />
                    <path
                      d="M14.833 33.6627C13.8729 33.6616 12.9523 33.2667 12.2734 32.5647C11.5944 31.8628 11.2125 30.911 11.2114 29.9183V26.1738H18.4547V29.9183C18.4537 30.911 18.0717 31.8628 17.3928 32.5647C16.7138 33.2667 15.7932 33.6616 14.833 33.6627ZM11.8605 26.8449V29.9183C11.8605 30.7334 12.1737 31.5151 12.7311 32.0915C13.2886 32.6678 14.0447 32.9916 14.833 32.9916C15.6214 32.9916 16.3775 32.6678 16.935 32.0915C17.4925 31.5151 17.8056 30.7334 17.8056 29.9183V26.8449H11.8605Z"
                      fill="#00874A"
                    />
                    <path
                      d="M14.8331 35C14.3453 34.9993 13.8777 34.7987 13.5328 34.4421C13.1879 34.0855 12.9939 33.6021 12.9933 33.0978V32.9934H13.643V33.0978C13.643 33.4243 13.7684 33.7374 13.9917 33.9683C14.215 34.1992 14.5179 34.3289 14.8337 34.3289C15.1494 34.3289 15.4523 34.1992 15.6756 33.9683C15.8989 33.7374 16.0244 33.4243 16.0244 33.0978V32.9934H16.674V33.0978C16.6734 33.6023 16.4792 34.0859 16.1341 34.4426C15.7889 34.7992 15.321 34.9996 14.8331 35Z"
                      fill="#00874A"
                    />
                    <path
                      d="M18.11 26.4033L11.5066 27.9343L11.5539 28.1524L18.1573 26.6213L18.11 26.4033Z"
                      fill="#00874A"
                    />
                    <path
                      d="M18.1102 27.976L11.5069 29.5071L11.5542 29.7252L18.1575 28.1941L18.1102 27.976Z"
                      fill="#00874A"
                    />
                    <path
                      d="M18.1105 29.5481L11.5072 31.0791L11.5545 31.2972L18.1578 29.7661L18.1105 29.5481Z"
                      fill="#00874A"
                    />
                    <path
                      d="M17.8755 31.2091L12.7681 32.4709L12.8184 32.6883L17.9258 31.4264L17.8755 31.2091Z"
                      fill="#00874A"
                    />
                    <path
                      d="M18.3898 25.2616H17.7401V25.0594C17.7401 23.2355 18.4748 21.5074 19.8073 20.1933C20.5181 19.4987 21.0836 18.6609 21.4689 17.7315C21.8542 16.8021 22.0512 15.8009 22.0475 14.7897C22.0475 12.8105 21.287 10.9124 19.9334 9.51285C18.5798 8.11333 16.7439 7.3271 14.8295 7.3271C12.9152 7.3271 11.0793 8.11333 9.72565 9.51285C8.37202 10.9124 7.61156 12.8105 7.61156 14.7897C7.6079 15.8009 7.8048 16.8021 8.19011 17.7315C8.57542 18.6609 9.14096 19.4987 9.85178 20.1933C11.1866 21.5074 11.9189 23.2355 11.9189 25.0594V25.2616H11.2693V25.0594C11.2693 23.4205 10.6054 21.8652 9.40114 20.6787C8.62629 19.9219 8.00979 19.0088 7.58973 17.9959C7.16967 16.983 6.95498 15.8918 6.95892 14.7897C6.95892 10.3046 10.4879 6.65601 14.826 6.65601C19.1641 6.65601 22.693 10.3046 22.693 14.7897C22.697 15.8918 22.4823 16.983 22.0622 17.9959C21.6422 19.0088 21.0256 19.9219 20.2508 20.6787C19.0465 21.8652 18.3827 23.4205 18.3827 25.0594L18.3898 25.2616Z"
                      fill="#00874A"
                    />
                    <path d="M14.9411 13.1013H14.725V25.2005H14.9411V13.1013Z" fill="#00874A" />
                    <path
                      d="M13.2526 17.7702C12.6003 17.7694 11.9729 17.5118 11.4977 17.0498C11.0226 16.5878 10.7354 15.9561 10.6946 15.2831L10.6851 15.1213L10.8033 15.0126C11.1598 14.6772 11.6013 14.4535 12.0761 14.3675C12.551 14.2816 13.0397 14.3369 13.4853 14.5271C13.932 14.714 14.3182 15.0283 14.5989 15.4334C14.8796 15.8385 15.0431 16.3177 15.0705 16.8152L15.0805 16.9776L14.9624 17.0857C14.4942 17.525 13.8848 17.7689 13.2526 17.7702ZM11.359 15.4058C11.4066 15.746 11.5393 16.0675 11.744 16.3383C11.9486 16.6092 12.2182 16.82 12.5259 16.95C12.8337 17.08 13.169 17.1246 13.4985 17.0795C13.8281 17.0343 14.1405 16.9009 14.4049 16.6925C14.3585 16.3518 14.2263 16.0298 14.0214 15.7587C13.8165 15.4876 13.5463 15.277 13.2378 15.1482C12.9303 15.0167 12.5948 14.9713 12.265 15.0166C11.9352 15.0618 11.6227 15.1961 11.359 15.4058Z"
                      fill="#00874A"
                    />
                    <path
                      d="M16.729 17.9295C15.9643 17.9278 15.2266 17.6367 14.6553 17.1113L14.5372 17.0038L14.5454 16.842C14.5757 16.2324 14.7718 15.6441 15.1112 15.1447C15.4506 14.6453 15.9194 14.2551 16.4638 14.0191C17.0082 13.783 17.606 13.7107 18.1884 13.8104C18.7708 13.9101 19.3141 14.1777 19.7559 14.5826L19.874 14.6895L19.8657 14.8519C19.8378 15.4621 19.6427 16.0516 19.3031 16.5516C18.9636 17.0516 18.4936 17.4416 17.948 17.6761C17.562 17.8435 17.1476 17.9297 16.729 17.9295ZM15.2069 16.7131C15.5546 16.9949 15.9689 17.1753 16.4068 17.2354C16.8447 17.2955 17.2902 17.2333 17.697 17.0551C18.1048 16.8798 18.4597 16.5948 18.7249 16.2297C18.9901 15.8646 19.1558 15.4327 19.2048 14.9789C18.8565 14.6985 18.4422 14.519 18.0046 14.4589C17.5669 14.3988 17.1217 14.4603 16.7147 14.637C16.3076 14.8137 15.9534 15.0992 15.6884 15.4643C15.4234 15.8294 15.2572 16.2609 15.2069 16.7143V16.7131Z"
                      fill="#00874A"
                    />
                    <path
                      d="M14.8331 13.6044C14.5013 13.6044 14.177 13.5027 13.9012 13.3121C13.6253 13.1216 13.4103 12.8508 13.2834 12.5339C13.1564 12.217 13.1232 11.8683 13.1879 11.5319C13.2527 11.1955 13.4124 10.8865 13.647 10.6439C13.8816 10.4014 14.1805 10.2362 14.5058 10.1693C14.8312 10.1024 15.1685 10.1367 15.475 10.268C15.7815 10.3993 16.0434 10.6215 16.2277 10.9067C16.412 11.1919 16.5104 11.5272 16.5104 11.8702C16.51 12.33 16.3331 12.7708 16.0186 13.0959C15.7042 13.4211 15.2778 13.6039 14.8331 13.6044ZM14.8331 10.8071C14.6295 10.8071 14.4306 10.8695 14.2614 10.9864C14.0922 11.1033 13.9603 11.2695 13.8825 11.4639C13.8046 11.6583 13.7843 11.8722 13.824 12.0786C13.8638 12.2849 13.9618 12.4745 14.1058 12.6232C14.2497 12.772 14.4331 12.8732 14.6327 12.9142C14.8323 12.9552 15.0392 12.934 15.2272 12.8534C15.4152 12.7728 15.5758 12.6364 15.6888 12.4614C15.8018 12.2863 15.8621 12.0806 15.8619 11.8702C15.8615 11.5883 15.7529 11.3181 15.56 11.1188C15.3672 10.9195 15.1057 10.8074 14.8331 10.8071Z"
                      fill="#00874A"
                    />
                    <path
                      d="M23.2642 23.2393L22.8056 23.7134L24.8591 25.8365L25.3177 25.3624L23.2642 23.2393Z"
                      fill="#00874A"
                    />
                    <path
                      d="M4.8092 4.15382L4.35063 4.62793L6.67558 7.03168L7.13415 6.55757L4.8092 4.15382Z"
                      fill="#00874A"
                    />
                    <path d="M29.3328 14.656H26.1676V15.3265H29.3328V14.656Z" fill="#00874A" />
                    <path d="M3.08801 14.656H0.333359V15.3265H3.08801V14.656Z" fill="#00874A" />
                    <path
                      d="M24.8569 4.15422L22.6104 6.47681L23.069 6.95091L25.3154 4.62832L24.8569 4.15422Z"
                      fill="#00874A"
                    />
                    <path
                      d="M6.86095 22.759L4.35057 25.3545L4.80913 25.8286L7.31951 23.2331L6.86095 22.759Z"
                      fill="#00874A"
                    />
                    <path d="M15.1573 0H14.5088V3.11304H15.1573V0Z" fill="#00874A" />
                  </g>
                  <defs>
                    <clipPath id="clip0_948_2456">
                      <rect width="29" height="35" fill="white" transform="translate(0.333359)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className="color-primary mt-2 text-center text-base tablet:text-1xl font-bold home__intro-text">
                Đăng ký
                <br className="block tablet:hidden" /> trồng cây
              </span>
            </a>

            <p className="text-center">
              Khi mua mỗi sản phẩm trong bộ GIẢI PHÁP SỨC KHỎE TOÀN DIỆN, bạn góp thêm 1 cây xanh
              mới được trồng
            </p>
            <p className="text-center">
              Kích hoạt bảo hành trên ứng dụng My Panasonic, nhận mã cây để theo dõi thông tin, hành
              trình trưởng thành của cây
            </p>
            <p className="text-center">
              Khi mua mỗi sản phẩm trong bộ GIẢI PHÁP SỨC KHỎE TOÀN DIỆN, bạn góp thêm 1 cây xanh
              mới được trồng
            </p>
          </div>
        </article>

        <article id="" className="bg-secondary-color pt-4 pb-10 relative z-[4]">
          <img className="absolute -bottom-[28%] left-0 z-1" src={decorLeaf3.src} alt="" />
          <img className="absolute -bottom-[22%] right-0 z-1" src={decorLeaf4.src} alt="" />
          <div className="container-custom relative z-[5]">
            <h1 className="color-primary font-bold uppercase text-center mb-3 mt-4 text-2xl tablet:text-2.5xl">
              MỖI SẢN PHẨM SỐNG KHỎE,
              <span className="block">GÓP MỘT CÂY XANH CHO RỪNG </span>
            </h1>
            <p className="text-center w-[65%] mx-auto">
              Tận hưởng cuộc sống khỏe mạnh hơn mỗi ngày với GIẢI PHÁP SỨC KHỎE TOÀN DIỆN từ
              Panasonic Việt Nam. Khỏe từ bầu không khí trong lành, khỏe từ thực phẩm tươi xanh và
              khỏe từ nguồn dòng nước tinh khiết. Sống khỏe với Panasonic để cùng góp xanh ngay hôm
              nay.
            </p>
            <div className="grid grid-cols-4 my-10 gap-4 tablet:gap-8 ">
              <div className="flex justify-center">
                <img src={productHome1.src} alt="product" />
              </div>
              <div className="flex justify-center">
                <img src={productHome2.src} alt="product" />
              </div>
              <div className="flex justify-center">
                <img src={productHome3.src} alt="product" />
              </div>
              <div className="flex justify-center">
                <img src={productHome4.src} alt="product" />
              </div>
            </div>
          </div>
        </article>

        <article id="regiterWarranty" className="home__form pt-12 pb-24 z-[3]">
          <img className="absolute -bottom-[35%] left-0" src={decorLeaf5.src} alt="" />
          <div className="container-custom">
            {/* <h1 className="text-white-500 font-semibold uppercase text-center mb-4 text-2xl tablet:text-2.5xl">
                Đăng Ký&nbsp;
                <br className="block tablet:hidden" />
                Bảo Hành Điện Tử
              </h1> */}

            <div className="flex items-center">
              <div className="w-[35%] text-center">
                {/* <p className="color-text-e text-start text-sl mb-6 tablet:text-xl color-text-e">
                  Tải ứng dụng My Panasonic để đăng kí bảo hành và tích lũy hạng Thành viên chính
                  thức.
                  <br />
                  Xem thêm{' '}
                  <a
                    target={'_blank'}
                    href="https://www.panasonic.com/vn/consumer/thong-tin-app.html?utm_source=Microsite+%26+Landing+Page+Tree+Planting&utm_medium=Microsite+%26+Landing+Page+Tree+Planting&utm_campaign=Tree+Planting&utm_id=Tree+Planting&utm_term=Tree+Planting&utm_content=Tree+Planting"
                    className="color-text-green-29 underline"
                    rel="noreferrer"
                  >
                    Tại đây.
                  </a>
                </p> */}

                <div className="my-0 ">
                  <div className=" home__form-image  my-4">
                    <Image src={productHome5} alt="" />
                  </div>
                  <div className=" gap-4">
                    <div className="flex justify-center">
                      <a
                        href="https://apps.apple.com/vn/app/my-panasonic/id6444000200"
                        target={'_blank'}
                        rel="noreferrer"
                        className="flex justify-center items-center"
                      >
                        <Image src={downloadStoreImg} alt="" />
                      </a>
                    </div>
                    <div className="flex justify-center my-3">
                      <a
                        className="flex justify-center items-center"
                        href="https://play.google.com/store/apps/details?id=com.piscap.mypanasonic"
                        target={'_blank'}
                        rel="noreferrer"
                      >
                        <Image src={downloadGgPlayImg} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[65%]">
                <h2 className="mb-4 text-center font-bold text-4xl text-secondary-color">
                  ĐĂNG KÝ BẢO HÀNH ĐIỆN TỬ
                </h2>

                <HomeFormRegister onShowPopupThank={(body) => handleShowPopupThank(body)} />
              </div>
            </div>
          </div>
        </article>

        <article id="followTree" className=" relative z-[2]">
          <img src={bgTheoDoiCayCuaBan.src} className="w-full" alt="theo-doi-cay-cua-ban" />
          <img
            className="absolute top-[20%] right-0"
            src={decorLeaf6.src}
            alt="theo-doi-cay-cua-ban"
          />
          <div className=" absolute top-[10%] right-[12%]">
            <div
              className="home__follow"
              style={{
                maxWidth: 460,
                padding: 0,
              }}
            >
              <h1 className="color-primary font-bold uppercase text-center mb-2 text-2xl tablet:text-4xl">
                theo dõi cây của bạn
              </h1>
              <p className="font-medium text-sl color-text-22 mb-4 text-center">
                Chỉ với một bước nhập thông tin. Dù ở đâu, bạn vẫn có thể dễ dàng ghé rừng thăm cây.
              </p>
              <HomeFormFollow />
            </div>
          </div>
          <div className="absolute bottom-[35%] translate-y-1/2 transte left-[15%]">
            <div className="w-[550px]">
              <h1 className="color-primary font-bold uppercase mb-3 text-2xl tablet:text-4xl">
                cuộc thi
                <span className="block">&quot;kể chuyện rừng của bạn&quot;</span>
              </h1>
              <p className=" pb-6">
                Mỗi câu chuyện chia sẻ về phút giây sống khỏe hay trải nghiệm đặc biệt của bạn với
                rừng, bạn sẽ góp phần trồng thêm cây xanh để gìn giữ những chuyện thú vị về rừng.
                <br />
                Chia sẻ chuyện rừng của bạn để nhận ngay những phần quà hấp dẫn.
              </p>
              <button
                type="button"
                className="py-3 px-10 font-bold home__form-btn text-white-500 text-2xl "
              >
                Tham gia ngay
              </button>
            </div>
          </div>
        </article>

        <article id="aboutProgram" className="relative z-[3] -translate-y-[100px] -mb-[100px]">
          <img src={bgAboutProgram.src} className="w-full" alt="" />
          <div className="grid grid-cols-2 gap-7 w-[70%] absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2">
            <div>
              <img className='w-full' src={aboutProgram.src} alt="" />
            </div>
            <div className="text-white-500">
              <h2 className="text-white-500 font-bold uppercase  text-2xl tablet:text-4xl">
                về chương trình
              </h2>
              <p className='mb-2'>
                Chương trình &quot;Sống khỏe góp xanh - Giữ chuyện rừng còn mãi&quot; năm 2023 tiếp nối sự
                thành công của chương trình &quot;Sống khỏe góp xanh&quot; năm trước nhằm hiện thực hóa cam
                kết Green Impact của Tập đoàn Panasonic:{' '}
              </p>
              <ul className="list-disc pl-7 pb-4">
                <li>Hướng tới mục tiêu giảm phát thải khí CO2 đến năm 2050.</li>
                <li>Hưởng ứng lời kêu gọi trồng 1 tỷ cây xanh của Thủ tướng Chính phủ.</li>
                <li>
                  Lan tỏa lối sống khỏe mạnh toàn diện, góp xanh cho rừng vì một Việt Nam xanh -
                  khỏe mạnh.
                </li>
              </ul>
              <p className='mb-3'>
                Mang nhiều sứ mệnh lớn lao, chương trình trồng cây của Panasonic luôn chú trọng vào
                tính minh bạch, quy mô lớn, phạm vi ảnh hưởng
              </p>
              <p>
                <svg
                  className="map-pin inline-block"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.4375 14.2188C28.4375 24.0625 17.5 31.7188 17.5 31.7188C17.5 31.7188 6.56251 24.0625 6.56251 14.2188C6.56251 11.3179 7.71485 8.53595 9.76603 6.48477C11.8172 4.43359 14.5992 3.28125 17.5 3.28125C20.4008 3.28125 23.1828 4.43359 25.234 6.48477C27.2852 8.53595 28.4375 11.3179 28.4375 14.2188V14.2188Z"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.6336 20.5751C21.5148 20.5751 24.6611 17.3937 24.6611 13.4693C24.6611 9.54489 21.5148 6.36353 17.6336 6.36353C13.7524 6.36353 10.6061 9.54489 10.6061 13.4693C10.6061 17.3937 13.7524 20.5751 17.6336 20.5751Z"
                    fill="#DCEEC0"
                  />
                  <path d="M16.9217 12.0564H16.6963V24.3937H16.9217V12.0564Z" fill="#00874A" />
                  <path
                    d="M15.1611 16.8172C14.4811 16.8164 13.8269 16.5537 13.3315 16.0826C12.8361 15.6116 12.5367 14.9674 12.4941 14.2812L12.4843 14.1161L12.6074 14.0053C12.9792 13.6633 13.4395 13.4352 13.9346 13.3475C14.4297 13.2599 14.9392 13.3163 15.4038 13.5103C15.8696 13.7009 16.2723 14.0213 16.5649 14.4344C16.8575 14.8475 17.028 15.3361 17.0566 15.8434L17.0671 16.009L16.9439 16.1192C16.4557 16.5672 15.8204 16.8159 15.1611 16.8172ZM13.1869 14.4063C13.2365 14.7532 13.3748 15.0809 13.5882 15.3571C13.8016 15.6333 14.0827 15.8483 14.4035 15.9809C14.7244 16.1134 15.074 16.1589 15.4176 16.1129C15.7612 16.0668 16.0869 15.9308 16.3626 15.7182C16.3142 15.3709 16.1764 15.0425 15.9628 14.7661C15.7492 14.4897 15.4674 14.275 15.1457 14.1435C14.8252 14.0095 14.4754 13.9632 14.1315 14.0094C13.7876 14.0555 13.4618 14.1924 13.1869 14.4063Z"
                    fill="#00874A"
                  />
                  <path
                    d="M18.7857 16.98C17.9884 16.9782 17.2194 16.6814 16.6237 16.1456L16.5005 16.036L16.5091 15.871C16.5407 15.2495 16.7451 14.6496 17.099 14.1403C17.4528 13.6311 17.9417 13.2333 18.5093 12.9926C19.0769 12.7519 19.7001 12.6781 20.3074 12.7797C20.9146 12.8814 21.4811 13.1543 21.9417 13.5672L22.0649 13.6761L22.0562 13.8418C22.0271 14.464 21.8237 15.0651 21.4697 15.5749C21.1157 16.0848 20.6257 16.4825 20.0568 16.7215C19.6543 16.8923 19.2222 16.9801 18.7857 16.98ZM17.1988 15.7396C17.5613 16.027 17.9933 16.2109 18.4499 16.2722C18.9065 16.3335 19.371 16.27 19.795 16.0883C20.2202 15.9096 20.5903 15.619 20.8668 15.2467C21.1433 14.8744 21.3161 14.434 21.3672 13.9713C21.004 13.6853 20.572 13.5023 20.1158 13.4411C19.6595 13.3798 19.1953 13.4424 18.7709 13.6226C18.3464 13.8028 17.9771 14.094 17.7008 14.4663C17.4246 14.8385 17.2513 15.2785 17.1988 15.7409V15.7396Z"
                    fill="#00874A"
                  />
                  <path
                    d="M16.809 12.5697C16.4631 12.5697 16.125 12.4659 15.8374 12.2716C15.5498 12.0773 15.3257 11.8012 15.1933 11.478C15.0609 11.1549 15.0263 10.7993 15.0938 10.4563C15.1613 10.1133 15.3278 9.7982 15.5724 9.5509C15.817 9.30359 16.1286 9.13517 16.4679 9.06694C16.8071 8.9987 17.1587 9.03373 17.4783 9.16757C17.7978 9.30141 18.071 9.52807 18.2632 9.81887C18.4553 10.1097 18.5579 10.4516 18.5579 10.8013C18.5574 11.2701 18.373 11.7197 18.0451 12.0512C17.7173 12.3827 17.2727 12.5692 16.809 12.5697ZM16.809 9.71726C16.5968 9.71726 16.3894 9.78089 16.213 9.90011C16.0366 10.0193 15.8991 10.1888 15.8179 10.387C15.7367 10.5852 15.7155 10.8034 15.757 11.0138C15.7984 11.2242 15.9006 11.4175 16.0507 11.5691C16.2008 11.7208 16.392 11.8241 16.6001 11.8658C16.8083 11.9076 17.024 11.8861 17.22 11.8039C17.416 11.7217 17.5835 11.5825 17.7013 11.4041C17.8191 11.2256 17.8819 11.0159 17.8818 10.8013C17.8813 10.5138 17.7681 10.2383 17.567 10.0351C17.3659 9.83189 17.0933 9.71759 16.809 9.71726Z"
                    fill="#00874A"
                  />
                </svg>
                <span className='underline underline-offset-4 inline-block ml-2'>Xem thêm</span>
              </p>
            </div>
          </div>
          <img className='absolute right-0 -top-[15%]' src={decorLeaf7.src} alt="" />
          <img className='absolute left-0 -bottom-[18%]' src={decorLeaf8.src} alt="" />
          <img className='absolute left-0 -top-[8%]' src={decorLeaf9.src} alt="" />
          <img className='absolute right-0 -bottom-[14%]' src={decorLeaf10.src} alt="" />
        </article>

        {/* <article id="registerPlanting" className="home__crop">
          <div
            className="home__crop-bg"
            style={{ backgroundImage: `url(${registerCropImg.src})` }}
          ></div>
          <div className="container-custom">
            <div className="py-16">
              <h1 className="text-white-500 font-semibold uppercase text-center text-2xl tablet:text-2.5xl">
                trồng cây cùng <br className="block laptop:hidden" /> Panasonic Việt nam
              </h1>

              <p className="text-white-500 text-center my-8">
                Tham gia chương trình{' '}
                <span className="font-semibold uppercase">Sống khỏe Góp xanh</span> ngay để chung
                tay cùng Panasonic
                <br className="hidden tablet:block desktop:hidden" /> Việt Nam góp cây xanh và có cơ
                hội nhận nhiều <br className="block tablet:hidden desktop:block" />
                <span className="uppercase font-semibold">ưu đãi hấp dẫn</span>
              </p>
              <div className="flex justify-center">
                <a
                  href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html"
                  target={'_blank'}
                  className="home__crop-btn py-3 px-10 bg-white-500 color-primary font-semibold uppercase"
                  rel="noreferrer"
                >
                  Tham Gia Ngay
                </a>
              </div>
            </div>
          </div>
        </article> */}

        {/* <article id="show" className="container-custom my-10">
          <h1 className="color-primary font-semibold uppercase text-center mb-3 text-2xl tablet:text-2.5xl">
            Về Chương Trình
          </h1>

          <p className="color-text-33 text-sl mb-3">
            Chương trình “Sống khỏe góp xanh cùng Panasonic” đánh dấu năm đầu tiên trong hành trình
            50 năm tiếp theo của Panasonic tại Việt Nam, khẳng định nỗ lực thực hiện cam kết “Green
            Impact” của Tập đoàn Panasonic, đồng thời hưởng ứng lời kêu gọi trồng 1 tỷ cây xanh của
            Thủ tướng Chính phủ.
          </p>
          <p className="color-text-33 text-sl mb-3">
            Mang nhiều sứ mệnh lớn lao, chương trình “Sống khỏe góp xanh cùng Panasonic” chú trọng
            tính minh bạch, quy mô lớn, phạm vi ảnh hưởng bao trùm cả về khu vực địa lý và đối tượng
            tham gia.
          </p>
          <ul className="">
            <li className="color-text-33 text-sl mb-3 disc">
              Chiến dịch trồng cây quy mô lớn nhất từ trước tới nay của Panasonic Việt Nam được
              triển khai trên 13 tỉnh thành khắp cả nước.
            </li>
            <li className="color-text-33 text-sl mb-3 disc">
              Chương trình trồng rừng đầu tiên có sự chung tay của khách hàng và đối tác.
            </li>

            <li className="color-text-33 text-sl mb-3 disc">
              Chương trình có sự đồng hành của Trung tâm truyền thông tài nguyên môi trường - Bộ Tài
              Nguyên Môi trường cùng các đơn vị truyền thông khác.
            </li>

            <li className="color-text-33 text-sl mb-3 disc">
              Cây trồng trong chương trình được lựa chọn với tiêu chí tối ưu hóa lượng CO2 hấp thụ,
              góp phần phủ xanh các khu vực đồi núi trọc, bảo tồn hệ sinh thái địa phương.
            </li>
          </ul>
        </article> */}

        {/* {videoData && videoData?.data?.data && videoData?.data?.data[0]?.linkVideo && (
          <div className="laptop:w-3/5 tablet:w-3/5 mobile:w-full laptop:h-[500px] tablet:h-[500px] mobile:h-[300px] mx-auto mb-10 mobile:px-4">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoData?.data?.data[0]?.linkVideo}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )} */}

        <Map></Map>

        <article id="partner" className="home__partner relative -translate-y-[100px] -mb-[100px]">
          <img className='w-full mb-14' src={bgPattern.src} alt="" />
          <div className="container-custom absolute top-[50%] -translate-y-1/2 left-0 w-full">
            <div className="py-10 text-center">
              <h1 className="text-white-500 font-bold uppercase text-center mb-8 text-2xl tablet:text-4xl">
                Đối Tác
              </h1>

              <div className=" inline-grid  grid-cols-6  gap-8">
                {listImgPartners?.map((partner, index) => (
                  <div key={index} className="home__partner-image text-center">
                    <Image width={120} height={120} src={partner.url} alt="" layout="fixed" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div id="news" className='pb-12'>
          <HomePost />
        </div>

        <Script src="https://sp.zalo.me/plugins/sdk.js"></Script>
      </section>
    </>
  );
}

export default HomePage;
