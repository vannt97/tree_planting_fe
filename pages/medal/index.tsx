import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Seo from "src/components/Seo";
import MedalPage from "src/containers/Medal";

function Medal(props: any) {
  const { name, link } = props;
  // let refCerti = useRef(null);
  // const router = useRouter();
  // const { data } = useGetDetailTreeSharingQuery({
  //   treeCode: decodeBase64(`${router?.query?.treeCode}`),
  // });

  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/medal?name=${name}&link=${link}`}
        title="Huy Hiệu Sống Khỏe Góp Xanh Cùng Panasonic"
        thumnail={`${link ? `${link}` : ""}`}
        description={`Từ ngày 01/11/2023 đến 31/03/2024, với mỗi sản phẩm thuộc bộ GIẢI PHÁP SỨC KHỎE TOÀN DIỆN được bán ra, Panasonic Việt Nam sẽ trồng một cây xanh phát triển rừng.
        VÌ MỘT VIỆT NAM XANH KHỎE MẠNH
        Mỗi cây sẽ có một mã số riêng giúp bạn có thể theo dõi và ngắm nhìn tiến trình sinh trưởng bất kì lúc nào.
        Mời bạn đăng kí bảo hành điện tử để nhận mã cây và có cơ hội nhận nhiều ưu đãi hấp dẫn từ Panasonic Việt Nam.`}
      />
      <MedalPage nameTree={name} linkTree={link}/>
    </>
  );
}

export default Medal;

export const getServerSideProps: GetServerSideProps<any> = async (
  context: GetServerSidePropsContext
) => {
  let link = context?.query?.link;
  let name = context?.query?.name;
  return {
    props: {
      name,
      link
    },
  };
};
