import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Seo from 'src/components/Seo';
import myGardenImg from 'public/images/my-garden.png';
import galleryBanner from 'public/images/gallery-banner.png';
import galleryBannerMobile from 'public/images/gallery-banner-mobile.jpg';
import bgGalleryProcess from 'public/images/bg-gallery-process.png';
import aboutProgram2 from 'public/images/about-program-2.jpeg';
import galleryItem1 from 'public/images/gallery-item-1.png';
import galleryItem2 from 'public/images/gallery-item-2.png';
import galleryItem3 from 'public/images/gallery-item-3.png';
import galleryItem4 from 'public/images/gallery-item-4.png';
import decorLeaf1 from 'public/images/decor-leaf-1.png';
import decorLeaf2 from 'public/images/decor-leaf-2.png';
import decorLeaf13 from 'public/images/decor-leaf-13.png';
import WaveSurfer from 'wavesurfer.js';
import Pagination from 'src/components/Pagination/Pagination';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useLazyGetCompositionsQuery } from 'src/services/gallery';
import Modal from 'antd/lib/modal/Modal';
import Image, { StaticImageData } from 'next/image';
import dbArrow from 'public/icons/db-arrow.svg';
import playIcon from 'public/icons/play-icon.svg';
import useWindowSize from 'src/app/hooks/useWindowSize';
import bgMyGardenTop from 'public/images/bg-my-garden-top.png';
import unLoadIcon from 'public/images/unload-icon.png';
import {
  filterFinalResult,
  filterLibrary,
  filterWeeklyResult,
  isAudio,
  isImage,
  isVideo,
  join,
} from 'src/utils/helpers/common';
import VideoPlayer from 'src/components/VideoPlayer/VideoPlayer';
import WaveSurferPlayer from 'src/components/WaveSurferPlayer/WaveSurferPlayer';
import SwiperImgCompostion from 'src/components/SwiperImgComposition/SwiperImgCompostion';
import moment from 'moment';

