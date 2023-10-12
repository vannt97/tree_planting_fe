import signNinhThuan from 'public/images/sign/ninh-thuan.png';
import signAnGiang from 'public/images/sign/an-giang.png';
import signSocTrang from 'public/images/sign/sign-soctrang.png';
import signHaTinh from 'public/images/sign/ha-tinh.png';
import signHue from 'public/images/sign/hue.png';
import signDienBien from 'public/images/sign/dien-bien.png';
import signQuangBinh from 'public/images/sign/quang-binh.png';
import signBacKan from 'public/images/sign/bac-kan.png';
import signBacLieu from 'public/images/sign/bac-lieu.png';
import signHaGiang from 'public/images/sign/ha-giang.png';
import signThanhHoa from 'public/images/sign/thanh-hoa.png';

import provinces from 'src/utils/helpers/provinces.json';

export interface SignData {
  provinceCode: string;
  sign: string;
  name: string;
}
export const SignData: SignData[] = [
  {
    provinceCode: '58',
    sign: signNinhThuan.src,
    name: 'Trần Văn Tiếp',
  },
  {
    provinceCode: '89',
    sign: signAnGiang.src,
    name: 'Thái Văn Nhân',
  },
  {
    provinceCode: '94',
    sign: signSocTrang.src,
    name: 'Phan Thị Trúc Giang',
  },
  {
    provinceCode: '42',
    sign: signHaTinh.src,
    name: 'Nguyễn Hữu An',
  },
  {
    provinceCode: '11',
    sign: signDienBien.src,
    name: 'Diệp Văn Chính',
  },
  {
    provinceCode: '44',
    sign: signQuangBinh.src,
    name: 'Lê Anh Tuấn',
  },
  {
    provinceCode: '46',
    sign: signHue.src,
    name: 'Lê Văn Hướng',
  },
  {
    provinceCode: '06',
    sign: signBacKan.src,
    name: 'Lê Xuân Diệu',
  },
  {
    provinceCode: '95',
    sign: signBacLieu.src,
    name: 'Lê Chí Linh',
  },
  {
    provinceCode: '02',
    sign: signHaGiang.src,
    name: 'Vương Đình Lương',
  },
  {
    provinceCode: '38',
    sign: signThanhHoa.src,
    name: 'Phạm Văn Tám',
  },
];

export const getSign = (provinceCode: string) => {
  return (
    SignData.find((item) => item.provinceCode === provinceCode) || {
      provinceCode: '',
      sign: '',
      name: '',
    }
  );
};

export const getProvinceCode = (provinceName: string) => {
  if (provinceName) {
    const findProvinceCode = provinces?.find((province) => province.province === provinceName);
    return findProvinceCode?.code;
  }
};
