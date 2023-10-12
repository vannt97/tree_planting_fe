export interface Warranty {
  ModelName: string;
  EngineNo: string;
  BuyDate: string;
  RegisterVia: string;
  RegisterUserId: string;
  RegisterDlrId: string;
  CustomerTel: string;
  CustomerName: string;
  CustomerAddress: string;
  CustomerEmail: string;
  ProvinceName: string;
  ProvinceCode: string;
  DistrictName: string;
  DistrictCode: string;
  WardName: string;
  WardCode: string;
  IsMarketing: "Y" | "N";
  CheckProvinceDistrict: "Y" | "N";
  SendWarrantyMessage: "Y" | "N";
  ApproveWarranty: "Y" | "N";
}
