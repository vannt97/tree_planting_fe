import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

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
