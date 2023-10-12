/* eslint-disable @next/next/no-img-element */
import * as htmlToImage from 'html-to-image';
import moment from 'moment';
import { useRouter } from 'next/router';
import bgCertificate from 'public/images/bg-certificate.svg';
import certificate1 from 'public/images/certificate-1.svg';
import japanQuality from 'public/images/japan-quality.svg';
import logoPana from 'public/images/logo.png';
import signImage from 'public/images/sign.png';
import signBo from 'public/images/sign/bo.png';
import solutionImg from 'public/images/solution.svg';
import { useRef } from 'react';
import { SignData } from 'src/constant/sign';
import { decodeBase64 } from 'src/utils/helpers/common';

interface CertificateComp {
  btnRef?: any;
  refCerti?: any;
  name?: string;
  noDownload?: boolean;
  info?: {
    location: string;
    date: moment.Moment | string;
  };
  signData: SignData;
}

function CertificateComponentDownload(props: CertificateComp) {
  const { btnRef, signData, refCerti, name, info, noDownload } = props;
  const domEl = useRef<HTMLDivElement>(null);
  const btnEl = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    // download image
    const link = document.createElement('a');
    link.download = 'chung-nhan-song-khoe-gop-xanh.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <span
        style={{ color: 'transparent' }}
        onClick={downloadImage}
        ref={btnRef ? btnRef : btnEl}
      ></span>
      <div className={`certificateComponent__download `}>
        <div ref={domEl} className="certificateComponent">
          <div className="w-full certificateComponent__content">
            <div
              className="certificateComponent__bg"
              style={{ backgroundImage: `url(${bgCertificate.src})` }}
            ></div>
            <div
              style={{ height: '450px' }}
              className="certificateComponent__container p-2 tablet:p-3 relative laptop:p-4"
            >
              <div className="h-full w-full flex flex-col">
                <div className="flex justify-center">
                  <div className="flex justify-center items-center">
                    <span>
                      <img src={certificate1.src} alt="" />
                    </span>
                    <span className="mx-4">
                      <img src={logoPana.src} alt="" width={100} height={50} />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 w-full relative justify-between">
                  <div>
                    <div className="flex certificateComponent__logo opacity-0 justify-end items-center">
                      <span>
                        <img src={japanQuality.src} alt="" />
                      </span>
                      <span className="ml-3">
                        <img src={solutionImg.src} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="flex certificateComponent__body justify-end">
                    <div className="w-full">
                      <h2 className="uppercase f-oswald text-[1.3rem] text-center">Chương Trình</h2>
                      <h1 className="color-text-4b font-bold uppercase f-oswald text-[1.5rem] text-center">
                        Sống khỏe Góp Xanh Cùng Panasonic
                      </h1>
                      <div className="flex justify-center">
                        <label className="uppercase f-oswald color-text-414 my-3 text-[1rem] text-center">
                          Vinh Danh Khách Hàng
                        </label>
                      </div>
                      <h1 className="color-primary f-oswald font-bold color-text-4b text-center mb-3 text-[1.5rem]">
                        <span className="f-oswald text-[1.8rem] tracking-wide">
                          {router?.query?.name
                            ? decodeBase64(`${router?.query?.name}`)
                            : name
                            ? name
                            : ''}
                        </span>
                      </h1>
                      <p className="text-center uppercase f-oswald font-medium mb-3 text-[0.9rem] certificateComp__text">
                        <span className="whitespace-nowrap">
                          Đã góp một cây xanh cho{' '}
                          {info?.location ? info?.location : 'Khu bảo tồn thiên nhiên Phong Điền'}
                        </span>
                        <br />{' '}
                        <span className="uppercase text-[0.9rem]">
                          Vì Một Việt Nam Xanh Khỏe Mạnh
                        </span>
                      </p>

                      <p className="text-end font-medium text-[0.7rem] mb-1">
                        Ngày{' '}
                        {info?.date
                          ? moment(info?.date, 'DD/MM/YYYY').format('DD')
                          : moment().format('DD')}{' '}
                        tháng{' '}
                        {info?.date
                          ? moment(info?.date, 'DD/MM/YYYY').format('MM')
                          : moment().format('MM')}{' '}
                        năm{' '}
                        {info?.date
                          ? moment(info?.date, 'DD/MM/YYYY').format('YYYY')
                          : moment().format('YYYY')}
                      </p>
                      <div className="flex justify-between items-start gap-5">
                        <div className="flex flex-col items-center justify-between">
                          <h1 className="whitespace-nowrap color-text-414 font-medium text-[0.7rem]">
                            Đại diện Trung tâm Truyền thông TN&MT
                          </h1>
                          <img
                            style={{ width: '100px', height: '60px' }}
                            className="certificateComponent__sign"
                            src={signBo.src}
                            alt=""
                          />
                          <p className="font-semibold text-[0.7rem] uppercase">Nguyễn Việt Dũng</p>
                        </div>
                        {signData?.sign && (
                          <div className="flex flex-col items-center justify-between">
                            <h1 className="whitespace-nowrap color-text-414 font-medium text-[0.7rem]">
                              {' '}
                              Đại diện Ban quản lý rừng địa phương
                            </h1>
                            <img
                              style={{ width: '100px', height: '60px' }}
                              className="certificateComponent__sign"
                              src={signData.sign}
                              alt=""
                            />
                            <p className="font-semibold text-[0.7rem] uppercase">{signData.name}</p>
                          </div>
                        )}

                        <div className="flex flex-col items-center justify-between">
                          <h1 className="whitespace-nowrap color-text-414 font-medium text-[0.7rem]">
                            Tổng giám đốc Panasonic Việt Nam
                          </h1>
                          <img
                            style={{ width: '100px', height: '60px' }}
                            className="certificateComponent__sign"
                            src={signImage.src}
                            alt=""
                          />
                          <p className="font-semibold text-[0.7rem]">MARUKAWA YOICHI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="flex certificateComponent__logo opacity-0 justify-end items-center">
                      <span>
                        <img src={japanQuality.src} alt="" />
                      </span>
                      <span className="ml-3">
                        <img src={solutionImg.src} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex certificateComponent__logo absolute bottom-2 right-2 tablet:bottom-3 tablet:right-3 laptop:bottom-4 laptop:right-4 justify-end items-center">
                <span className="flex justify-end items-end">
                  <img src={japanQuality.src} alt="" />
                </span>
                <span className="flex justify-end items-end ml-2">
                  <img src={solutionImg.src} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificateComponentDownload;
