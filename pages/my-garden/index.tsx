import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import DefaultLayout from 'src/containers/DefaultLayout';

const DynamicGarden = dynamic(() => import('src/containers/Garden'), {
  suspense: true,
});

export default function Home() {
  return (
    <Suspense fallback={`Loading...`}>
      <DynamicGarden />
    </Suspense>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}