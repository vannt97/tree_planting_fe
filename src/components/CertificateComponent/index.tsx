/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import bgCertificate from 'public/images/bg-certificate.svg';
import certificate1 from 'public/images/certificate-1.svg';
import japanQuality from 'public/images/japan-quality.svg';
import logoPana from 'public/images/logo.png';
import signImage from 'public/images/sign.png';
import signBo from 'public/images/sign/bo.png';
import solutionImg from 'public/images/solution.svg';
import { useEffect, useRef, useState } from 'react';
import { getProvinceCode, getSign, SignData } from 'src/constant/sign';
import { decodeBase64 } from 'src/utils/helpers/common';
import CertificateComponentDownload from './CertificateComponentDownload';
import ribbon from 'public/images/ribbon-certificate.png';

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
    provinceCode: string;
  };
  name?: string;
}

function CertificateComponent(props: CertificateComp) {
  const { btnRef, refCerti, name, modal, responsive, info } = props;
  const domEl = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [signData, setSignData] = useState<SignData>({ name: '', provinceCode: '', sign: '' });

  useEffect(() => {
    info?.provinceName && setSignData(getSign(getProvinceCode(info?.provinceName)));
  }, [info]);

  
  return (
    <>
      <div
        ref={domEl}
        className={`bg-white-500  h-full certificateComponent text-size-adjust ${
          modal ? 'certificateComponent__modal' : ''
        } ${responsive ? 'responsive' : ''}`}
      >
        <div className="certificateComponent__content h-full w-full text-size-adjust relative ">
          <div className="certificateComponent__border-secondery absolute top-0 left-0 w-full h-full bg-transparent  border-green-50"></div>
          <div className="certificateComponent__border-primary absolute top-0 left-0 w-full h-full bg-transparent  border-green-primary"></div>

          <div className="h-auto w-full flex flex-col text-size-adjust relative">
            <div className=" w-full flex justify-center text-size-adjust  ">
              <div className="certificateComponent__header w-full flex justify-center items-center text-size-adjust  relative ">
                <span className="absolute left-0  text-size-adjust flex justify-start items-center certificateComponent__certificate-img-1">
                  <Image src={certificate1} alt="" />
                </span>
                <h2 className="certificateComp__show text-size-adjust uppercase f-oswald text-center">
                  Chương Trình
                </h2>
                <span className="absolute right-0  certificateComponent__logo-pana flex justify-center items-center text-size-adjust">
                  <Image objectFit="contain" src={logoPana} alt="" />
                </span>
              </div>
            </div>
            <div className="flex text-size-adjust flex-1 w-full relative justify-center">
              <div className="flex text-size-adjust justify-center ">
                <div>
                  <h1 className="italic certificateComponent__title text-green-primary whitespace-nowrap font-bold text-size-adjust uppercase f-oswald  text-center">
                    Sống khỏe Góp Xanh
                  </h1>
                  <p className="certificateComponent__title-1 uppercase f-oswald font-bold text-green-primary  text-center ">
                    giữ chuyện rừng còn mãi
                  </p>
                  <div className="flex justify-center text-size-adjust relative">
                    <p className="certificateComponent__bravo bg-green-primary uppercase f-oswald text-white-500 px-8   text-center relative">
                      Vinh Danh Khách Hàng
                    </p>
                  </div>
                  <h1 className="color-primary f-oswald font-bold color-text-4b text-center certificateComponent__name text-size-adjust  tracking-wide">
                    {router?.query?.name
                      ? decodeBase64(`${router?.query?.name}`)
                      : name
                      ? name
                      : ''}
                  </h1>
                  <div className="certificateComponent__dash  h-[2px] w-full border border-dashed"></div>
                  <p className="text-center certificateComponent__des text-size-adjust uppercase f-oswald font-medium certificateComp__text">
                    <span className="whitespace-nowrap text-size-adjust">
                      Đã góp một cây xanh cho{' '}
                      {info?.location ? info.location : ''}
                    </span>
                    <br /> <span className="uppercase">Vì Một Việt Nam Xanh Khỏe Mạnh</span>
                  </p>

                  <p className=" text-center certificateComponent__date text-size-adjust font-medium color-text-414">
                    Ngày {moment(info?.date, 'DD/MM/YYYY').format('DD')} tháng{' '}
                    {moment(info?.date, 'DD/MM/YYYY').format('MM')} năm{' '}
                    {moment(info?.date, 'DD/MM/YYYY').format('YYYY')}
                  </p>
                  <div className="flex relative certificateComponent__sign-wrapper text-size-adjust justify-between items-start gap-5">
                    <div className="h-full">
                      <div className="flex certificateComponent__sign flex-col text-size-adjust items-center justify-between">
                        <h1 className="whitespace-nowrap text-center certificateComponent__sign-title text-size-adjust color-text-414 font-medium ">
                          Đại diện Trung tâm
                          <br /> Truyền thông TN&MT
                        </h1>
                        <span className=" certificateComponent__sign-height-img flex items-center">
                          <img
                            className="certificateComponent__sign-img"
                            width={120}
                            height={100}
                            src={signBo.src}
                            alt=""
                          />
                        </span>
                        <p className="certificateComponent__sign-name text-green-primary whitespace-nowrap uppercase font-semibold text-size-adjust  f-oswald">
                          Nguyễn Việt Dũng
                        </p>
                      </div>
                    </div>
                    {signData?.sign && (
                      <div className="h-full">
                        <div className=" flex certificateComponent__sign flex-col text-size-adjust items-center justify-between">
                          <h1 className="whitespace-nowrap text-center certificateComponent__sign-title text-size-adjust color-text-414 font-medium ">
                            Đại diện Ban quản lý
                            <br /> rừng địa phương
                          </h1>
                          <span className="certificateComponent__sign-height-img certificateComponent__sign-img-wrapper flex items-center">
                            <img
                              className="certificateComponent__sign-img"
                              width={120}
                              height={100}
                              src={signData.sign}
                              alt=""
                            />
                          </span>
                          <p className="certificateComponent__sign-name text-green-primary whitespace-nowrap uppercase font-semibold text-size-adjust  f-oswald">
                            {signData.name}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="h-full">
                      <div className="flex flex-col certificateComponent__sign text-size-adjust items-center justify-between">
                        <h1 className="whitespace-nowrap text-center certificateComponent__sign-title text-size-adjust color-text-414 font-medium ">
                          Tổng giám đốc
                          <br /> Panasonic Việt Nam
                        </h1>
                        <span className="certificateComponent__sign-height-img certificateComponent__sign-img-wrapper flex items-center">
                          <img
                            className="certificateComponent__sign-img"
                            width={120}
                            height={100}
                            src={signImage.src}
                            alt=""
                          />
                        </span>
                        <p className="certificateComponent__sign-name text-green-primary whitespace-nowrap font-semibold text-size-adjust  f-oswald">
                          MARUKAWA YOICHI
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center flex justify-center">
                    <span className="text-size-adjust certificateComponent__jp-quality leading-none">
                      <Image src={japanQuality} alt="" width={japanQuality.width} height={japanQuality.height}/>
                    </span>
                    <span className="ml-3 text-size-adjust certificateComponent__solution leading-none">
                      <Image src={solutionImg} alt="" width={solutionImg.width} height={solutionImg.height}/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="w-full absolute bottom-0 left-0 z-10" src={ribbon.src} alt="" />
      </div>
      <CertificateComponentDownload
        btnRef={btnRef}
        refCerti={refCerti}
        name={name}
        info={info}
        signData={signData}
      />
    </>
  );
}

export default CertificateComponent;
