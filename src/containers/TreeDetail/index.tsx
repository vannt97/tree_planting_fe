import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Seo from 'src/components/Seo';
import { TreeAPI, useLazyGetTrackMyTreeQuery } from 'src/services/treeAPI';
import Map from './Map';
import Process from './Process';
import TimeSheet from './TimeSheet';
import TreeDetailStory from './TreeDetailStoryAndHistory/TreeDetailStory';
import TreeInfo from './TreeInfo';
import treeDetailImg from 'public/images/track-your-tree.png';
import { useSelector } from 'react-redux';
import TreeDetailHistory from './TreeDetailStoryAndHistory/TreeDetailHistory';
import Head from 'next/head';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import { decodeBase64 } from 'src/utils/helpers/common';

const TreeDetail = () => {
  const router = useRouter();
  const [treeData, setTreeData] = useState<any>();
  const [getTracking, { data }] = useLazyGetTrackMyTreeQuery();
  const [onGetTreeHistoryClient] = useLazyGetTreeHistoryQuery();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (router.query.id) {
      getTracking({ stringCode: router.query.id });
    }
  }, [router.query.id]);

  useEffect(() => {
    router.query.id &&
      (async () => {
        const response = await onGetTreeHistoryClient({
          phoneNumber: decodeBase64(localStorage.getItem('pn')),
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

  useEffect(() => {
  }, []);
  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/tree-detail/${router.query.id}`}
        title={treeData?.treeName ? treeData?.treeName : 'Thông tin cây'}
        thumnail={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/${treeDetailImg.src}`}
        description={data?.descriptionTreeType}
      />
      <div className="container-custom tree-detail mb-10 mt-4">
        <div className="tree-detail__title mb-4">
          Xin chào <span className="text-green-primary font-semibold">{username}</span>, cùng xem{' '}
          <span className="text-green-primary font-semibold">{treeData?.treeName}</span> lớn tới đâu
          rồi nhé!
        </div>

        {treeData && Object?.keys(treeData).length && (
          <>
            <TimeSheet data={treeData?.treeHistory} />
            <TreeInfo data={treeData} getTracking={getTracking} username={username} />
            {/* <Process data={treeData?.treeGrouwthJourney} /> */}
            {data && Object?.keys(treeData).length && <Map trackingData={data}></Map>}
            {/* <TreeDetailStory data={treeData} /> */}
            <TreeDetailHistory data={data} />
          </>
        )}
      </div>
    </>
  );
};

export default TreeDetail;
