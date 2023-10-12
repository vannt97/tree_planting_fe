/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import menuBarIcon from 'public/icons/menu-bar.svg';
import bgWheel from 'public/images/bg-wheel.png';
import bigCircle from 'public/images/big-circle.png';
import circle from 'public/images/circle.png';
import footWheel from 'public/images/foot-wheel.png';
import giftCircle from 'public/images/gift-circle.png';
import logoPana from 'public/images/logo-01.png';
import logoPana1 from 'public/images/logo3-01.png';
import logoPana2 from 'public/images/logo4-01.png';
import logoPark from 'public/images/logoBo.png';
import polygonIcon from 'public/images/polygonIcon.png';
import IconX from 'public/images/red-x-line-icon.png';
import logoText from 'public/images/text-01.png';
import wheelClick from 'public/images/wheel-click.png';
import { useEffect, useMemo, useRef, useState } from 'react';
import useWindowSize from 'src/app/hooks/useWindowSize';
import HeaderSideMenu from 'src/layout/Header/HeaderSideMenu';

import {
  useLazyGetCampaignIsRunningQuery,
  usePushRotationLuckMutation,
  usePutReadyToPlayMutation,
} from 'src/services/treeAPI';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import { decodeBase64 } from 'src/utils/helpers/common';
import { HandleNotify, ShowNotify } from 'src/utils/helpers/ShowNotify';
import ModalReward from './ModalReward';

