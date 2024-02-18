import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Seo from "src/components/Seo";
import DefaultLayout from "src/containers/DefaultLayout";
import Detail from "src/containers/TreeDetail";
import TreesJourney from "src/containers/TreesJourney";
import { TreeAPI, useLazyGetTrackMyTreeQuery } from "src/services/treeAPI";
import { useLazyGetTreeHistoryQuery } from "src/services/warranty";
import { decodeBase64 } from "src/utils/helpers/common";
import treeDetailImg from "public/images/track-your-tree.png";
import { ShowNotify } from "src/utils/helpers/ShowNotify";

const TreeDetail = () => {
  const router = useRouter();
  const [treeData, setTreeData] = useState<any>();
  const [getTracking, { data }] = useLazyGetTrackMyTreeQuery();
  const [onGetTreeHistoryClient] = useLazyGetTreeHistoryQuery();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (router.query.id) {
      getTracking({ stringCode: router.query.id })
        .then((value) => {
          if(!value.isSuccess){
            ShowNotify("Warning","Đã hết phiên đăng nhập vui lòng đăng nhập lại","warning",`Về Trang Chủ`,9999999).then((val)=>{
              router.push("/");
            })
          }
        })
        .catch((err) => {
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    router.query.id &&
      (async () => {
        const response = await onGetTreeHistoryClient({
          phoneNumber: decodeBase64(localStorage.getItem("pn")),
          publicCode: router.query.id as string,
        });
        setUsername(response?.data[0]?.customerName);
      })();
  }, [router]);

  useEffect(() => {
    data?.id && Object?.keys(data) && setTreeData(data);
  }, [data]);

  const selectSubscriptionStatus = (state) => state[TreeAPI.reducerPath];

  const state = useSelector(selectSubscriptionStatus);

  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/tree-detail/${router.query.id}`}
        title={treeData?.treeName ? treeData?.treeName : "Thông tin cây"}
        thumnail={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/${treeDetailImg.src}`}
        description={data?.descriptionTreeType}
      />
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        /> */}
      </Head>
      {/* <Detail /> */}
      <TreesJourney
        data={treeData}
        getTracking={getTracking}
        username={username}
        trackingData={data}
      />
    </>
  );
};

TreeDetail.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TreeDetail;
