import Seo from "src/components/Seo";
import myGardenImg from "public/images/my-garden.png";
import { ReactElement, Suspense } from "react";
import DefaultLayout from "src/containers/DefaultLayout";
import dynamic from "next/dynamic";

const DynamicGallery = dynamic(() => import("src/containers/Gallery"), {
  suspense: true,
});

const Gallery = () => {
  return (
    <Suspense fallback={`Loading...`}>
      <DynamicGallery />
    </Suspense>
  );
};
export default Gallery;

Gallery.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