// import audioExamp from "public/audio/audio3.mp3";
const GalleryContainer = () => {
  const router = useRouter();
  const size = useWindowSize();

  const [getCompositionPage] = useLazyGetCompositionsQuery();
  const [compostion, setCompostion] = useState<{
    description: string;
    isShow: boolean;
    audio: string;
    name: string;
    userName: string;
    image: string;
    video: string;
  }>();

  const [indexImage, setIndexImage] = useState(0);

  const [compostions, setCompostions] = useState<{
    data: [];
    limit: number;
    finalResult: any[];
    weeklyResult: any[];
  }>();

  useEffect(() => {
    (async () => {
      const response = await getCompositionPage({ page: '1' });
      if (response.isSuccess) {
        setCompostions({
          // data: response?.data?.data.map((item) => {
          //   return {
          //     ...item,
          //     name: (item.name as string).slice((item.name as string).indexOf('|') + 1),
          //   };
          // }),
          data: filterLibrary(response?.data?.data) as [],
          limit: 6,
          finalResult: filterFinalResult(response?.data?.data),
          weeklyResult: filterWeeklyResult(response?.data?.data),
        });
      }
    })();
  }, []);

  const handleIndexImage = (index: number) => {
    setIndexImage(index);
  };

  const renderImageCompostion = (item: any, index: number) => {
    let jsxHtml = <></>;
    if (isImage(item?.files[0])) {
      jsxHtml = (
        <div className="overflow-hidden w-full aspect-video bg-transparent rounded-xl tablet:rounded-2xl relative">
          <div className={`gallery__silder-img gallery__silder-img-${index}`}>
            <SwiperImgCompostion
              files={item?.files}
              index={index}
              setIndexImage={handleIndexImage}
            />
          </div>
        </div>
      );
    }
    if (isAudio(item?.files[0])) {
      jsxHtml = (
        <div className="overflow-hidden w-full aspect-video bg-transparent rounded-xl tablet:rounded-2xl relative pb-[10px] laptop:pb-[30px]">
          <div className="h-full ">
            <div className="relative h-full overflow-hidden rounded-xl tablet:rounded-2xl">
              <Image src={aboutProgram2} layout="fill" />
              <div className="absolute bottom-[10px] left-0 w-full">
                <WaveSurferPlayer
                  height={50}
                  waveColor="#fff"
                  progressColor="#04874A"
                  cursorWidth={0}
                  barWidth={3}
                  barGap={3}
                  barRadius={4}
                  url={item?.files[0]}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (isVideo(item?.files[0])) {
      jsxHtml = (
        <div className="overflow-hidden w-full aspect-video bg-transparent rounded-xl tablet:rounded-2xl relative pb-[10px] laptop:pb-[30px]">
          <div className="h-[100%] overflow-hidden rounded-xl tablet:rounded-2xl">
            <VideoPlayer url={item?.files[0]} poster={''} />
          </div>
        </div>
      );
    }
    return jsxHtml;
  };

  const renderCompostionElement = (item: any, index, indexImage) => {
    return (
      <div
        key={index}
        className="gallery__composition rounded-xl tablet:rounded-2xl p-2 tablet:p-4 bg-gray-100"
        style={{
          boxShadow: `0px 4px 12px 0px rgba(0, 0, 0, 0.25)`,
        }}
        onClick={(e) => {
          // console.log("eee: ", e.currentTarget.closest)
          if (size.width >= 1280) return;
          handleLoadCompostion(item, indexImage, e.currentTarget.querySelector('[data-index]'));
        }}
      >
        {/* mb-1 tablet:mb-3 tablet:mb-8   */}
        {renderImageCompostion(item, index)}
        <p
          className="gallery__compostion-title mt-2 laptop:mt-0 cursor-pointer color-primary font-bold text-1sl tablet:text-2xl mb-1 tablet:mb-3"
          onClick={(e) => {
            handleLoadCompostion(
              item,
              indexImage,
              e.currentTarget.closest('.gallery__composition').querySelector('[data-index]')
            );
          }}
        >
          {item?.name}
        </p>
        <p className="gallery__compostion-des mb-1 tablet:mb-3 text-2sl tablet:text-xl">
          {item?.description}
        </p>
        <span className="block text-green-primary font-bold text-2sl tablet:text-sl mb-1 tablet:mb-8">
          Bởi {item?.userName}
        </span>
      </div>
    );
  };

  const compostionsMemo = useMemo(() => {
    return compostions?.data?.slice(0, compostions.limit).map((item: any, index) => {
      return renderCompostionElement(item, index, indexImage);
    });
  }, [compostions, indexImage]);

  const compostionFinal = useMemo(() => {
    return compostions?.finalResult.map((item, index) => {
      return renderCompostionElement(item, index, indexImage);
    });
  }, [compostions, indexImage]);

  const compostionWeekly = useMemo(() => {
    return compostions?.weeklyResult.map((i: [], indexParent) => {
      let dateStart = new Date(new Date('2023-11-18').valueOf() + 86400000 * indexParent * 7);
      let dateEnd = new Date(
        new Date('2023-11-18').valueOf() + 86400000 * ((indexParent + 1) * 7 - 1)
      );
      let options = [{ day: 'numeric' }, { month: 'numeric' }, { year: 'numeric' }];

      let weeksText = '';

      switch (indexParent) {
        case 0: {
          weeksText = '1';
          break;
        }
        case 1: {
          weeksText = '2';
          break;
        }
        case 2: {
          weeksText = '3';
          break;
        }
        case 3: {
          weeksText = '4';
          break;
        }
        case 4: {
          weeksText = '5';
          break;
        }
        case 5: {
          weeksText = '6';
          break;
        }
        case 6: {
          weeksText = '7';
          break;
        }
        case 7: {
          weeksText = '8';
          break;
        }
      }
      // let joinedStart = join(dateStart, options, '/');
      // let joinedEnd = join(dateEnd, options, '/');
      // console.log('dateEnd: ', dateEnd);
      return (
        <div key={indexParent}>
          <h1 className="color-primary font-bold uppercase text-center  text-2xl tablet:text-4xl">
            KẾT QUẢ GIẢI TUẦN {weeksText}
          </h1>
          <p className="color-primary font-bold uppercase text-center mb-6 text-1xl tablet:text-3xl">
            {/* {`${dateStart.getDate()}/${dateStart.getMonth()}/${dateStart.getFullYear()} - ${dateEnd.getDate()}/${dateEnd.getMonth()}/${dateEnd.getFullYear()}`} */}
            {`${new Intl.DateTimeFormat('en-GB').format(dateStart)} - ${new Intl.DateTimeFormat(
              'en-GB'
            ).format(dateEnd)}`}
          </p>
          <div
            className={`relative z-[2] bg-transparent w-full pt-0 mobileSM:pt-4 pb-0 mobileSM:pb-0  `}
          >
            <div className="w-[90%] tablet:w-[92%] laptop:w-[85%] desktopXL:w-[85%] mx-auto grid grid-cols-1 laptop:grid-cols-2 gap-3 tablet:gap-10 mb-10">
              {i.map((item: any, index) => {
                return renderCompostionElement(item, index, indexImage);
              })}
            </div>
          </div>
        </div>
      );
    });
  }, [compostions, indexImage]);

  const handleOnclickPage = async (value) => {
    try {
      const response = await getCompositionPage({ page: value });
      if (response?.data) {
        setCompostions(response?.data);
      }
    } catch (err) {}
  };

  const handleLoadCompostion = (item: any, index, elementHtml) => {
    let image = null;
    let audio = null;
    let video = null;

    let link = item?.files[elementHtml.getAttribute('data-index')];
    if (isImage(link)) {
      image = link;
    }
    if (isAudio(link)) {
      image = aboutProgram2.src;
      audio = link;
    }
    if (isVideo(link)) {
      video = link;
    }

    setCompostion({
      ...compostion,
      isShow: true,
      image: image,
      name: item?.name,
      userName: item?.userName,
      audio: audio,
      video: video,
      description: item?.description,
    });
  };

  const handleClickMoreCompostion = () => {
    setCompostions({
      ...compostions,
      limit: compostions.limit + 6,
    });
  };

  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}`}
        title="Gallery"
        thumnail={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/${myGardenImg.src}`}
        description="Gallery"
      />
      <section className="gallery relative">
        <article
          className="relative h-[100vh] tablet:h-[100vh] laptop:h-[100vh] bg-no-repeat bg-cover bg-center gallery__banner"
          style={{
            backgroundImage: `url(${
              size.width > 767 ? galleryBanner.src : galleryBannerMobile.src
            })`,
          }}
        >
          <div className="inline-block  absolute left-[50%] -translate-x-1/2 top-[5%] laptop:top-[5%] w-full font-bold mx-auto text-green-primary text-center">
            <h1 className="uppercase gallery__heading-1 text-green-primary font-normal">
              cuộc thi
              <p className="gallery__heading-1 font-bold">
                <span className="block mobileSM:inline">&quot;GÓP CHUYỆN RỪNG HAY -</span> RƯỚC NGAY
                QUÀ CHẤT&quot;
                <span className="block font-normal gallery__heading-1-date">
                  Thời gian: 18/11/2023-12/01/2024 
                </span>
              </p>
            </h1>
          </div>
          <p className="text-sl mobileSM:text-1.5xl desktop:text-2xl text-white-500 absolute bottom-[10%] mobileSM:bottom-[12%] left-[50%] text-center -translate-x-1/2 w-[95%] mobileSM:w-[80%] mx-auto font-bold uppercase">
            Mỗi chia sẻ về rừng từ bạn sẽ giúp ươm mầm cảm hứng sống khỏe mạnh, tích cực cùng
            Panasonic. Hãy lắng nghe câu chuyện về rừng và lan tỏa câu chuyện của riêng bạn nhé!
          </p>
        </article>
        <article className="relative z-[3] gallery__process bg-no-repeat bg-cover bg-center h-full tablet:h-[748px] translate-y-0  laptop:-translate-y-[120px] mb-0 laptop:-mb-[120px] py-12 tablet:py-0">
          <div className="relative mobileSM:absolute top-0 mobileSM:top-[50%] translate-y-0 mobileSM:-translate-y-1/2">
            <h1 className="mb-8 gallery__heading-1 text-white-500 text-center w-[95%] tablet:w-[80%] mx-auto font-bold uppercase">
              GÓP CHUYỆN RỪNG HAY VỚI 4 BƯỚC
            </h1>
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-3 laptop:gap-8 text-white-500 w-[95%] laptop:w-[90%] mx-auto">
              <div className="text-center border-2 rounded-2xl overflow-hidden w-full mx-auto">
                <p className="uppercase text-xl tablet:text-3xl font-bold p-2 text-center relative mb-4">
                  bước 1
                  <span className="absolute top-0 left-0 w-full h-full bg-white-500 opacity-20 "></span>
                </p>
                <div>
                  <img className="mx-auto h-[50px] tablet:h-full " src={galleryItem1.src} alt="" />

                  <p className="w-[90%] laptop:w-[85%] text-base tablet:text-xl h-auto py-4 mx-auto font-bold">
                    Chia sẻ bài viết{' '}
                    <a href="https://bit.ly/46k4IOq" target="_blank" rel="noopener noreferrer">
                      https://bit.ly/46k4IOq
                    </a>{' '}
                    về trang cá nhân ở chế độ công khai kèm hashtag #PanasonicVietnam
                    #Songkhoegopxanh #Giuchuyenrungconmai
                  </p>
                </div>
              </div>
              <div className="text-center border-2 rounded-2xl overflow-hidden w-full mx-auto">
                <p className="uppercase text-xl tablet:text-3xl font-bold p-2 text-center relative mb-4">
                  bước 2
                  <span className="absolute top-0 left-0 w-full h-full bg-white-500 opacity-20 "></span>
                </p>
                <div>
                  <img className="mx-auto h-[50px] tablet:h-full " src={galleryItem2.src} alt="" />

                  <p className="w-[90%] laptop:w-[85%] text-base tablet:text-xl h-auto py-4 mx-auto font-bold">
                    Đăng bài trên trang cá nhân dưới dạng Video/Audio/Hình ảnh, để chia sẻ trải
                    nghiệm/kỷ niệm/khoảnh khắc ấn tượng của bạn với rừng, kèm hashtag của cuộc thi
                    #PanasonicVietnam #Songkhoegopxanh #Giuchuyenrungconmai
                  </p>
                </div>
              </div>
              <div className="text-center border-2 rounded-2xl overflow-hidden w-full mx-auto">
                <p className="uppercase text-xl tablet:text-3xl font-bold p-2 text-center relative mb-4">
                  bước 3{' '}
                  <span className="absolute top-0 left-0 w-full h-full bg-white-500 opacity-20 "></span>
                </p>
                <div>
                  <img className="mx-auto h-[50px] tablet:h-full " src={galleryItem3.src} alt="" />
                  <p className="w-[90%] laptop:w-[85%] text-base tablet:text-xl h-auto py-4 mx-auto font-bold">
                    Bình luận đường liên kết (link) của bài dự thi trên Facebook cá nhân vào bên
                    dưới phần bình luận của bài viết này:{' '}
                    <a href="https://bit.ly/46k4IOq" target="_blank" rel="noopener noreferrer">
                      https://bit.ly/46k4IOq
                    </a>
                  </p>
                </div>
              </div>
              <div className="text-center border-2 rounded-2xl overflow-hidden w-full mx-auto">
                <p className="uppercase text-xl tablet:text-3xl font-bold p-2 text-center relative mb-4">
                  bước 4{' '}
                  <span className="absolute top-0 left-0 w-full h-full bg-white-500 opacity-20 "></span>
                </p>
                <div>
                  <img className="mx-auto h-[50px] tablet:h-full " src={galleryItem4.src} alt="" />
                  <p className="w-[90%] laptop:w-[85%] text-base tablet:text-xl h-auto py-4 mx-auto font-bold">
                    BTC chọn ra 2 giải/tuần và 3 giải chung cuộc theo tiêu chí đã công bố trên link
                    (T&C):{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://bit.ly/3R7MJX9">
                      https://bit.ly/3R7MJX9
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden laptop:block absolute -top-[24%] right-0">
              <Image
                src={decorLeaf13.src}
                height={decorLeaf13.height}
                width={decorLeaf13.width}
                alt=""
              />
            </div>
          </div>
          <img
            className="hidden tablet:block absolute left-0 -bottom-[16%] desktop:-bottom-[20%] w-[12%]"
            src={decorLeaf1.src}
            alt=""
          />
        </article>
        <article
          className="gallery__total-compostion  "
          style={{
            backgroundImage: `url(${bgMyGardenTop.src})`,
          }}
        >
          <h1 className="color-primary font-bold uppercase text-center mb-6 text-2xl tablet:text-4xl">
            thư viện chuyện rừng
          </h1>

          <div
            className={`relative z-[2] bg-transparent w-full pt-0 mobileSM:pt-4 pb-0 mobileSM:pb-0  `}
          >
            <div className="w-[90%] tablet:w-[92%] desktop:w-[85%] mx-auto grid grid-cols-1 laptop:grid-cols-3 gap-3 tablet:gap-10 mb-4 mobileSM:mb-10">
              {compostionsMemo}
            </div>
            <div
              className={`flex justify-center ${
                compostions?.limit >= compostions?.data.length ? 'hidden' : ''
              }`}
            >
              <button
                type="button"
                className={` visible laptop:invisible  py-3 px-10 font-bold home__form-btn text-white-500 text-xl tablet:text-2xl `}
                onClick={() => {
                  handleClickMoreCompostion();
                }}
              >
                Xem Thêm
              </button>
            </div>
          </div>
          <img
            className="hidden tablet:block z-[1] absolute right-0 -bottom-[0%]"
            src={decorLeaf2.src}
            alt=""
          />
        </article>
        <div className="relative">
          <div
            className={`absolute -top-[30px] desktopXL:top-0 -translate-y-[9rem] z-20 left-[50%] -translate-x-1/2 flex justify-center ${
              compostions?.limit >= compostions?.data.length ? 'hidden' : ''
            }`}
          >
            <button
              type="button"
              className={`hidden laptop:block py-3 px-10 font-bold home__form-btn text-white-500 text-xl tablet:text-2xl`}
              onClick={() => {
                handleClickMoreCompostion();
              }}
            >
              Xem Thêm
            </button>
          </div>
        </div>
        {compostions?.finalResult.length > 0 ? (
          <article className="gallery__final-results">
            <h1 className="text-white-500 font-bold uppercase text-center mb-6 text-2xl tablet:text-4xl">
              KẾT QUẢ chung cuộc
            </h1>
            <div
              className={`relative z-[2] bg-transparent w-full pt-0 mobileSM:pt-4 pb-0 mobileSM:pb-0  `}
            >
              <div className="w-[90%] tablet:w-[92%] desktop:w-[85%] mx-auto grid grid-cols-1 laptop:grid-cols-3 gap-3 tablet:gap-10 mb-4 mobileSM:mb-10">
                {compostionFinal}
              </div>
            </div>
          </article>
        ) : (
          ''
        )}
        <article className="gallery__weekly-results">{compostionWeekly}</article>
      </section>

      <Modal
        className="gallery__modal relative"
        open={compostion?.isShow}
        footer={null}
        width={1140}
        onCancel={() => {
          setCompostion({ ...compostion, isShow: false, image: null, audio: null, video: null });
        }}
      >
        <div className="relative z-1">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-3">
            {compostion?.image ? (
              <Image src={compostion?.image} alt="" layout="fill" objectFit="contain" />
            ) : (
              ''
            )}
            {compostion?.audio ? (
              <div className="absolute bottom-[20px] left-0 w-full px-0 laptop:px-4">
                <WaveSurferPlayer
                  height={50}
                  waveColor="#fff"
                  progressColor="#04874A"
                  cursorWidth={0}
                  barWidth={3}
                  barGap={3}
                  barRadius={4}
                  url={compostion?.audio}
                />
              </div>
            ) : (
              ''
            )}
            {compostion?.video ? <VideoPlayer url={compostion.video} poster={''} /> : ''}
          </div>
          <div className="px-0 tablet:px-6">
            <h2 className="mb-3 text-white-500 uppercase font-bold text-2xl tablet:text-3xl leading-none">
              {compostion?.name}
            </h2>
            <p className=" text-1xl mb-3 text-green-60 uppercase font-bold leading-none">
              Bởi {compostion?.userName}
            </p>
            <div className="w-full h-[2px] bg-white-500 mb-3"></div>
            <div className="mb-3">{compostion?.description}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GalleryContainer;
// pagination
{
  /* <div
            className={`relative z-[2] bg-transparent w-full pt-0 mobileSM:pt-4 pb-16 mobileSM:pb-0  ${
              compostion?.isShow ? 'hidden' : ''
            }`}
          >
            <div className="w-[90%] tablet:w-[92%] desktop:w-[85%] mx-auto grid grid-cols-2 laptop:grid-cols-3 gap-3 tablet:gap-10 mb-10">
              {compostionsMemo}
            </div>
            <div className="flex justify-center">
              <Pagination
                limit={compostions?.limit}
                total={compostions?.total}
                page={compostions?.page}
                onPage={(value) => {
                  handleOnclickPage(value);
                }}
              />
            </div>
          </div> */
}

// detail compostion
{
  /* <div className={`${compostion?.isShow ? '' : 'hidden'} relative z-[2] pb-[40px]`}>
            <div className="mb-5 w-[80%] mx-auto bg-green-primary p-4 rounded-2xl">
              <div className="aspect-[16/9] bg-black-600 rounded-2xl mb-4 relative">
                {compostion?.image ? (
                  <Image src={compostion?.image} alt="" layout="fill" objectFit="cover" />
                ) : (
                  ''
                )}
                <div className="absolute bottom-5 left-0 w-full flex px-4 flex-wrap">
                  <div className=" w-[100%] tablet:w-auto">
                    <div className="w-[70%] tablet:w-[100%] flex items-center justify-center tablet:justify-start">
                      <div className="mx-4">
                        <Image src={dbArrow} width={dbArrow.width} height={dbArrow.height} />
                      </div>
                      <div
                        className="mx-4 cursor-pointer"
                        onClick={() => {
                          if (!waveSurfer) return;
                          if (!compostion.audio) return;
                          if (!isPlay) {
                            waveSurfer.play();
                          } else {
                            waveSurfer.pause();
                          }
                          setIsPlay(!isPlay);
                        }}
                      >
                        <Image src={playIcon} width={playIcon.width} height={playIcon.height} />
                      </div>
                      <div className="mx-4">
                        <Image
                          src={dbArrow}
                          width={dbArrow.width}
                          height={dbArrow.height}
                          className="-scale-[1]"
                        />
                      </div>
                    </div>
                  </div>
                  <div ref={refWav} id="waveForm" className="flex-1 "></div>
                </div>
              </div>
              <div className="px-0 tablet:px-6">
                <h2 className="mb-3 text-white-500 uppercase font-bold text-2xl tablet:text-3xl leading-none">
                  {compostion?.name}
                  Name
                </h2>
                <p className=" text-1xl mb-3 text-green-60 uppercase font-bold leading-none">
                  Bởi {compostion?.userName}
                  user name
                </p>
                <div className="w-full h-[2px] bg-white-500 mb-3"></div>
                <div className="mb-3 text-white-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum maiores
                  dolor, blanditiis aperiam rem delectus odio et quae. Omnis asperiores dolor animi
                  veniam laborum doloribus. Aliquam a assumenda eligendi.
                </div>
              </div>
            </div>
            <div className="text-center ">
              <button
                type="button"
                className="text-center py-3 px-10 font-bold home__form-btn text-white-500 text-xl "
                onClick={() => {
                  if (!waveSurfer) return;
                  waveSurfer.pause();
                  setIsPlay(false);
                  setCompostion({ ...compostion, isShow: false });
                }}
              >
                QUAY LẠI
              </button>
            </div>
          </div> */
}

// const renderDemo = (number: number = 6) => {
//   let array6 = number == 6 ? Array.from(Array(6).keys()) : Array.from(Array(number).keys());

//   return array6.map((i, index) => {
//     return (
//       <div
//         key={index}
//         className="cursor-pointer rounded-xl tablet:rounded-2xl p-2 tablet:p-4 bg-gray-100"
//         style={{
//           boxShadow: `0px 4px 12px 0px rgba(0, 0, 0, 0.25)`,
//         }}
//       >
//         <div className="bg-green-primary mb-1 tablet:mb-3 overflow-hidden tablet:mb-8 w-full aspect-video bg-transparent rounded-xl tablet:rounded-2xl"></div>
//         <p className="color-primary font-bold text-1sl tablet:text-2xl mb-1 tablet:mb-3">
//           Bài thi
//         </p>
//         <p className="mb-1 tablet:mb-3 text-2sl tablet:text-xl">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum maiores dolor,
//           blanditiis aperiam rem delectus odio et quae. Omnis asperiores dolor animi veniam
//           laborum doloribus. Aliquam a assumenda eligendi.
//         </p>
//         <span className="block text-green-primary font-bold text-2sl tablet:text-sl mb-1 tablet:mb-8">
//           Bởi User
//         </span>
//       </div>
//     );
//   });
// };

// const renderFinalResultsDemo = () => {
//   let array6 = Array.from(Array(3).keys());
//   return array6.map((i, index) => {
//     return (
//       <div
//         key={index}
//         className=" mx-auto w-[80%] mobileSM:w-full cursor-pointer rounded-xl tablet:rounded-2xl p-2 tablet:p-4 bg-gray-100"
//         style={{
//           boxShadow: `0px 4px 12px 0px rgba(0, 0, 0, 0.25)`,
//         }}
//       >
//         <div className="bg-green-primary mb-1 tablet:mb-3 overflow-hidden tablet:mb-8 w-full aspect-video bg-transparent rounded-xl tablet:rounded-2xl"></div>
//         <p className="color-primary font-bold text-1sl tablet:text-2xl mb-1 tablet:mb-3">
//           Bài thi
//         </p>
//         <p className="mb-1 tablet:mb-3 text-2sl tablet:text-xl">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum maiores dolor,
//           blanditiis aperiam rem delectus odio et quae. Omnis asperiores dolor animi veniam
//           laborum doloribus. Aliquam a assumenda eligendi.
//         </p>
//         <span className="block text-green-primary font-bold text-2sl tablet:text-sl mb-1 tablet:mb-8">
//           Bởi User
//         </span>
//       </div>
//     );
//   });
// };
