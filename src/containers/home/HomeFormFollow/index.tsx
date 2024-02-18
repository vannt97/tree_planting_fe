import { Button, Form, Input, Modal } from 'antd';
import * as htmlToImage from 'html-to-image';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import CertificateComponentShare from 'src/components/CertificateComponent/CertificateComponentShare';
import TreeShareComp from 'src/components/TreeShareComp';
import TreeShareFacebook from 'src/components/TreeShareComp/TreeShareFacebook';
import { useLazyGetInfoTreeQuery, usePostCreateTreeInfoMutation } from 'src/services/greenNews';
import { usePostLoginMutation } from 'src/services/home';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import { encodeBase64 } from 'src/utils/helpers/common';
import provinces from 'src/utils/helpers/provinces.json';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';
import ModalMaintaince from '../ModalMaintaince/ModalMaintaince';

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: (siteKey: string, options: ReCaptchaExecuteOptions) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: 'invisible';
}
const getProvinceCode = (provinceName: string) => {
  if (provinceName) {
    const findProvinceCode = provinces?.find((province) => province.province === provinceName);
    return findProvinceCode?.code;
  }
};

function HomeFormFollow() {
  const router = useRouter();
  const certificateRef = useRef(null);
  const treeShare = useRef(null);
  const [form] = Form.useForm();

  const [onGetTreeHistoryClient, responseGetTreeHistory] = useLazyGetTreeHistoryQuery();
  const [onLogin, responseLogin] = usePostLoginMutation();
  const [postCreateTreeInfo, { isLoading: isLoadingCreateTree }] = usePostCreateTreeInfoMutation();
  const [getInfoTree] = useLazyGetInfoTreeQuery();
  const [infoTree, setInfoTree] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [isShowModal, setShowModal] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.google.com/recaptcha/api.js?render=6LdbPeciAAAAAG_yXb1Rtj5fDNbnNTHzpNAZ-QRY';
    document.body.appendChild(script);
  }, []);

  const handleGetInfoTree = async (body = { provinceCode: '', treeName: '' }) => {
    const infoTree = await getInfoTree(body);
    if (infoTree?.data) {
      setInfoTree(infoTree?.data);
    }
  };

  const handleChange = (e, type: string) => {
    e.target.onkeyup = () => {
      if (e.target.value) {
        const getInput = document.querySelector(`#input-${Number(type) + 1}`) as HTMLElement | null;
        if (getInput !== null) {
          getInput.focus();
        }
      }
    };
  };

  const onKeyUp = (e, type: string) => {
    if (e.which === 8) {
      const getInput = document.querySelector(`#input-${Number(type) - 1}`) as HTMLElement | null;
      form.setFieldsValue({ [`pg${Number(type) - 1}`]: '' });
      if (getInput !== null) {
        getInput.focus();
      }
    } else if (e.which === 37) {
      const getPre = document.querySelector(`#input-${Number(type) - 1}`) as HTMLElement | null;
      if (getPre !== null) {
        getPre.focus();
      }
    } else if (e.which === 39) {
      const getNext = document.querySelector(`#input-${Number(type) + 1}`) as HTMLElement | null;
      if (getNext !== null) {
        getNext.focus();
      }
    }
  };

  useEffect(() => {
    if (infoTree?.location) {
      exportHtmlToImage(infoTree);
    }
  }, [infoTree]);

  const dataUrlToFile = (dataUrl: string, filename: string): File | undefined => {
    const arr = dataUrl.split(',');
    if (arr.length < 2) {
      return undefined;
    }
    const mimeArr = arr[0].match(/:(.*?);/);
    if (!mimeArr || mimeArr.length < 2) {
      return undefined;
    }
    const mime = mimeArr[1];
    const buff = Buffer.from(arr[1], 'base64');
    return new File([buff], filename, { type: mime });
  };

  const exportHtmlToImage = async (response: any) => {
    setLoadingExport(true);
    if (certificateRef && treeShare && htmlToImage && response?.provinceName) {
      const dataUrlCertificate = await htmlToImage.toPng(certificateRef.current);
      const dataUrlTreeShare = await htmlToImage.toPng(treeShare.current);

      if (dataUrlTreeShare) {
        const fileCertificate = dataUrlToFile(
          dataUrlCertificate,
          'chung-nhan-song-khoe-gop-xanh.png'
        );
        const fileTreeShare = dataUrlToFile(dataUrlTreeShare, 'chia-se-cay.png');

        const formData = new FormData();
        formData.append('treeName', `${response?.treeName}`.trim() || '');
        formData.append('phoneNumber', form.getFieldValue('phoneNumber'));
        formData.append('publicCode', form.getFieldValue('publicCode').trim() || '');
        formData.append(
          'provinceCode',
          getProvinceCode(response?.provinceName ? response?.provinceName.trim() : '')
        );
        formData.append('sharingAttachment', fileTreeShare);
        formData.append('certificateAttachment', fileCertificate);
        const pgCode = `${form.getFieldValue('pg1') || ''}${form.getFieldValue('pg2') || ''}${
          form.getFieldValue('pg3') || ''
        }${form.getFieldValue('pg4') || ''}${form.getFieldValue('pg5') || ''}${
          form.getFieldValue('pg6') || ''
        }${form.getFieldValue('pg7') || ''}`;
        try {
          await postCreateTreeInfo(formData)
            .unwrap()
            .then((res) => {
              onLogin({
                phoneNumber: form.getFieldValue('phoneNumber'),
                publicCode: form.getFieldValue('publicCode'),
                gid: pgCode,
              })
                .then((res: any) => {
                  if (res.data.success) {
                    setLoadingExport(false);
                    const phoneNumberHas84 = `84${form
                      .getFieldValue('phoneNumber')
                      .slice(1, form.getFieldValue('phoneNumber').length)}`;
                    localStorage.setItem('USER_TOKEN', res.data.data.token);
                    localStorage.setItem('tree_code', form.getFieldValue('publicCode'));
                    localStorage.setItem('pn', encodeBase64(phoneNumberHas84));

                    router.push(`/my-garden?key=${encodeBase64(phoneNumberHas84)}`);
                    setLoading(false);
                  } else {
                    setLoadingExport(false);
                  }
                })
                .catch((e) => {
                  handleGetInfoTree({
                    provinceCode: responseGetTreeHistory[0]?.provinceCode,
                    treeName: responseGetTreeHistory[0]?.treeType,
                  });
                  setLoadingExport(false);
                });
            });
        } catch (error) {
          setLoadingExport(false);
        }
      } else {
        setLoadingExport(false);
      }
    } else {
      setLoadingExport(false);
    }
  };

  const handleSubmitForm = async (values: any) => {
    const { pg1, pg2, pg3, pg4, pg5, pg6, pg7, publicCode, phoneNumber } = values;
    const pgCode = `${pg1 || ''}${pg2 || ''}${pg3 || ''}${pg4 || ''}${pg5 || ''}${pg6 || ''}${
      pg7 || ''
    }`;
    setLoading(true);
    let phone = '';
    if (phoneNumber.trim().slice(0, 2) === '84') {
      phone = phoneNumber;
    } else if (phoneNumber.slice(0, 3) === '+84') {
      phone = phoneNumber.slice(1, phoneNumber.length);
    } else {
      phone = `84${phoneNumber.slice(1, phoneNumber.length)}`;
    }

    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute('6LdbPeciAAAAAG_yXb1Rtj5fDNbnNTHzpNAZ-QRY', { action: 'login' })
        .then(function (token) {
          onGetTreeHistoryClient({
            phoneNumber: phone,
            publicCode: publicCode?.trim(),
          })
            .unwrap()
            .then((res) => {
              if (res.length) {
                const getTree = res.find((item) => item.treeCode === publicCode);
                const provinceName = getTree?.provinceName;
                localStorage.setItem('user_name', getTree?.customerName);
                localStorage.setItem('pn', encodeBase64(phone));
                onLogin({ phoneNumber, publicCode, gid: pgCode })
                  .then((res: any) => {
                    if (res.data.success) {
                      localStorage.setItem('USER_TOKEN', res.data.data.token);
                      localStorage.setItem('tree_code', form.getFieldValue('publicCode'));
                      setLoading(false);
                      router.push(`/my-garden?key=${encodeBase64(phone)}`);
                    }
                  })
                  .catch((e) => {
                    getInfoTree({
                      provinceCode: getProvinceCode(res[0]?.provinceName.trim()),
                      treeName: res[0]?.treeType.trim(),
                    })
                      .then((resInfo) => {
                        setInfoTree({
                          ...resInfo?.data,
                          provinceName: res[0]?.provinceName.trim(),
                          treeName: res[0]?.treeType.trim(),
                        });
                        exportHtmlToImage({
                          ...resInfo,
                          treeName: res[0]?.treeType.trim(),
                          provinceName: res[0]?.provinceName.trim(),
                        });
                      })
                      .catch((error) => console.log(error));
                  });
              } else {
                ShowNotify(
                  'Lỗi',
                  'Số điện thoại hoặc Mã số cây chưa chính xác.\n Xin vui lòng kiểm tra lại!',
                  'error',
                  'Đã hiểu',
                  999999999
                );
              }
            })
            .catch((error) => {});
        });
    });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitForm}
        autoComplete="off"
        id="contact"
        name="contact"
      >
        <Form.Item
          name="publicCode"
          rules={[{ required: true, message: 'Mã số cây sai, vui lòng nhập lại' }]}
        >
          <Input placeholder="Mã số cây *" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: 'Vui lòng nhập Số điện thoại' }]}
        >
          <Input placeholder="Số điện thoại *" />
        </Form.Item>

        <div className="flex justify-center">
          <Button
            htmlType="submit"
            id="g-recaptcha-response"
            name="g-recaptcha-response"
            className="home__form-btn disable py-3 px-10  text-xl tablet:text-2xl h-full"
            loading={
              responseGetTreeHistory.isFetching ||
              responseLogin.isLoading ||
              isLoadingCreateTree ||
              loadingExport
            }
            disabled
          >
            Truy cập
          </Button>
          {/* <Button
            htmlType="button"
            id="g-recaptcha-response"
            name="g-recaptcha-response"
            className="home__form-btn py-3 px-10  text-xl tablet:text-2xl h-full"
            // loading={
            //   responseGetTreeHistory.isFetching ||
            //   responseLogin.isLoading ||
            //   isLoadingCreateTree ||
            //   loadingExport
            // }
            onClick={() => {
              setShowModal(true);
            }}
          >
            Truy cập
          </Button> */}
        </div>
      </Form>
      <div className="home__tree-share">
        <div className="flex items-center justify-center" ref={treeShare}>
          <TreeShareFacebook
            defaultImage
            data={[
              {
                addedStamp: '',
                description: 'Hello',
                descriptionTreePlantingSite: 'Hello',
                descriptionTreeType: '',
                id: '',
                imageCertificateAttachment: '',
                imageSharingAttachment: '',
                imageLinkTreePlantingSite: infoTree?.imageTreeType || '',
                imageNameTreePlantingSite: '',
                labelTreePlantingSite: '',
                location: infoTree?.location || '',
                matureTreeDescription: infoTree?.matureTreeDescription || '',
                publicCode: '',
                treeName: infoTree?.treeName || '',
                yearOld: 0,
              },
            ]}
            name={
              responseGetTreeHistory?.data && responseGetTreeHistory?.data.length > 0
                ? responseGetTreeHistory?.data[0].customerName
                : ''
            }
          />
        </div>
        <div ref={certificateRef}>
          <CertificateComponentShare
            refCerti={certificateRef}
            name={
              responseGetTreeHistory?.data && responseGetTreeHistory?.data.length > 0
                ? responseGetTreeHistory?.data[0].customerName
                : ''
            }
            info={{
              date: moment(),
              location: infoTree?.location || '',
              provinceName: infoTree?.label || '',
            }}
          />
        </div>
      </div>
      {/* <ModalMaintaince isShowModal={isShowModal} setShowModal={setShowModal}/> */}
    </>
  );
}

export default HomeFormFollow;
