/* eslint-disable @next/next/no-img-element */
import bgCertificate from 'public/images/bg-certificate.svg';
import certificate1 from 'public/images/certificate-1.svg';
import logoPana from 'public/images/logo.png';
import logoPark from 'public/images/logo-park.svg';
import japanQuality from 'public/images/japan-quality.svg';
import solutionImg from 'public/images/solution.svg';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import CertificateComponentDownload from './CertificateComponentDownload';
import { decodeBase64 } from 'src/utils/helpers/common';
import moment from 'moment';
import signImage from 'public/images/sign.png';

import signBo from 'public/images/sign/bo.png';
import { getProvinceCode, getSign, SignData } from 'src/constant/sign';

interface CertificateComp {
  marginMobile?: boolean;
  btnRef?: any;
  refCerti?: any;
  zoom?: number;
  modal?: boolean;
  responsive?: boolean;
  info?: {
    location: string;
    date: moment.Moment | string;
    provinceName: string;
  };
  name?: string;
}

function CertificateComponent(props: CertificateComp) {
  const { btnRef, refCerti, name, modal, responsive, info } = props;
  const domEl = useRef<HTMLDivElement>(null);
  const [signData, setSignData] = useState<SignData>({ name: '', provinceCode: '', sign: '' });
  const router = useRouter();

  useEffect(() => {
    info?.provinceName && setSignData(getSign(getProvinceCode(info?.provinceName)));
  }, [info]);

  return (
    <>
      <div
        ref={domEl}
        className={`certificateComponent certificateComponent__share text-size-adjust ${
          modal ? 'certificateComponent__modal' : ''
        } ${responsive ? 'responsive' : ''}`}
      >
        <div
          className="certificateComponent__bg text-size-adjust"
          style={{ backgroundImage: `url(${bgCertificate.src})` }}
        ></div>
        <div className="certificateComponent__content p-1 text-size-adjust">
          <div className="h-full w-full flex flex-col text-size-adjust">
            <div className="flex justify-center text-size-adjust mb-1">
              <div className="flex  justify-center items-center text-size-adjust mt-1">
                <span className="text-size-adjust flex justify-center items-center certificateComponent__logo-1">
                  <Image src={certificate1} alt="" />
                </span>
                <span className="mx-4 certificateComponent__pana flex justify-center items-center text-size-adjust">
                  <Image src={logoPana} alt="" />
                </span>
              </div>
            </div>
            <div className="flex text-size-adjust flex-1 w-full relative justify-between">
              <div>
                <div className="flex text-size-adjust certificateComponent__logo opacity-0 justify-end items-center ">
                  <span className="text-size-adjust">
                    <Image src={japanQuality} alt="" />
                  </span>
                  <span className="ml-3 text-size-adjust">
                    <Image src={solutionImg} alt="" />
                  </span>
                </div>
              </div>
              <div
                className="flex text-size-adjust certificateComponent__content justify-center mb-[24px]"
                style={{ margin: '0rem 1rem 0.5rem 1rem' }}
              >
                <div>
                  <h2 className="certificateComp__show text-size-adjust uppercase f-oswald laptop:text-[1.3rem] tablet:text-[1rem] mobile:text-[0.7rem] text-center">
                    Chương Trình
                  </h2>
                  <h1 className="certificateComponent__title color-text-4b whitespace-nowrap font-bold text-size-adjust uppercase f-oswald laptop:text-[1.3rem] tablet:text-[1.2rem] mobile:text-[0.7rem] text-[0.7rem] text-center">
                    Sống khỏe Góp Xanh Cùng Panasonic
                  </h1>
                  <div className="flex justify-center text-size-adjust">
                    <p className="certificateComp__text-title text-size-adjust uppercase f-oswald color-text-414 laptop:my-2 my-1 laptop:text-[1rem] tablet:text-[0.8rem] mobile:text-[0.7rem] text-[0.6rem] text-center">
                      Vinh Danh Khách Hàng
                    </p>
                  </div>
                  <h1 className="color-primary my-1 f-oswald font-bold color-text-4b text-center certificateComponent__name text-size-adjust text-[0.6rem] tracking-wide">
                    {router?.query?.name
                      ? decodeBase64(`${router?.query?.name}`)
                      : name
                      ? name
                      : ''}
                  </h1>
                  <p className="text-center certificateComponent__des text-size-adjust uppercase f-oswald font-medium mb-2 text-[0.45rem] tablet:text-[0.8rem] laptop:text-[0.9rem] certificateComp__text">
                    <span className="whitespace-nowrap text-size-adjust">
                      Đã góp một cây xanh cho{' '}
                      {info?.location ? info.location : 'Khu bảo tồn Phong Điền'}
                    </span>
                    <br /> <span className="uppercase">Vì Một Việt Nam Xanh Khỏe Mạnh</span>
                  </p>

                  <p className="text-end certificateComponent__date text-size-adjust font-medium laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.45rem] mb-1">
                    Ngày {moment(info?.date, 'DD/MM/YYYY').format('DD')} tháng{' '}
                    {moment(info?.date, 'DD/MM/YYYY').format('MM')} năm{' '}
                    {moment(info?.date, 'DD/MM/YYYY').format('YYYY')}
                  </p>
                  <div className="flex relative certificateComponent__sign-wrapper text-size-adjust justify-between items-start gap-5">
                    <div className="h-full">
                      <div className="flex certificateComponent__sign flex-col text-size-adjust items-center justify-between">
                        <h1 className="whitespace-nowrap text-center certificateComponent__sign-title text-size-adjust color-text-414 font-medium laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.45rem]">
                          Đại diện Trung tâm
                          <br /> Truyền thông TN&MT
                        </h1>
                        <span className="h-[60px] flex items-center">
                          <img
                            className="certificateComponent__sign-img"
                            width={100}
                            height={60}
                            src={signBo.src}
                            alt=""
                          />
                        </span>
                        <p className="certificateComponent__sign-name whitespace-nowrap uppercase font-semibold text-size-adjust laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.5rem] f-oswald">
                          Nguyễn Việt Dũng
                        </p>
                      </div>
                    </div>
                    {signData?.sign && (
                      <div className="h-full">
                        <div className="flex certificateComponent__sign flex-col text-size-adjust items-center justify-between">
                          <h1 className="whitespace-nowrap text-center certificateComponent__sign-title text-size-adjust color-text-414 font-medium laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.45rem]">
                            Đại diện Ban quản lý
                            <br /> rừng địa phương
                          </h1>
                          <span className="certificateComponent__sign-img-wrapper flex items-center">
                            <img
                              className="certificateComponent__sign-img"
                              width={100}
                              height={60}
                              src={signData.sign}
                              alt=""
                            />
                          </span>
                          <p className="certificateComponent__sign-name whitespace-nowrap uppercase font-semibold text-size-adjust laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.5rem] f-oswald">
                            {signData.name}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="h-full">
                      <div className="flex flex-col certificateComponent__sign text-size-adjust items-center justify-between">
                        <h1 className="whitespace-nowrap text-center certificateComponent__sign-title text-size-adjust color-text-414 font-medium laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.45rem]">
                          Tổng giám đốc
                          <br /> Panasonic Việt Nam
                        </h1>
                        <span className="certificateComponent__sign-img-wrapper flex items-center">
                          <img
                            className="certificateComponent__sign-img"
                            width={100}
                            height={60}
                            src={signImage.src}
                            alt=""
                          />
                        </span>
                        <p className="certificateComponent__sign-name whitespace-nowrap font-semibold text-size-adjust laptop:text-[0.7rem] tablet:text-[0.6rem] text-[0.5rem] f-oswald">
                          MARUKAWA YOICHI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end text-size-adjust">
                <div className="flex certificateComponent__logo text-size-adjust opacity-0 justify-end items-center">
                  <span className="text-size-adjust">
                    <Image src={japanQuality} alt="" />
                  </span>
                  <span className="ml-3 text-size-adjust">
                    <Image src={solutionImg} alt="" />
                  </span>
                </div>
              </div>

              <div className="flex certificateComponent__logo text-size-adjust absolute bottom-0 right-0 justify-end items-center z-50">
                <span className="flex certificateComponent__logo-japan  justify-end text-size-adjust items-end">
                  <Image src={japanQuality} alt="" />
                </span>
                <span className="flex certificateComponent__logo-solution justify-end text-size-adjust items-end ml-2">
                  <Image src={solutionImg} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificateComponent;
