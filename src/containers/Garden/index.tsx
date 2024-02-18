import Image from 'next/image';
import { useRouter } from 'next/router';
import Leaf from 'public/icons/gardenLeaf.svg';
import menuBarIcon from 'public/icons/menu-bar.svg';
import garden from 'public/images/garden.png';
import Tree3 from 'public/images/gardenTree1.svg';
import Tree1 from 'public/images/gardenTree2.svg';
import Tree2 from 'public/images/gardenTree3.svg';
import TreeActive31 from 'public/icons/iconsTreeActiveFull.svg';
import TreeActive3 from 'public/images/treeActiveFull.png';
import myGardenImg from 'public/images/my-garden.png';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from 'src/app/hooks/useWindowSize';
import Seo from 'src/components/Seo';
import HeaderSideMenu from 'src/layout/Header/HeaderSideMenu';
import { useLazyGetArrayTreeQuery } from 'src/services/home';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import {
  conver1DArrayTo2DArray,
  decodeBase64,
  encodeBase64,
  filterArrayStringDuplicate,
  slugify,
} from 'src/utils/helpers/common';
import TreeModal from './TreeModal';
import { Tree } from './type';
import bgMyGardenTop from 'public/images/bg-my-garden-top.png';
import moutain from 'public/images/moutain.png';
import huyHieu1 from 'public/images/huy-hieu-1.png';
import huyHieu2 from 'public/images/huy-hieu-2.png';
import huyHieu3 from 'public/images/huy-hieu-3.png';
import huyHieu4 from 'public/images/huy-hieu-4.png';
import huyHieu5 from 'public/images/huy-hieu-5.png';
import huyHieu6 from 'public/images/huy-hieu-6.png';
import huyHieu7 from 'public/images/huy-hieu-7.png';
import huyHieu8 from 'public/images/huy-hieu-8.png';
import huyHieu9 from 'public/images/huy-hieu-9.png';
import huyHieu10 from 'public/images/huy-hieu-10.png';
import huyHieu11 from 'public/images/huy-hieu-11.png';
import huyHieu12 from 'public/images/huy-hieu-12.png';
import thuCamOn from 'public/images/thu-cam-on.png';
import thuCamOnMobile from 'public/images/thu-cam-on-mobile.png';
import itemThuCamOn from 'public/images/item-thu-cam-on.png';
import itemThuCamOn2 from 'public/images/item-thu-cam-on-2.png';
import bgTheoDoiCay from 'public/images/bg-theo-doi-cay.png';
import MapSecondary from '../TreeDetail/MapSecondary';
import decorLeaf1 from 'public/images/decor-leaf-1.png';
import decorLeaf2 from 'public/images/decor-leaf-2.png';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import treeDemoSlider from 'public/images/tree_silder.png';
import 'swiper/css/navigation';
import Modal from 'antd/lib/modal/Modal';
import { FacebookShareButton } from 'react-share';
import {
  useLazyGetCampaignIsRunningQuery,
  usePutReadyToPlayMutation,
  useUpdateTotalShareMutation,
} from 'src/services/treeAPI';
import { TREES } from 'src/constant/trees';
import moment from 'moment';
import { DATE_VALID } from 'src/constant/common';
import fbShareMedal from 'public/icons/fb-icon.svg';
// const Trees = [Tree1, Tree2, Tree3];

const medals = [
  { link: huyHieu4, name: 'mầm non yêu cây' },
  { link: huyHieu5, name: 'cao thủ ươm cây' },
  { link: huyHieu6, name: 'huyền thoại gieo mầm' },
  { link: huyHieu7, name: 'tim xanh yêu rừng' },
  { link: huyHieu8, name: 'chiến thần cây cối' },
  { link: huyHieu9, name: 'bảo mẫu cây xanh' },
  { link: huyHieu10, name: 'bậc thầy chăm cây' },
  { link: huyHieu11, name: 'vệ binh giữ rừng' },
  { link: huyHieu12, name: 'top fan của rừng' },
  { link: huyHieu1, name: 'rừng xanh chân ái' },
  { link: huyHieu2, name: 'bạn hữu rừng cây' },
  { link: huyHieu3, name: 'siêu sao chăm rừng' },
];

