import { DatePicker, Form, Input, Select, Spin } from 'antd';
import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import * as htmlToImage from 'html-to-image';
import moment from 'moment';
import Image from 'next/image';
import checkCircle from 'public/icons/check-circle.svg';
import chevronIcon from 'public/icons/chevron-right.svg';
import { useEffect, useRef, useState } from 'react';
import CertificateComponentShare from 'src/components/CertificateComponent/CertificateComponentShare';
import TreeShareFacebook from 'src/components/TreeShareComp/TreeShareFacebook';
import { Warranty } from 'src/models';
import { useLazyGetInfoTreeQuery, usePostCreateTreeInfoMutation } from 'src/services/greenNews';
import { usePostLoginMutation } from 'src/services/home';
import { usePostLoginTokenMutation } from 'src/services/loginWarranty';
import { useLazyGetTreeCodeQuery, usePostWarrantyMutation } from 'src/services/warranty';
import { encodeBase64 } from 'src/utils/helpers/common';
import provinces from 'src/utils/helpers/provinces.json';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';
import HomePopupThank from '../HomePopupThank';
import HomePolicy from './HomePolicy';

const { Option } = Select;

enum ToastMessageWarranty {
  INVALID_PROVINCE_NAME = 'Tên tỉnh/thành không tồn tại',
  INVALID_PROVINCE_CODE = 'Mã tỉnh/thành không tồn tại',
  MALFORMED_BUY_DATE = 'Ngày mua không đúng định dạng DD/MM/YYYY',
  INVALID_BUY_DATE = 'Ngày mua không hợp lệ',
  INVALID_EXPIRED_BUY_DATE = 'Ngày mua sau ngày hết hạn',
  INVALID_SERIAL_NUMBER = 'Serial không hợp lệ',
  INVALID_MODEL_NUMBER = 'Model không hợp lệ',
  UNSUPPORTED_MODEL_NUMBER = 'Model đã hết hạn sử dụng và không được hỗ trợ bảo hành',
  INVALID_PHONE_NUMBER = 'Số điện thoại không hợp lệ',
  NO_PRODUCT_DATE = 'Không tìm thấy sản phẩm',
  DUPLICATE_DATA = 'Thông tin bảo hành đã tồn tại',
  MODEL_NUMBER_REQUIRED = 'Vui lòng nhập model',
  SERIAL_NUMBER_REQUIRED = 'Vui lòng nhập serial',
  BUY_DATE_REQUIRED = 'Vui lòng nhập ngày mua',
  REGISTER_VIA_REQUIRED = '',
  CUSTOMER_PHONE_NUMBER_REQUIRED = 'Vui lòng nhập Số điện thoại',
  CUSTOMER_NAME_REQUIRED = 'Vui lòng nhập Họ và tên',
  PROVINCE_NAME_CODE_REQUIRED = 'Vui lòng chọn tỉnh/thành',
}

interface HomeFormRegisterProps {
  onShowPopupThank: (body: {
    name: string;
    provinceCode: string;
    provinceName: string;
    treeCode: string;
    treeType: string;
    location: string;
  }) => void;
}

const formatPhoneNumber = (phoneNumber: string) => {
  let phone = '';
  let phoneRegister = '';
  if (phoneNumber?.trim()?.slice(0, 2) === '84') {
    phone = phoneNumber;
    phoneRegister = `0${phoneNumber?.trim()?.slice(2, phoneNumber?.length)}`;
  } else if (phoneNumber?.slice(0, 3) === '+84') {
    phone = `${phoneNumber?.slice(1, phoneNumber?.length)}`;
    phoneRegister = `0${phoneNumber?.trim()?.slice(3, phoneNumber?.length)}`;
  } else {
    phone = `84${phoneNumber?.slice(1, phoneNumber?.length)}`;
    phoneRegister = phone;
  }
  return { phone, phoneRegister };
};

