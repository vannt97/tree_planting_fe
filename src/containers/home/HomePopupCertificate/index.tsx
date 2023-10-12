/* eslint-disable @next/next/no-img-element */
import { Button, message, Modal, Popover } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import copyIcon from 'public/icons/copy.svg';
import downloadIcon from 'public/icons/download.svg';
import { useEffect, useRef } from 'react';
import { FacebookShareButton } from 'react-share';
import CertificateComponent from 'src/components/CertificateComponent';
import { useLazyGetDetailTreeSharingQuery } from 'src/services/greenNews';
import { usePostLoginMutation } from 'src/services/home';
import {
  useLazyGetCampaignIsRunningQuery,
  usePutReadyToPlayMutation,
  useUpdateTotalShareMutation,
} from 'src/services/treeAPI';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import { encodeBase64 } from 'src/utils/helpers/common';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import { getProvinceCode } from 'src/constant/sign';

interface HomePopupCertificateProps {
  show: boolean;
  onClose: () => void;
  name?: string;
  phoneNumber: string;
  treeCode: string;
  location: string;
  provinceName: string;
  isSuccess: any;
  isSuccessFacebook: boolean;
}

function HomePopupCertificate(props: HomePopupCertificateProps) {
  const {
    show,
    onClose,
    name,
    phoneNumber,
    treeCode: publicCode,
    provinceName,
    location,
    isSuccess,
  } = props;
  const router = useRouter();
  const btnDownload = useRef<any>(null);
  const [onLogin, responseLogin] = usePostLoginMutation();
  const [onGetTreeHistoryClient, responGetTreeHistory] = useLazyGetTreeHistoryQuery();
  const [getTreeDetail] = useLazyGetDetailTreeSharingQuery();
  const [onUpdateTotalShare] = useUpdateTotalShareMutation();
  const [updateHistory] = usePutReadyToPlayMutation();
  const [getCampaignIsRunning] = useLazyGetCampaignIsRunningQuery();

  useEffect(() => {
    getTreeDetail({ treeCode: publicCode });
  }, [publicCode]);

  const handleCopyUrlCertificate = () => {
    copy(
      `${window.location.origin}/certificate?name=${encodeBase64(name)}&treeCode=${encodeBase64(
        publicCode
      )}`
    );
    message.success('Đã copy thành công!');
  };

  const handleRedirectGarden = () => {
    onGetTreeHistoryClient({
      phoneNumber,
      publicCode,
    })
      .unwrap()
      .then((res) => {
        if (res.length) {
          const getTree = res.find((item) => item.treeCode === publicCode);
          localStorage.setItem('user_name', getTree?.customerName);
          onLogin({ phoneNumber, publicCode })
            .then((res: any) => {
              if (res.data.success) {
                localStorage.setItem('USER_TOKEN', res.data.data.token);
                router.push(`/my-garden?key=${encodeBase64(phoneNumber)}`);
              }
            })
            .catch((e) => {
              ShowNotify(
                'Error',
                'Số điện thoại hoặc Mã số cây chưa chính xác.\n Xin vui lòng kiểm tra lại!',
                'error',
                'Đã hiểu',
                999999999
              );
            });
        } else {
          ShowNotify(
            'Error',
            'Số điện thoại hoặc Mã số cây chưa chính xác.\n Xin vui lòng kiểm tra lại!',
            'error',
            'Đã hiểu',
            999999999
          );
        }
      })
      .catch((error) => {});
  };

  const onShareFacebook = async (publicCode?: string) => {
    try {
      await onUpdateTotalShare({ publicCode }).unwrap();
      const response = await getCampaignIsRunning({
        publicCode,
      }).unwrap();
      if (response?.data) {
        if (response?.data?.campaignDuration?.length !== 0) {
          await updateHistory({ publicCode }).unwrap();
          router.push(`/wheel/${publicCode}`);
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
    <div className="home_certificate">
      <Modal
        onCancel={onClose}
        visible={show}
        centered
        closeIcon={<span></span>}
        footer={false}
        className="modal-cer"
      >
        <div className="p-1">
          <div className="home__certificate-img flex justify-center">
            <CertificateComponent
              info={{
                location,
                provinceName,
                date: moment(),
                provinceCode: getProvinceCode(provinceName),
              }}
              modal
              name={name}
              btnRef={btnDownload}
            />
            {/* <img src={dataTreeDetail && dataTreeDetail.data && dataTreeDetail.data.length > 0 ? dataTreeDetail.data[0].imageCertificateAttachment : ""} alt="" /> */}
          </div>
          <div className="mt-3">
            <p className="text-center color-text-33">
              Chia sẻ để nhận 01 vé tham gia
              <br />
              {'"'}
              <span className="uppercase text-green-29">Vòng quay xanh khỏe mạnh</span>
              {'"'}
              <br />
              Tổng giá trị quà tặng lên tới{' '}
              <span className="text-green-primary">
                <span className="font-bold">300</span> triệu
              </span>{' '}
              đồng
            </p>
          </div>
          <div className="mt-2">
            <div className="flex justify-center">
              {show && (
                <FacebookShareButton
                  url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/certificate?name=${encodeBase64(
                    name
                  )}&treeCode=${encodeBase64(publicCode)}`}
                  quote={''}
                  hashtag={'#SongkhoeGopxanh'}
                  onShareWindowClose={() =>
                    onShareFacebook((router.query.id as string) || publicCode)
                  }
                >
                  <button
                    className="uppercase home__certificate-btn mb-3 facebook w-full font-semibold"
                    style={{ padding: '0.45rem 0 !important;' }}
                  >
                    <span className="flex items-center w-full justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_997_1729)">
                          <path
                            d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z"
                            fill="white"
                          />
                          <path
                            d="M11.1141 10.3125L11.4688 8H9.25V6.5C9.25 5.86734 9.56 5.25 10.5538 5.25H11.5625V3.28125C11.5625 3.28125 10.647 3.125 9.77172 3.125C7.94438 3.125 6.75 4.2325 6.75 6.2375V8H4.71875V10.3125H6.75V15.9028C7.5783 16.0324 8.4217 16.0324 9.25 15.9028V10.3125H11.1141Z"
                            fill="#1877F2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_997_1729">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className="ml-2" style={{ padding: '0.51rem 0' }}>
                        Chia sẻ về FaceBook
                      </span>
                    </span>
                  </button>
                </FacebookShareButton>
              )}
            </div>

            <div className="flex justify-center items-center my-2">
              <span
                onClick={() => btnDownload.current.click()}
                className="cursor-pointer flex items-center"
              >
                <Image height={30} width={30} src={downloadIcon} alt="" />
                <span className="color-primary uppercase font-semibold ml-1">Download</span>
              </span>

              <span
                onClick={handleCopyUrlCertificate}
                className="cursor-pointer flex ml-4 items-center"
              >
                <Image height={30} width={30} src={copyIcon} alt="" />
                <span className="color-primary uppercase font-semibold ml-1">Copy Link</span>
              </span>
            </div>

            <div className="flex justify-center">
              <Button
                loading={responGetTreeHistory?.isLoading || responseLogin?.isLoading || !isSuccess}
                onClick={handleRedirectGarden}
                className={`uppercase relative home__certificate-login color-primary p-1 font-semibold ${
                  responGetTreeHistory.isLoading || responseLogin.isLoading ? 'loading' : ''
                }`}
              >
                Xem cây
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomePopupCertificate;

const PopoverStyle = styled(Popover)`
  .ant-popover-arrow {
    display: none;
  }
`;
