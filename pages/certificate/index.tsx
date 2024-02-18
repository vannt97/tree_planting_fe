import Seo from "src/components/Seo";
import { useRef } from "react";
import certificateNoName from "public/images/certificate-no-name.png";
import CertificateComponent from "src/components/CertificateComponent";
import { decodeBase64 } from "src/utils/helpers/common";
import { useRouter } from "next/router";
import { useGetDetailTreeSharingQuery } from "src/services/greenNews";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import moment from "moment";
import { getProvinceCode } from "src/constant/sign";

interface CertificateProps {
  dataServer: any;
  name: string | string[];
  treeCode: string | string[];
  imageLink: string | string[];
}

function Certificate(props: CertificateProps) {
  const { dataServer, name, treeCode, imageLink } = props;
  let refCerti = useRef(null);
  const router = useRouter();
  const { data } = useGetDetailTreeSharingQuery({
    treeCode: decodeBase64(`${router?.query?.treeCode}`),
  });

  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/certificate?name=${name}&treeCode=${treeCode}`}
        title="Chứng Nhận Sống Khỏe Góp Xanh Cùng Panasonic"
        thumnail={`${dataServer ? `${imageLink}` : ""}`}
        description={`Đã góp một cây xanh cho ${
          dataServer ? `${dataServer[0]?.location}` : ""
        } Vì Một Việt Nam Xanh Khỏe Mạnh`}
      />
      {data && data?.length > 0 && (
        <div>
          <section className="flex justify-center container-custom w-full items-center h-screen">
            <div
              className="certificate__wrapper "
              style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 0px" }}
              ref={refCerti}
            >
              <CertificateComponent
                info={{
                  location: data ? data[0]?.location : "",
                  date: data ? data[0]?.addedStamp : moment(),
                  provinceName:
                    data &&
                    (data[0]?.label || data[0]?.labelTreePlantingSite || ""),
                  provinceCode:
                    data &&
                    (data[0]?.label || data[0]?.labelTreePlantingSite || "")
                      ? getProvinceCode(
                          data &&
                            (data[0]?.label ||
                              data[0]?.labelTreePlantingSite ||
                              "")
                        )
                      : "",
                }}
                responsive
                refCerti={refCerti}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Certificate;

export const getServerSideProps: GetServerSideProps<CertificateProps> = async (
  context: GetServerSidePropsContext
) => {
  const decodeBase64 = Buffer.from(
    `${context?.query?.treeCode}`,
    "base64"
  ).toString("ascii");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/TreeInformations/DetailTreeSharing?StringCode=${decodeBase64}`
  );
  const data = await response.json();
  const name = context?.query?.name || "";
  const treeCode = context?.query?.treeCode || "";
  const imageLink = `${data.data[0].imageCertificateAttachment.slice(
    0,
    4
  )}s${data.data[0].imageCertificateAttachment.slice(4)}`;

  return {
    props: {
      dataServer: data.data,
      name: name,
      treeCode: treeCode,
      imageLink: imageLink,
    },
  };
};
