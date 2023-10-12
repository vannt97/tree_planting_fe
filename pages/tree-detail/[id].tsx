import Head from 'next/head';
import { ReactElement } from 'react';
import DefaultLayout from 'src/containers/DefaultLayout';
import Detail from 'src/containers/TreeDetail';
const TreeDetail = () => {
  return (
    <>
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        /> */}
      </Head>
      <Detail />
    </>
  );
};

TreeDetail.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TreeDetail;
