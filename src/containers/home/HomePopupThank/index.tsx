import Image from 'next/image';
import treePopup from 'public/icons/tree-popup.svg';
import { useEffect, useRef, useState } from 'react';
import HomePopupCertificate from '../HomePopupCertificate';
import ModalCustom from 'src/components/ModalCustom';
import { useLazyGetTreePlantingSiteQuery } from 'src/services/greenNews';
import { Modal, Spin } from 'antd';
import { useLazyGetTokenFacebookQuery, usePostFacebookMutation } from 'src/services/facebook';
import { encodeBase64 } from 'src/utils/helpers/common';
interface HomePopupThankProps {
  info?: {
    treeCode: string;
    name: string;
    phoneNumber: string;
    provinceCode: string;
    provinceName: string;
    treeType: string;
    location: string;
  };
  show: boolean;
  isSuccess: any;
  hideTextAndButton: boolean;
  onClose: () => void;
}

function HomePopupThank(props: HomePopupThankProps) {
  const { show, info, isSuccess, hideTextAndButton, onClose } = props;
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const btnRef = useRef(null);
  const [getPlantingSite] = useLazyGetTreePlantingSiteQuery();
  const [loading, setLoading] = useState(false);
  const [postFacebook, responseFacebook] = usePostFacebookMutation();

  useEffect(() => {
    if (info && info.provinceCode) {
      getPlantingSite();
    }
  }, [info?.provinceCode]);

  useEffect(() => {
    // if (isSuccess && loading && responseFacebook.isSuccess) {
    //   setLoading(false)

    //   setShowCertificate(true)
    // }

    if (isSuccess && loading) {
      setLoading(false);
      setShowCertificate(true);
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     handleGetfacebook()
  //   }
  // }, [isSuccess])

  // const handleGetfacebook = async () => {
  //   const responseToken = await getTokenFacebook()

  //   if (responseToken) {
  //     const body = {
  //       token: responseToken.data['access_token'],
  //       url: `${process.env.NEXT_PUBLIC_DOMAIN_TEST}/certificate?treeCode=${encodeBase64(
  //         info?.treeCode
  //       )}&name=${encodeBase64(info?.name)}`
  //     }

  //     await postFacebook(body).unwrap()
  //   }
  // }

  const handleShowPopupCerti = async () => {
    // if (isSuccess && responseFacebook.isSuccess) {
    //   setShowCertificate(!showCertificate)
    // }
    // else {
    //   setLoading(true)
    // }
    if (isSuccess) {
      setShowCertificate(true);
    } else {
      setLoading(true);
    }
  };

  return (
    <>
      <Modal onCancel={onClose} footer={null} centered visible={show} closeIcon={<span></span>}>
        <h1 className="uppercase text-[20px] color-primary mb-1 font-medium text-center">
          Chương Trình
        </h1>
        <h1 className="uppercase text-2xl mb-6 color-primary font-semibold text-center">
          sống khỏe góp xanh
          <br /> cùng panasonic
        </h1>

        <div className="home__popupThank-tree flex justify-center">
          <Image src={treePopup} alt="" />
        </div>
        {/* <h1 className='uppercase text-2xl font-semibold text-center mt-8'>chúc mừng</h1>
                <p className="color-text-33 text-center text-xl my-3">
                    Bạn đã kích hoạt bảo hành và đăng ký trồng cây thành công
                </p> */}
        <h1 className="uppercase text-2xl font-semibold text-center mt-8">chúc mừng</h1>
        <p className="color-text-33 text-center text-xl mt-3 mb-1">
          Bạn đã kích hoạt bảo hành và đăng ký
          <br /> trồng cây thành công. {!hideTextAndButton && 'Mã số cây của bạn là'}
          <br />
          <span className="uppercase color-primary font-semibold text-2xl">
            {info ? info?.treeCode : ''}
          </span>
        </p>
        {!hideTextAndButton && (
          <div className="flex justify-center">
            <button
              ref={btnRef}
              onClick={handleShowPopupCerti}
              className={`uppercase relative home__popupThank-btn text-black-500 py-3 px-4 font-semibold bg-green-29 ${
                loading ? 'loading' : ''
              }`}
            >
              Xem chứng nhận
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <Spin spinning={loading}></Spin>
              </div>
            </button>
          </div>
        )}
        {hideTextAndButton && (
          <p className="text-center">
            Model không nằm trong danh sách Sống khỏe góp xanh. Mời bạn tham khảo danh sách sản phẩm
            áp dụng&nbsp;
            <a
              href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html"
              target="blank"
              className="link-no-treecode"
            >
              tại đây
            </a>
          </p>
        )}
      </Modal>

      <HomePopupCertificate
        phoneNumber={info && info.phoneNumber ? info.phoneNumber : ''}
        treeCode={info && info.treeCode ? info.treeCode : ''}
        show={showCertificate}
        location={info.location || info?.provinceName || ''}
        provinceName={info.provinceName || ''}
        name={info && info.name ? info.name : ''}
        onClose={() => setShowCertificate(!showCertificate)}
        isSuccess={isSuccess}
        isSuccessFacebook={responseFacebook?.isSuccess}
      />
    </>
  );
}

export default HomePopupThank;