function HomeFormRegister(props: HomeFormRegisterProps) {
  const { onShowPopupThank } = props;
  const [showPolicy, setShowPolicy] = useState(false);
  const [showError500, setShowError500] = useState(false);
  const [form] = Form.useForm();
  const [postWarranty] = usePostWarrantyMutation();
  const [postLoginToken] = usePostLoginTokenMutation();
  const [postCreateTreeInfo] = usePostCreateTreeInfoMutation();
  const [onLogin, { isSuccess }] = usePostLoginMutation();
  const treeShare = useRef<HTMLDivElement>(null);
  const [getInfoTree] = useLazyGetInfoTreeQuery();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [infoTree, setInfoTree] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [provincesCode, setProvincesCode] = useState<any>({});
  const [show, setShow] = useState<any>(false);
  const [infoNewTree, setInfoNewTree] = useState<any>({ data: [], name: '' });
  const [hideTextAndButton, setHideTextAndButton] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState('');

  // useEffect(() => {
  //   handleLogin();
  // }, []);

  const handleGetTreeCode = async (params = { phoneNumber: '', modelName: '', engineNo: '' }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/Auth/EW/GetTreeCode?phoneNumber=${params?.phoneNumber}&modelName=${params?.modelName}&engineNo=${params?.engineNo}`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
      if (response?.data) {
        setInfoNewTree({
          data: response.data,
          name: form.getFieldValue('fullName'),
          phoneNumber: formatPhoneNumber(form.getFieldValue('phoneNumber')).phone,
        });
        if (response?.data && response?.data.length > 0 && response.data[0]?.treeCode) {
          setHideTextAndButton(false);
          handleGetInfoTree({
            provinceCode: `${response.data[0].provinceCode}`.trim(),
            treeName: `${response.data[0].treeType}`.trim(),
          });
        } else {
          setHideTextAndButton(true);
          setLoading(false);
        }
        setShow(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (infoNewTree?.data[0]?.provinceCode) {
      exportHtmlToImage(infoNewTree?.data);
    }
  }, [infoNewTree]);

  const handleLogin = async () => {
    const formData = {
      username: process.env.NEXT_PUBLIC_TOKEN_USER_NAME,
      password: process.env.NEXT_PUBLIC_TOKEN_PASSWORD,
      grant_type: 'password',
    };
    const response = await postLoginToken(formurlencoded(formData)).unwrap();
    if (response?.access_token) {
      localStorage.setItem('access_token', response.access_token);
      setAccessToken(response.access_token);
    }
  };

  const handleGetInfoTree = async (body = { provinceCode: '', treeName: '' }) => {
    try {
      const infoTree = await getInfoTree(body);
      if (infoTree?.data) {
        setInfoTree(infoTree?.data);
      }
    } catch (error) {}
  };

  const handleChangeProvinces = (value, options) => {
    setProvincesCode({
      id: value,
      label: options.children,
    });
  };

  const handleSubmitForm = async (values: any) => {
    setShowError500(false);
    setLoading(true);
    const { phoneNumber } = values;

    const formData: Warranty = {
      ApproveWarranty: 'Y',
      BuyDate: moment(values.buyDate).utc().format(),
      CheckProvinceDistrict: 'N',
      CustomerAddress: '',
      CustomerEmail: '',
      CustomerName: values.fullName,
      CustomerTel: formatPhoneNumber(phoneNumber).phoneRegister,
      DistrictCode: '',
      DistrictName: '',
      EngineNo: values.serial,
      IsMarketing: 'Y',
      ModelName: values.model,
      ProvinceCode: provincesCode.id,
      ProvinceName: provincesCode.label,
      RegisterDlrId: '',
      RegisterUserId: '',
      RegisterVia: process.env.NEXT_PUBLIC_TOKEN_USER_NAME,
      SendWarrantyMessage: 'Y',
      WardCode: '',
      WardName: '',
    };
    localStorage.setItem('pn', encodeBase64(formatPhoneNumber(phoneNumber).phone));
    try {
      const warranty = await postWarranty(formData).unwrap();
      if (warranty.errorCode) {
        setLoading(false);
        ShowNotify(
          'Lỗi',
          `${
            warranty.errorCode
              ? `${ToastMessageWarranty[warranty.errorCode]}. Xin vui lòng kiểm tra lại!`
              : 'Đăng ký kích hoạt không thành công, bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.'
          }`,
          'error',
          'Đã hiểu',
          999999999
        );
      } else {
        handleGetTreeCode({
          engineNo: values.serial,
          modelName: values.model,
          phoneNumber: formatPhoneNumber(phoneNumber).phone,
        });
      }
    } catch (error) {
      setLoading(false);
      if (error?.status === 500) {
        setShowError500(true);
      } else {
        ShowNotify(
          'Lỗi',
          `${
            error.data && error?.data?.errorCode
              ? `${ToastMessageWarranty[error.data.errorCode]}. Xin vui lòng kiểm tra lại!`
              : 'Đăng ký kích hoạt không thành công, bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.'
          }`,
          'error',
          'Đã hiểu',
          999999999
        );
      }
    }
  };

  const exportHtmlToImage = async (response: any) => {
    if (certificateRef && treeShare && htmlToImage) {
      try {
        const dataUrlCertificate = await htmlToImage.toPng(certificateRef.current);
        try {
          const dataUrlTreeShare = await htmlToImage.toPng(treeShare.current);
          if (dataUrlCertificate && dataUrlTreeShare) {
            const dataUrlCertificate2 = await htmlToImage.toPng(certificateRef.current);
            const dataUrlTreeShare2 = await htmlToImage.toPng(treeShare.current);
            try {
              if (dataUrlTreeShare2) {
                const dataUrlCertificate3 = await htmlToImage.toPng(certificateRef.current);

                const fileCertificate = dataUrlToFile(
                  dataUrlCertificate3,
                  'chung-nhan-song-khoe-gop-xanh.png'
                );
                const fileTreeShare = dataUrlToFile(dataUrlTreeShare2, 'chia-se-cay.png');
                const formData = new FormData();
                formData.append('treeName', `${response[0].treeType}`.trim() || '');
                formData.append('publicCode', `${response[0].treeCode}`.trim() || '');
                formData.append('provinceCode', `${response[0].provinceCode}`.trim() || '');
                formData.append('sharingAttachment', fileTreeShare);
                formData.append('certificateAttachment', fileCertificate);
                form.getFieldValue('PGCode') &&
                  formData.append('PGCode', form.getFieldValue('PGCode') || '');
                try {
                  const resPostTree = await postCreateTreeInfo(formData).unwrap();
                  if (resPostTree) {
                    setLoading(false);
                    onShowPopupThank({
                      name: form.getFieldValue('fullName'),
                      provinceCode: response[0]?.provinceCode,
                      provinceName: response[0]?.provinceName,
                      treeCode: response[0]?.treeCode,
                      treeType: response[0]?.treeType,
                      location: infoTree?.location || '',
                    });
                  }
                  try {
                    const responseLogin: any = await onLogin({
                      phoneNumber: form.getFieldValue('phoneNumber'),
                      publicCode: response[0]?.treeCode,
                    });
                    if (responseLogin?.data?.success) {
                      localStorage.setItem('USER_TOKEN', responseLogin.data.data.token);
                      localStorage.setItem('user_name', form.getFieldValue('fullName'));
                      localStorage.setItem('tree_code', response[0]?.treeCode);
                    }
                  } catch (error) {}
                } catch (error) {}
              }
            } catch (error) {}
          }
        } catch (error) {}
      } catch (error1) {}
    }
  };

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

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} autoComplete="off">
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[
            { required: true, message: 'Vui lòng nhập họ và tên' },
            { max: 255, message: 'Độ dài không quá 255 kí tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            { max: 20, message: 'Độ dài không quá 20 kí tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="custom-datepicker">
          <Form.Item
            rules={[{ required: true, message: 'Vui lòng nhập ngày mua' }]}
            name="buyDate"
            label="Ngày mua"
          >
            <DatePicker
              className="custom-datepicker"
              allowClear={false}
              placement="bottomRight"
              placeholder=""
              format={'DD/MM/YYYY'}
              disabledDate={(d) => !d || d.isBefore(moment('01/11/2022', 'DD/MM/YYYY'))}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="model"
          label="Model"
          rules={[
            { required: true, message: 'Vui lòng nhập model' },
            { max: 100, message: 'Độ dài không quá 100 kí tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="serial"
          label="Serial"
          rules={[
            { required: true, message: 'Vui lòng nhập serial' },
            { max: 100, message: 'Độ dài không quá 100 kí tự' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="province"
          label="Tỉnh thành"
          rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành' }]}
        >
          <Select
            allowClear={false}
            showSearch
            filterOption={(input, option) =>
              option.children.toString().toLowerCase().includes(input.toLowerCase())
            }
            suffixIcon={<Image src={chevronIcon} alt="" />}
            onChange={(value, option) => handleChangeProvinces(value, option)}
          >
            {provinces.map((province) => (
              <Option key={province.code} value={province.code}>
                {province.province}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="PGCode"
          label="Mã giới thiệu PG"
          rules={[{ max: 100, message: 'Độ dài không quá 100 kí tự' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div
            onClick={() => setShowPolicy(!showPolicy)}
            className="flex cursor-pointer items-start tablet:items-center"
          >
            <span className="flex justify-center items-center">
              <Image src={checkCircle} width={25} height={25} alt="" />
            </span>
            <p className="color-text-e text-base ml-3">
              Bằng việc đăng ký kích hoạt bảo hành, bạn đã đồng ý với&nbsp;
              <span className="color-text-green-29 cursor-pointer">điều khoản</span>
              &nbsp; của chương trình
            </p>
          </div>
        </Form.Item>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`py-3 px-10 home__form-btn color-text-1e ${loading ? 'loading' : ''}`}
          >
            Kích hoạt <Spin spinning={loading}></Spin>
          </button>
        </div>
      </Form>
      {showError500 && (
        <p className="color-text-red-9d text-sl mt-3">
          Đăng ký kích hoạt không thành công, bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ
          giúp.
        </p>
      )}

      <HomePolicy show={showPolicy} onClose={() => setShowPolicy(!showPolicy)} />
      <HomePopupThank
        info={{
          name: infoNewTree?.name || '',
          phoneNumber: infoNewTree?.phoneNumber || '',
          provinceCode:
            infoNewTree?.data && infoNewTree.data.length > 0
              ? infoNewTree?.data[0]?.provinceCode
              : '',
          provinceName:
            infoNewTree?.data && infoNewTree.data.length > 0
              ? infoNewTree?.data[0]?.provinceName
              : '',
          treeCode:
            infoNewTree?.data && infoNewTree.data.length > 0 ? infoNewTree?.data[0]?.treeCode : '',
          treeType:
            infoNewTree?.data && infoNewTree.data.length > 0 ? infoNewTree?.data[0]?.treeType : '',
          location: infoTree?.location || '',
        }}
        isSuccess={isSuccess}
        show={show}
        onClose={() => setShow(false)}
        hideTextAndButton={hideTextAndButton}
      />
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
            name={form.getFieldValue('fullName')}
          />
        </div>
        <div className="flex justify-center items-center" ref={certificateRef}>
          <CertificateComponentShare
            refCerti={certificateRef}
            name={form.getFieldValue('fullName')}
            info={{
              date: moment(),
              location: infoTree?.location || '',
              provinceName: infoTree?.label || '',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default HomeFormRegister;
