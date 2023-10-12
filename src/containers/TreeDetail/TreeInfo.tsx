import { message } from 'antd';
import GoogleMapReact from 'google-map-react';
import Image from 'next/image';
import copyIcon from 'public/icons/copy.svg';
import downloadIcon from 'public/icons/download.svg';
import facebookI from 'public/icons/facebook.svg';
import shareSocialIcon from 'public/icons/share-social.svg';
import TreeImage from 'public/images/treeDetail.png';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import copy from 'copy-to-clipboard';
import CertificateComponent from 'src/components/CertificateComponent';
import { decodeBase64, encodeBase64 } from 'src/utils/helpers/common';
import ModalRename from './ModalRename';

import Tree2 from 'public/images/gardenTree3.svg';
import { useRouter } from 'next/router';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import MapIframe from 'src/constant/MapIframe.json';
import {
  useLazyGetCampaignIsRunningQuery,
  usePutReadyToPlayMutation,
  useUpdateTotalShareMutation,
} from 'src/services/treeAPI';
const TreeInfo = ({ data, getTracking, username }: any) => {
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

  // const GoogleMap = useMemo(() => {
  //   if (mapLocation.center.lat && data) {
  //     return (
  //       <GoogleMapReact
  //         bootstrapURLKeys={{
  //           key: 'AIzaSyDB_eW3m63e8FydsQSmNBko6DFTlvrMO6I',
  //         }}
  //         defaultCenter={mapLocation.center}
  //         defaultZoom={mapLocation.zoom}
  //         zoom={mapLocation.zoom}
  //         options={(map: any) => ({ mapTypeId: map.MapTypeId.SATELLITE })}
  //         yesIWantToUseGoogleMapApiInternals
  //       >
  //         <MapMarker lat={mapLocation?.center?.lat} lng={mapLocation?.center?.lng} />
  //       </GoogleMapReact>
  //     );
  //   }
  // }, [mapLocation, data]);

  const GoogleMap = useMemo(() => {
    if (data?.provinceCodeInMap) {
      const url = MapIframe.find((iframe) => iframe.key === data?.provinceCodeInMap)?.url;
      if (url) {
        return (
          <div>
            <p className="mb-4 text-base tablet:text-[20px] text-green-primary font-bold mt-6 uppercase">
              Vị trí cây
            </p>
            <div className="mb-8">
              <div style={{ height: 350, width: '100%' }}>
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

  return (
    <div className="tree-info">
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
        <div>
          <div className="tree-info__title flex items-center justify-between mb-4">
            <div className="flex items-center cursor-pointer">
              <span className="mr-2 font-bold ">{data?.treeNameFunny}</span>
            </div>
            <FacebookShareButton
              url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/tree-share?treeCode=${encodeBase64(
                data.publicCode
              )}&name=${encodeBase64(`${username ?? ''}`)}`}
              quote={''}
              hashtag={'#SongkhoeGopxanh'}
            >
              <div className="flex items-center cursor-pointer">
                <Image src={shareSocialIcon} alt="" />
                <span className="uppercase color-primary font-semibold text-base ml-2">
                  Chia sẻ
                </span>
              </div>
            </FacebookShareButton>
          </div>
          <div className="mx-0 tablet:mx-4">
            <div className="w-full">
              <Image
                src={data?.imageLinkTreeType || data?.imageLinkTreePlantingSite || TreeImage}
                layout={'responsive'}
                height={200}
                objectFit="cover"
                width={300}
                alt="Tree Image"
              />
            </div>
            <div className="tree-info__text line">
              <p>Người đăng ký trồng</p>
              <p>Anh/Chị {username || ''}</p>
            </div>
            {/* <div className="tree-info__text line">
              <p>Người trực tiếp chăm sóc</p>
              <p>Anh/Chị {data?.treeCaretakerByLocation}</p>
            </div> */}
            <div className="tree-info__text line">
              <p>Loài cây</p>
              <p>{data?.treeHistory[2].treeName}</p>
            </div>
            <div className="tree-info__text line">
              <p>Nơi trồng</p>
              <p>{data?.location}</p>
            </div>
            <div className="tree-info__text line flex items-start justify-between gap-8">
              <div className="w-1/2">
                <p>Khả năng hấp thụ CO2 hiện tại</p>
                <p>{data?.currentCO2AbsorptionCapacity}</p>
              </div>
              <div className="w-1/2">
                <p>Khả năng hấp thụ CO2 khi trưởng thành</p>
                <p>{data?.abilityToAbsorbCO2AsAnAdult}</p>
              </div>
            </div>
            <div className="tree-info__text none-border">
              <p>Đặc điểm</p>
              <p>{data?.descriptionTreeType}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="tree-info__certification p-3">
            <p className="text-center text-white-500 mb-3 mobile:text-[12px] tablet:text-[20px] laptop:text-[20px]">
              Cảm ơn bạn đã cùng chúng tôi đắp xanh rừng Việt Nam. Đây là chứng nhận chương trình
              trao tặng bạn
            </p>
            <div className="tree-info__certificate">
              <CertificateComponent
                btnRef={btnDownload}
                info={{
                  location: data.location,
                  date: data.addedStamp,
                  provinceName: data?.labelTreePlantingSite,
                  provinceCode: data?.provinceCode,
                }}
                name={username || ''}
              />
            </div>
            <div className="relative">
              <div className={`treeDetail__share ${showShare ? 'active' : ''}`}>
                <div className="flex gap-4 justify-between items-center">
                  <span className="cursor-pointer">
                    <FacebookShareButton
                      url={`${
                        process.env.NEXT_PUBLIC_DOMAIN_TEST
                      }/certificate?treeCode=${encodeBase64(data.publicCode)}&name=${encodeBase64(
                        `${username ?? ''}`
                      )}`}
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
              <div
                onClick={() => setShowShare(!showShare)}
                className="home__crop-btn relative py-3 px-10 cursor-pointer bg-white-500 color-primary font-semibold mt-3 uppercase"
              >
                <div className="flex items-center">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M9.81783 4.58105L6.18213 6.91829"
                      stroke="#87CE29"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      opacity="0.4"
                      d="M6.18213 9.08105L9.81782 11.4183"
                      stroke="#87CE29"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.5 10C5.60457 10 6.5 9.10457 6.5 8C6.5 6.89543 5.60457 6 4.5 6C3.39543 6 2.5 6.89543 2.5 8C2.5 9.10457 3.39543 10 4.5 10Z"
                      stroke="#87CE29"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 14.5C12.6046 14.5 13.5 13.6046 13.5 12.5C13.5 11.3954 12.6046 10.5 11.5 10.5C10.3954 10.5 9.5 11.3954 9.5 12.5C9.5 13.6046 10.3954 14.5 11.5 14.5Z"
                      stroke="#87CE29"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 5.5C12.6046 5.5 13.5 4.60457 13.5 3.5C13.5 2.39543 12.6046 1.5 11.5 1.5C10.3954 1.5 9.5 2.39543 9.5 3.5C9.5 4.60457 10.3954 5.5 11.5 5.5Z"
                      stroke="#87CE29"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="uppercase ml-2 font-semibold text-[16px]">Chia sẻ</span>
                </div>
              </div>
            </div>
          </div>

          {GoogleMap}
        </div>
      </div>
      <ModalRename
        onClose={() => setShowRenameModal(false)}
        showRenameModal={showRenameModal}
        treeName={oldTreeName}
        id={data.id}
        getTracking={getTracking}
      />
    </div>
  );
};

export default TreeInfo;