const Garden = () => {
  const dispatch = useDispatch();
  const width = useWindowSize()?.width;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [treeDetail, setTreeDetail] = useState<Tree>();
  const [randomArr, setRandomArr] = useState<number[]>([]);
  const [userName, setUserName] = useState('');
  const [activeTreeCode, setActiveTreeCode] = useState<string>('');
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [getClientTree, { data }] = useLazyGetTreeHistoryQuery();
  const [getArrayTree, { data: treeDataBE }] = useLazyGetArrayTreeQuery();
  const [onUpdateTotalShare] = useUpdateTotalShareMutation();
  const [getCampaignIsRunning] = useLazyGetCampaignIsRunningQuery();
  const [updateHistory] = usePutReadyToPlayMutation();
  // const [isOldCustom, SetIsOldCustom] = useState(false);

  // const [isShowMedal, setShowMedal] = useState<boolean>(false);
  const [dataMedal, setDataMedal] = useState<{
    isShowMedal: boolean;
    img: string;
    name: string;
  }>();
  useEffect(() => {
    setUserName(localStorage.getItem('user_name'));
    setActiveTreeCode(localStorage.getItem('tree_code'));
  }, []);

  useEffect(() => {
    const phoneNumber = decodeBase64(String(router?.query?.key) as string);
    getClientTree({ phoneNumber, publicCode: '' });
  }, [router, getClientTree]);

  if (typeof window !== 'undefined') {
    window.onfocus = function () {
      if (localStorage.getItem('pn') !== router.query.key) {
        router.push(`/my-garden?key=${localStorage.getItem('pn')}`);
        setUserName(localStorage?.getItem('username'));
      } else {
      }
    };
  }

  useEffect(() => {
    treeDataBE && setTreeData(treeDataBE);
  }, [treeDataBE, dispatch]);

  useEffect(() => {
    if (data?.length) {
      const array = data.map((d) => {
        return `StringCode=${d.treeCode}&`;
      });
      localStorage.setItem('my_tree_codes', JSON.stringify(array));
      getArrayTree(array.join(''));
    }
  }, [data, getArrayTree]);

  const handleClick = (tree: Tree) => {
    setOpen(true);
    setTreeDetail(tree);
  };

  useEffect(() => {
    if (treeData) {
      let array = treeData.map((tree, index) => index);
      for (let i = array?.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      setRandomArr(array);
    }
  }, [treeData]);

  const SilderPartnerMobile = useMemo(() => {
    let colNumber = 3;
    let rowNumber = Math.ceil((treeData as [])?.length / colNumber);
    let array2D = conver1DArrayTo2DArray(treeData as [], rowNumber, colNumber);

    return array2D?.map((trees, index) => {
      return (
        <SwiperSlide key={index}>
          <div className="relative">
            {trees.map((tree, index) => {
              let top = ``;
              let left = ``;
              let infoTree = TREES.find((item) => {
                return item.name === slugify(tree.treeName);
              });
              switch (index) {
                case 0: {
                  top = `top-[8%]`;
                  left = `left-[13%]`;
                  break;
                }
                case 1: {
                  top = `top-[14%]`;
                  left = `left-[37%]`;
                  break;
                }
                case 2: {
                  top = `top-[8%]`;
                  left = `left-[63%]`;
                  break;
                }
                default: {
                  break;
                }
              }
              return (
                <div
                  onClick={() => {
                    handleClick(tree);
                  }}
                  className={`absolute ${top} ${left} w-[25%] z-[1]`}
                  key={index}
                >
                  <div className="bg-green-primary rounded-xl  text-white-500 px-3 absolute top-[25%] z-10 w-max left-[50%] -translate-x-1/2">
                    {tree.treeName}
                  </div>
                  <Image
                    sizes="100%"
                    height={infoTree ? infoTree.height : treeDemoSlider.height}
                    width={infoTree ? infoTree.with : treeDemoSlider.width}
                    src={infoTree ? infoTree.url : treeDemoSlider.src}
                  />
                </div>
              );
            })}
            <Image src={moutain.src} height={moutain.height} width={moutain.width} sizes="100%" />
          </div>
        </SwiperSlide>
      );
    });
  }, [treeData]);

  const SilderPartnerMobileDemo = useMemo(() => {
    let colNumber = 3;
    let rowNumber = Math.ceil((TREES as [])?.length / colNumber);
    let array2D = conver1DArrayTo2DArray(TREES as [], rowNumber, colNumber);

    return array2D?.map((trees, index) => {
      return (
        <SwiperSlide key={index}>
          <div className="relative">
            {trees.map((tree, index) => {
              let top = ``;
              let left = ``;
              // let infoTree = TREES.find((item) => {
              //   return item.name === slugify(tree.treeName);
              // });
              switch (index) {
                case 0: {
                  top = `top-[8%]`;
                  left = `left-[13%]`;
                  break;
                }
                case 1: {
                  top = `top-[14%]`;
                  left = `left-[37%]`;
                  break;
                }
                case 2: {
                  top = `top-[8%]`;
                  left = `left-[63%]`;
                  break;
                }
                default: {
                  break;
                }
              }
              return (
                <div
                  onClick={() => {
                    handleClick(treeData[0]);
                  }}
                  className={`absolute ${top} ${left} w-[25%] z-[1]`}
                  key={index}
                >
                  <Image
                    sizes="100%"
                    height={tree ? tree.height : treeDemoSlider.height}
                    width={tree ? tree.with : treeDemoSlider.width}
                    src={tree ? tree.url : treeDemoSlider.src}
                  />
                </div>
              );
            })}
            <Image src={moutain.src} height={moutain.height} width={moutain.width} sizes="100%" />
          </div>
        </SwiperSlide>
      );
    });
  }, [treeData]);

  const renderMedals = useMemo(() => {
    if (treeData.length > 0) {
      return medals.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className="cursor-pointer py-2"
              onClick={() => {
                if (treeData.length > index) {
                  setDataMedal({
                    ...dataMedal,
                    isShowMedal: true,
                    img: item.link.src,
                    name: item.name,
                  });
                }
              }}
            >
              <Image
                style={{
                  filter: `${treeData.length > index ? '' : 'grayscale(100%)'}`,
                }}
                className="mb-2 mx-auto"
                src={item.link.src}
                height={item.link.height}
                width={item.link.width}
              />
              <p
                style={{
                  filter: `${treeData.length > index ? '' : 'grayscale(100%)'}`,
                }}
                className="uppercase font-bold text-green-primary mb-2"
              >
                {item.name}
              </p>
              {/* <a
                className="text-center py-[0.3rem] px-4  garden__btn-medal text-white-500 text-base "
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative leading-none">
                  <Image
                    className=""
                    width={fbShareMedal.width * 1.2}
                    height={fbShareMedal.height * 1.2}
                    src={fbShareMedal}
                  />
                </div>
                <span className="inline-block ml-2 leading-none">Share</span>
              </a> */}
              {treeData.length > index ? (
                <button
                  className="text-center py-[0.3rem] px-4 h-[27px]  garden__btn-medal text-white-500 text-base "
                  onClick={() => {
                    setDataMedal({
                      ...dataMedal,
                      isShowMedal: true,
                      img: item.link.src,
                      name: item.name,
                    });
                  }}
                >
                  <div className="relative leading-none">
                    <Image
                      className=""
                      width={fbShareMedal.width * 1.2}
                      height={fbShareMedal.height * 1.2}
                      src={fbShareMedal}
                    />
                  </div>
                  <span className="inline-block ml-2 leading-none">Share</span>
                </button>
              ) : (
                <>
                  <div className="mb-2">
                    <a
                      className="text-center mb-2 h-[27px] py-[0.3rem] px-4  home__form-btn text-white-500 text-base "
                      href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* {medals.length === index ? '' : `Trồng ${index + 1} cây`} */}
                      Trồng {index + 1} cây
                    </a>
                  </div>
                  <p className="text-sl italic ">Để thu thập huy hiệu yêu thích</p>
                </>
              )}
            </div>
          </SwiperSlide>
        );
      });
    }
  }, [treeData]);

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

  const treesLocationPlanted = useMemo(() => {
    if (treeData.length > 0) {
      let arrayLocation = treeData.map((item) => {
        return `${item.labelTreePlantingSite}`;
      });
      let content = '';
      Array.from(filterArrayStringDuplicate(arrayLocation)).forEach((item, index) => {
        if (Array.from(filterArrayStringDuplicate(arrayLocation)).length - 1 === index) {
          content += `${item}.`;
        } else {
          content += `${item}, `;
        }
      });
      return <>{content}</>;
    } else {
      return <></>;
    }
  }, [treeData]);

  const treesPlanted = useMemo(() => {
    if (!treeData) return;
    // let array4 = [...treeData].length > 4 ? [...treeData].splice(0, 4) : treeData;
    let array: { treeName: string; quality: number }[] = [];
    treeData.forEach((item) => {
      if (array.length > 0) {
        let index = array.findIndex((i) => {
          return item.treeName.includes(i.treeName);
        });
        if (index != -1) {
          array[index].quality += 1;
        } else {
          array.push({
            treeName: item.treeName,
            quality: 1,
          });
        }
      } else {
        array.push({
          treeName: item.treeName,
          quality: 1,
        });
      }
    });
    return array?.map((item, index) => {
      return (
        <li className="disc" key={index}>
          <p>
            {item.quality} cây <span className="capitalize">{item.treeName}</span>
          </p>
        </li>
      );
    });
  }, [treeData]);

  const renderPlanted = () => {
    return (
      <li>
        - {treeData.length} cây bao gồm:
        <ul className="pl-1">{treesPlanted}</ul>
      </li>
    );
  };

  const renderThuCamOn = useMemo(() => {
    let isOldUser = treeData.findIndex((item) => {
      let date = item.addedStamp.split(' ')[0].split('/');
      let day = date[0];
      let month = date[1];
      let year = date[2];
      let dateAddStamp = moment(`${year}/${month}/${day}`);
      let dateConst = moment(DATE_VALID);

      return dateConst > dateAddStamp;
    });
    let contentJSX: JSX.Element = <></>;
    if (isOldUser != -1) {
      contentJSX = (
        <>
          Nay mình đã cao và xanh hơn.{' '}
          <span className="inline laptop:block desktop:inline f-dancing-script">
            Cảm ơn bạn đã đưa mình tới rừng nhé
          </span>
        </>
      );
    } else {
      contentJSX = <>Cảm ơn bạn đã giúp rừng thêm xanh, mình có thêm bạn mới nhé!</>;
    }

    // let signature = treeData[Math.floor(Math.random() * treeData.length)]?.treeName
    //   ? treeData[Math.floor(Math.random() * treeData.length)]?.treeName
    //   : 'Lim Xanh';
    // console.log("signature: ", signature)
    return (
      <article className="relative">
        <div className="hidden tablet:block text-center aspect-auto laptop:aspect-[375/257] desktop:aspect-auto mx-auto w-full desktopSM:w-[60%]  desktop:w-full">
          <div className="w-auto  mx-auto ">
            <Image
              className="mx-auto"
              src={thuCamOn.src}
              width={thuCamOn.width}
              height={thuCamOn.height}
              alt="letter"
            />
          </div>
        </div>
        <div className="block relative tablet:hidden text-center">
          <Image
            className="mx-auto"
            src={thuCamOnMobile.src}
            width={thuCamOnMobile.width}
            height={thuCamOnMobile.height}
            alt="letter"
          />
        </div>
        <div
          style={{ fontFamily: `Dancing Script` }}
          className="absolute top-[12%] tablet:top-[15%] laptop:top-[20%] desktop:top-[15%] left-[50%] -translate-x-1/2 flex flex-wrap w-[70%] mobileSM:w-[60%] tablet:w-[75%] laptop:w-[72%] desktopSM:w-[50%] desktop:w-[72%] desktopXL:w-[55%]"
        >
          <div className="w-[100%] tablet:w-[40%]">
            <img
              className="mx-auto tablet:mx-0 laptop:mx-auto desktop:mx-0 w-[50%] tablet:w-[85%] laptop:w-[75%]"
              src={itemThuCamOn.src}
              alt="item-letter"
            />
          </div>
          <div className="relative w-[100%] tablet:w-[60%]  pt-8 mobileSM:pt-16 laptop:pt-[20px] desktop:pt-20 text-green-primary">
            <span className="block mb-2 mobileSM:mb-6 f-dancing-script font-bold my-garden__letter-text">
              {userName} ơi,
            </span>
            <p className="mb-2 mobileSM:mb-10 my-garden__letter-text f-dancing-script font-bold">
              {contentJSX}
            </p>
            <div className="flex items-center relative">
              <div className="w-[100%] relative">
                <div className="w-[70%] h-[1px] bg-black-600 mb-4 mobileSM:mb-6"></div>
                <div className="relative inline-block whitespace-nowrap my-garden__letter-text f-dancing-script font-bold">
                  Chương trình &quot;Sống khỏe, góp xanh&quot;
                  <div className="absolute top-[50%] laptop:top-0 desktop:top-[50%] w-[45%] desktopSM:w-[40%] desktop:w-auto -right-16 mobile:-right-[42%] mobileSM:-right-[80px] laptop:-right-[95px] desktop:-right-[180px]">
                    <Image
                      src={itemThuCamOn2}
                      width={itemThuCamOn2.width}
                      height={itemThuCamOn2.height}
                      alt="letter-thank"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }, [treeData]);

  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/my-garden`}
        title="Vườn của bạn"
        thumnail={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/${myGardenImg.src}`}
        description="Vườn của bạn"
      />
      <section className="my-garden relative">
        <div
          className="bg-cover bg-no-repeat bg-center relative"
          style={{
            backgroundImage: `url(${bgMyGardenTop.src})`,
          }}
        >
          <img
            className="hidden tablet:block w-[12%] desktop:w-[8%] desktopXL:w-[8%] absolute left-0 top-[35%] laptop:top-[50%] desktop:top-[35%] desktopXL:top-[40%] -translate-y-1/2"
            src={decorLeaf1.src}
            alt=""
          />

          <article className="my-garden__trees flex flex-wrap items-center mb-4">
            <div className="mb-2 block laptop:hidden w-[100%] laptop:w-[45%] desktop:w-[35%] desktopXL:w-[40%] px-4">
              <h1 className="color-primary font-bold uppercase  mb-3 mt-6 text-2xl tablet:text-4xl">
                cảm ơn {userName}, <span className="block">bạn đã trồng được</span>
              </h1>
              <div className="flex color-primary mb-4">
                <div className=" flex flex-col justify-center p-3 border-2 border-green-primary mr-3 text-center">
                  <span className="text-10xl tablet:text-12xl font-bold ">
                    {treeData.length > 9 ? treeData.length : `0${treeData.length}`}
                  </span>
                  <p className="uppercase font-bold text-base">cây cho rừng</p>
                </div>
                <div className="relative w-auto h-full">
                  <div className="px-3 py-2 border-2 border-green-primary ">
                    <ul className="my-garden__info h-full text-black-600">
                      <li className="">- Bạn có cây xanh tại {treesLocationPlanted}</li>
                      {renderPlanted()}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="whitespace-nowrap text-black-600">
                Hãy chạm vào cây để ghé rừng thăm bạn ấy nhé
              </p>
            </div>

            <div className="my-garden__trees-slider pb-4 tablet:pb-0 overflow-hidden mb-8 desktop:mb-0 w-[100%] laptop:w-[55%] desktop:w-[60%] px-4">
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={15}
                navigation={true}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
              >
                {SilderPartnerMobile}
              </Swiper>
            </div>
            <div className=" w-[100%] laptop:w-[45%] desktop:w-[40%]  px-4">
              <h1 className="text-left mx-auto laptop:block hidden color-primary font-bold uppercase  mb-3 mt-6 desktop:mt-12 my-garden__heading-1">
                cảm ơn {userName}, <span className="block">bạn đã trồng được</span>
              </h1>
              <div className="laptop:flex hidden color-primary mb-3  ">
                <div className=" flex flex-col justify-center p-3 border-2 border-green-primary mr-3 text-center">
                  <span className="block mb-1 text-12xl font-bold leading-none">
                    {treeData.length > 9 ? treeData.length : `0${treeData.length}`}
                  </span>
                  <p className="uppercase font-bold text-base">cây cho rừng</p>
                </div>
                <div className="relative w-auto h-full">
                  <div className=" px-3 py-2 border-2 border-green-primary ">
                    <ul className="my-garden__info h-full text-black-600">
                      <li className="">- Bạn có cây xanh tại {treesLocationPlanted}</li>
                      {renderPlanted()}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-center">Hãy chạm vào cây để ghé rừng thăm bạn ấy nhé</p>
              <b className=" mb-4 text-center block color-primary font-bold uppercase text-2xl tablet:text-2.5xl laptop:text-[28px] desktop:text-2.5xl">
                bộ sưu tập huy hiệu
              </b>
              <div className="my-garden__medals  text-center px-3 overflow-hidden">
                <Swiper
                  modules={[Pagination, Navigation]}
                  navigation={true}
                  slidesPerView={3}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                    },
                  }}
                >
                  {renderMedals}
                </Swiper>
              </div>
              {/* <div className="text-center">
                <a
                  href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html?gidzl=og9BE0H7WqZ9l4uv2b64IyUtJJaJ1eT9s-fBEXbUXX_Ginbe6rRM7jIr73WU0ePFtUzEEJdwrVn70KI1IG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center py-3 px-10 font-bold home__form-btn text-white-500 text-xl"
                >
                  thu thập thêm huy hiệu
                </a>
              </div>
              <p className="mt-3 text-center">Trồng thêm cây để sở hữu huy hiệu yêu thích</p> */}
            </div>
          </article>
          {renderThuCamOn}
        </div>
        <article
          id="addMoreTree"
          style={{
            backgroundImage: `url(${bgTheoDoiCay.src})`,
          }}
          className=" relative px-4 tablet:px-10 py-8 laptop:py-14 laptop:px-10 text-center bg-no-repeat bg-cover -mb-[60px] -translate-y-[60px] tablet:-mb-[0] tablet:-translate-y-[0] desktopSM:-translate-y-[100px]  desktopSM:-mb-[100px]  desktop:-translate-y-[250px]  desktop:-mb-[250px]"
        >
          <img
            className="hidden tablet:block w-[30%]  desktopXL:w-[25%] absolute -top-[5%] desktopXL:-top-[25%] right-0 -z-[1]"
            src={decorLeaf2.src}
            alt=""
          />
          <h1 className="w-[100%]  mx-auto text-white-500 font-bold uppercase text-center mb-8 heading-1">
            Bạn ơi, rừng vẫn cần được <span className="block tablet:inline"> trồng thêm cây.</span>
            <span className="block whitespace-nowrap">
              Cùng Panasonic <span className="block tablet:inline "> Sống Khỏe, Góp Xanh,</span>{' '}
              <span className="block tablet:inline"> Giữ Chuyện Rừng Còn Mãi nhé!</span>
            </span>
          </h1>
          <a
            href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html?gidzl=og9BE0H7WqZ9l4uv2b64IyUtJJaJ1eT9s-fBEXbUXX_Ginbe6rRM7jIr73WU0ePFtUzEEJdwrVn70KI1IG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block uppercase text-center py-3 px-10 font-bold text-green-primary bg-white-500 home__crop-btn text-white-500 text-xl "
          >
            trồng thêm cây
          </a>
        </article>
        <div
          className="-mb-[15%] pt-[5%] mobileSM:pt-0 laptop:pt-[5%] pb-[8%] mobileSM:pb-[15%] desktopXL:pb-[12%] desktopXL:pt-[0%]"
          style={{
            overflow: 'hidden',
            backgroundColor: '#EFF5EC',
            width: '100%',
            height: '100%',
          }}
        >
          <MapSecondary />
        </div>
        <TreeModal open={open} close={() => setOpen(false)} treeDetail={treeDetail} />
        <Modal
          className="my-garden__medal-modal relative"
          open={dataMedal?.isShowMedal}
          footer={null}
          onCancel={() => {
            setDataMedal({ ...dataMedal, isShowMedal: false });
          }}
        >
          <img
            className="blur-md -z-1  absolute top-[50%] -translate-y-1/2 right-[0]"
            src={decorLeaf2.src}
            alt=""
          />
          <div className="relative z-1">
            <h3 className="uppercase text-2xl font-bold text-center text-white-500">
              chúc mừng bạn
            </h3>
            <p className="text-center mb-2 text-xl">
              <span className="block leading-5">Đã đạt được huy hiệu</span>
              <span className="block leading-5 uppercase">{dataMedal?.name}</span>{' '}
              <span className="block leading-5">Với {treeData.length} số cây xanh đã trồng</span>
            </p>

            <div className="text-center mb-2">
              <img className="mx-auto" src={dataMedal?.img} alt="" />
            </div>
            <p className="text-center font-semiBold mb-3 text-xl">
              Bạn có muốn share huy hiệu hay thu thập thêm không?
            </p>
            <div className="uppercase text-center">
              <FacebookShareButton
                url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/medal?name=${dataMedal?.name}&link=${dataMedal?.img}`}
                quote={''}
                hashtag={'#SongkhoeGopxanh'}
                onShareWindowClose={() => onShareFacebook()}
              >
                <button
                  type="button"
                  className="uppercase text-center mr-3 py-2 px-10 font-bold text-green-primary bg-white-500 home__crop-btn text-white-500 text-xl "
                >
                  share
                </button>
              </FacebookShareButton>
              <a
                className="uppercase text-center py-2 px-4 font-bold border-2 border-white-500  home__crop-btn text-white-500 text-xl "
                href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html?gidzl=og9BE0H7WqZ9l4uv2b64IyUtJJaJ1eT9s-fBEXbUXX_Ginbe6rRM7jIr73WU0ePFtUzEEJdwrVn70KI1IG"
                target="_blank"
                rel="noopener noreferrer"
              >
                thu thập thêm
              </a>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default memo(Garden);