function WheelLucky() {
  const width = useWindowSize().width;
  const router = useRouter();
  const [rotate, setRotate] = useState<number>(0);
  const [skewY, setSkewY] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [result, setResult] = useState<any>({ isWin: false, reward: {} });
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [openNoTurnModal, setOpenNoTurnModal] = useState<boolean>(false);
  const [openIsHaveCampaign, setOpenIsHaveCampaign] = useState<{
    isCampaign: boolean;
    isOpen: boolean;
  }>({ isCampaign: true, isOpen: false });
  const currentRotate = useRef<number>(0);
  const wheel = useRef<HTMLUListElement>(null);
  const [getData, { data, isSuccess: isGetDataSuccess }] = useLazyGetCampaignIsRunningQuery();
  const [pushRotationLuck] = usePushRotationLuckMutation();
  const [getTreeHistory] = useLazyGetTreeHistoryQuery();

  useEffect(() => {
    setResult({ isWin: false, reward: {} });
    setOpen(false);
  }, []);

  useEffect(() => {
    if (router?.query?.id) {
      (async () => {
        try {
          const response: any = await getTreeHistory({
            phoneNumber: decodeBase64(localStorage.getItem('pn')),
            publicCode: router?.query?.id as string,
          }).unwrap();
          if (!response?.length) {
            router.push('/');
          }
        } catch (error) {
          router.push('/');
        }
      })();
    }
  }, [router]);

  useEffect(() => {
    router?.query?.id &&
      (async () => {
        try {
          const response = await getData({ publicCode: router?.query?.id as string }).unwrap();
          if (response?.data?.campaignDuration.length === 0) {
            setOpenIsHaveCampaign({ isCampaign: false, isOpen: false });
          } else {
            return;
          }
        } catch (error) {
          if (error?.data?.ErrorMessage === 'NOT_HAVE_CAMPAIGN') {
            setOpenIsHaveCampaign({ isCampaign: false, isOpen: false });
          }
        }
      })();
  }, [router]);

  useEffect(() => {
    if (isGetDataSuccess) {
      setIsRotating(data?.readyToPlay);
    } else {
    }
  }, [data, isGetDataSuccess]);

  const giftMemo = useMemo(() => {
    if (data && data?.data?.campaignDuration[0]?.giftOfCampaign) {
      const arr = data?.data?.campaignDuration[0]?.giftOfCampaign;
      if (arr.length > 0) {
        const getItemFail = arr.find((a) => a.giftType === 6);
        let arr1 = arr?.filter((a) => a.giftType !== 6);
        if (arr1?.length) {
          [...Array(arr1?.length * 2)].forEach((gift, index) => {
            if (index % 2 !== 0) {
              return arr1.splice(index, 0, {
                name: 'Trượt',
                id: getItemFail.id,
              });
            } else {
              return { ...gift };
            }
          });
        }
        return arr1;
      } else {
        return [];
      }
    }
  }, [data]);

  useEffect(() => {
    if (giftMemo?.length) {
      setRotate(360 / giftMemo?.length);
      setSkewY(90 - 360 / giftMemo?.length);
    }
  }, [giftMemo]);

  const rotateWheel = async (currentRotate: number) => {
    try {
      const response: any = await pushRotationLuck({ publicCode: router.query.id });
      let arr = [];
      giftMemo?.forEach((gift, index) => {
        if (gift.name === 'Trượt') {
          arr.push(index);
        }
      });

      const random = Math.floor(Math.random() * arr.length);
      if (response?.data?.giftType && giftMemo?.length > 0) {
        if (response?.data?.giftType === 6) {
          wheel.current.style.transform = `rotate(${
            currentRotate - arr[random] * rotate - rotate / 2 - 18
          }deg)`;
          setResult({ isWin: false, reward: {} });
          setTimeout(() => {
            setOpen(true);
          }, 8000);
        } else {
          const findGiftIndex = giftMemo.findIndex((gift) => gift.id === response?.data?.id);
          wheel.current.style.transform = `rotate(${
            currentRotate - findGiftIndex * rotate - rotate / 2 - 18
          }deg)`;
          setResult({ isWin: true, reward: giftMemo[findGiftIndex] });
          setTimeout(() => {
            setOpen(true);
          }, 8000);
        }
      }
    } catch (error) {}
  };

  const handleStart = () => {
    currentRotate.current += 360 * 10;
    rotateWheel(currentRotate.current);
  };

  const handleSpin = () => {
    if (openIsHaveCampaign.isCampaign) {
      if (isRotating) {
        handleStart();
        setIsRotating(false);
      } else {
        setOpenNoTurnModal(true);
      }
    } else {
      setOpenIsHaveCampaign({ isCampaign: false, isOpen: true });
    }
  };

  const onRedirect = () => {
    setOpenNoTurnModal(false);
    router.push(`/my-garden?key=${localStorage.getItem('pn')}`);
  };

  return (
    <>
      {/* {isGetDataSuccess && ( */}
      <section
        style={{ backgroundImage: `url(${bgWheel.src})` }}
        className="wheelLucky h-screen w-screen"
      >
        <div className="h-full flex py-2 flex-col justify-around items-center">
          <div className="flex w-full justify-between wheelLucky__container">
            <div onClick={() => router.push('/')} className="cursor-pointer">
              <img className="wheelLucky__logo-pana" src={logoPana.src} alt="" />
            </div>
            <img className="wheelLucky__logo-park" src={logoPark.src} alt="" />
          </div>

          <div className="flex w-full justify-between wheelLucky__container">
            <span
              onClick={() => setOpenNav(true)}
              className="header__icon cursor-pointer z-50 top-[1rem]"
            >
              <Image src={menuBarIcon} alt="" layout="fixed" width={25} height={25} />
            </span>
          </div>

          <div className="flex flex-col items-center justify-around h-[75%]">
            <div className="uppercase left-0 right-0 text-center">
              <span className="text-center text-green-primary font-bold text-[24px] laptop:text-[28px] mobile:mt-4">
                VÒNG QUAY xanh
              </span>
              <span className="text-center text-green-primary font-bold text-[24px] laptop:text-[28px] mobile:mt-4 whitespace-nowrap">
                {' '}
                khỏe mạnh
              </span>
            </div>

            <div className="h-min">
              <div className="wheelLucky__circle">
                <Image
                  src={bigCircle}
                  width={width <= 650 ? 350 : 480}
                  height={width <= 650 ? 350 : 480}
                  className="absolute"
                  alt="big-circle"
                />
                <div className="absolute">
                  <span className="wheelLucky__circle-dot-1"></span>
                  <span className="wheelLucky__circle-dot-2"></span>
                  <button
                    className="wheelLucky__polygon"
                    style={{
                      transform: `${
                        width <= 650 ? 'translate(-10px, 17px)' : 'translate(-12px, 16px)'
                      }`,
                    }}
                  >
                    <Image
                      src={polygonIcon}
                      width={width <= 650 ? 20 : 24}
                      height={width <= 650 ? 30 : 36}
                      alt=""
                    />
                  </button>
                  <button className="wheelLucky__btn px-2 py-2 font-semibold">
                    <Image src={circle} alt="circle image" />
                  </button>

                  {rotate && giftMemo && skewY && (
                    <ul ref={wheel} className="wheelLucky__list">
                      {giftMemo.map((item, index) => (
                        <li
                          key={index}
                          className={`wheelLucky__list-item ${
                            (index + 1) % 2 !== 0 ? 'even' : 'odd'
                          }`}
                          style={{
                            transform: `${
                              giftMemo?.length === 6
                                ? index % 2 === 0
                                  ? `rotate(${rotate * index + 13}deg) skewY(-${skewY + 13}deg)`
                                  : `rotate(${rotate * index + 13}deg) skewY(-${skewY + 13}deg)`
                                : index % 2 === 0
                                ? `rotate(${rotate * index + 24}deg) skewY(-${skewY + 13}deg)`
                                : `rotate(${rotate * index + 24}deg) skewY(-${skewY + 13}deg)`
                            }`,
                          }}
                        >
                          <p
                            style={{
                              transform: `${
                                width <= 650
                                  ? `skewY(${skewY + 13.3}deg) translate(-19px, 3px)`
                                  : `skewY(${skewY + 13.2}deg) translate(-16px, 3px)`
                              }`,
                            }}
                            className={`wheelLucky__list-item-text ${
                              (index + 1) % 2 !== 0 ? 'even' : ''
                            }`}
                          >
                            {item?.imageLink ? (
                              <>
                                <div className="absolute top-2">
                                  <Image src={giftCircle} width={100} height={105} alt="" />
                                </div>
                                <img
                                  src={item.imageLink}
                                  alt="Gift Image"
                                  className="absolute top-[16px]"
                                  style={{
                                    transform: `${
                                      width <= 650
                                        ? item.giftName === 'Xịt diệt khuẩn'
                                          ? 'rotate(192deg) translate(-1px, 1px)'
                                          : item.giftName === 'Điều hòa'
                                          ? 'rotate(192deg) translate(4px, 14px)'
                                          : 'rotate(192deg) translate(0px, 7px)'
                                        : item.giftName === 'Xịt diệt khuẩn'
                                        ? 'rotate(192deg) translate(5px, 1px)'
                                        : item.giftName === 'Điều hòa'
                                        ? 'rotate(192deg) translate(14px, 14px)'
                                        : 'rotate(192deg) translate(11px, 7px)'
                                    }`,
                                    width: `${
                                      width <= 650
                                        ? item.giftName === 'Xịt diệt khuẩn' ||
                                          item.giftName === 'Điều hòa'
                                          ? '100px'
                                          : '90px'
                                        : item.giftName === 'Xịt diệt khuẩn' ||
                                          item.giftName === 'Điều hòa'
                                        ? '120px'
                                        : 'unset'
                                    }`,
                                    height: `${
                                      width <= 650
                                        ? item.giftName === 'Xịt diệt khuẩn'
                                          ? '70px'
                                          : item.giftName === 'Điều hòa'
                                          ? '100px'
                                          : '80px'
                                        : item.giftName === 'Xịt diệt khuẩn'
                                        ? '90px'
                                        : item.giftName === 'Điều hòa'
                                        ? '120px'
                                        : '120px'
                                    }`,
                                  }}
                                />
                              </>
                            ) : (
                              <p className="m-0 whitespace-nowrap uppercase">
                                Chúc may mắn lần sau
                              </p>
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex justify-center items-center absolute bottom-[-10%] right-0 left-0">
                    <Image src={footWheel} width={200} height={100} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[40px]">
              <Button className="button-start-wheel " onClick={handleSpin}>
                <div className="flex justify-start w-full">
                  <p className="laptop:text-[20px] text-[14px]">Bắt Đầu</p>
                  <Image src={wheelClick} width={40} height={20} alt="click" />
                </div>
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center wheelLucky__container mt-2 w-full">
            <div className="flex items-center">
              <Image
                src={logoPana1}
                width={width < 650 ? 60 : 100}
                height={width < 650 ? 60 : 100}
                alt="logo Pana"
              />
              <Image
                src={logoPana2}
                width={width < 650 ? 60 : 100}
                height={width < 650 ? 60 : 100}
              />
            </div>
            <div>
              <Image
                src={logoText}
                width={width < 650 ? 180 : 250}
                height={width < 650 ? 40 : 60}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {/* )} */}
      <ModalReward open={open} onCancel={() => setOpen(false)} result={result} width={width} />
      <Modal
        open={openIsHaveCampaign.isOpen}
        centered
        className="model-no-turn"
        onCancel={() => onRedirect()}
        footer={[
          <Button
            key="1"
            className="bg-blue-400 text-white-500 button-understand"
            onClick={() => onRedirect()}
          >
            Đã hiểu
          </Button>,
        ]}
        closable={false}
      >
        <div className="w-[120px] mx-auto pt-8">
          <Image src={IconX} width="50px" height="50px" layout="responsive" alt="Error" />
        </div>
        <div className="text-center mt-4 flex flex-col font-[600] text-gray-700">
          <span className=" text-[24px] m-0">Vòng quay chưa sẳn sàng</span>
          <span className=" text-[24px]">Vui lòng thử lại sau</span>
        </div>
      </Modal>
      <Modal
        open={openNoTurnModal}
        centered
        className="model-no-turn"
        onCancel={() => setOpenNoTurnModal(false)}
        footer={[
          <Button
            key="1"
            className="bg-blue-400 text-white-500 button-understand"
            onClick={() => onRedirect()}
          >
            Đã hiểu
          </Button>,
        ]}
      >
        <div className="w-[120px] mx-auto pt-8">
          <Image src={IconX} width="50px" height="50px" layout="responsive" alt="Error" />
        </div>
        <div className="text-center mt-4 flex flex-col font-[600] text-gray-700">
          <span className=" text-[24px] m-0">Bạn đã hết lượt quay </span>
          <span className=" text-[24px]">ngày hôm nay!</span>
        </div>
        <p className="text-center mt-4">
          Với mỗi sản phẩm mua thuộc Bộ giải pháp sức khỏe toàn diện của Panasonic, quý khách sẽ có
          1 lần quay mỗi ngày
        </p>
      </Modal>
      <HeaderSideMenu onClose={() => setOpenNav(false)} show={openNav} />
    </>
  );
}

export default WheelLucky;
