import Seo from 'src/components/Seo';
import TreeShareComp from 'src/components/TreeShareComp';
import treeSharingNoName from 'public/images/treesharing-no-name.png';
import { useRouter } from 'next/router';
import { useGetDetailTreeSharingQuery } from 'src/services/greenNews';
import { decodeBase64, encodeBase64 } from 'src/utils/helpers/common';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { TreeShareI } from 'src/models';

interface TreeShareProps {
  dataServer: TreeShareI[];
  name: string | string[];
  treeCode: string | string[];
}

function TreeShare(props: TreeShareProps) {
  const { dataServer, name, treeCode } = props;
  const router = useRouter();
  const { data } = useGetDetailTreeSharingQuery({
    treeCode: decodeBase64(`${router?.query?.treeCode}`),
  });
  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/tree-share?treeCode=${treeCode}&name=${name}`}
        title={`${dataServer && dataServer?.length > 0 ? dataServer[0].treeName : ''}`}
        thumnail={`${
          dataServer && dataServer?.length > 0 && dataServer[0]?.imageSharingAttachment
            ? dataServer[0]?.imageSharingAttachment
            : `${process.env.NEXT_PUBLIC_DOMAIN_TEST}/${treeSharingNoName.src}`
        }`}
        description={`${
          dataServer && dataServer?.length > 0 ? dataServer[0]?.descriptionTreeType : ''
        }`}
      />

      <section className="h-screen flex justify-center items-center">
        <TreeShareComp data={data} />
      </section>
    </>
  );
}

export default TreeShare;

export const getServerSideProps: GetServerSideProps<TreeShareProps> = async (
  context: GetServerSidePropsContext
) => {
  const decodeBase64 = Buffer.from(`${context?.query?.treeCode}`, 'base64').toString('ascii');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/TreeInformations/DetailTreeSharing?StringCode=${decodeBase64}`
  );
  const data = await response.json();
  const name = context?.query?.name || '';
  const treeCode = context?.query?.treeCode || '';

  return {
    props: {
      dataServer: data.data,
      name: name,
      treeCode: treeCode,
    },
  };
};
