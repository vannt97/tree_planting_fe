/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import logoPana from 'public/images/logo.png';
import certificate1 from 'public/images/certificate-1.svg';
import bgTreeSharing from 'public/images/bg-tree-sharing.png';
import treeShareLeaf from 'public/images/tree-share-leaf.svg';
import treeShareLeaf2 from 'public/images/tree-share-leaf-2.svg';
import TreeImage from 'public/images/treeDetail.png';
import { useRouter } from 'next/router';
import { decodeBase64, encodeBase64 } from 'src/utils/helpers/common';
import { TreeShareI } from 'src/models';
interface TreeShareCompProps {
  data?: TreeShareI[];
  name?: string;
  w100?: boolean;
  defaultImage?: boolean;
}
function TreeShareFacebook(props: TreeShareCompProps) {
  const { data, name, w100, defaultImage } = props;
  const router = useRouter();

  return (
    <>
      {data && data?.length > 0 && (
        <div
          // style={{ backgroundImage: `url(${bgTreeSharing.src})` }}
          className={`treeShare treeShare__facebook pb-4 relative ${w100 ? 'w-full' : ''}`}
        >
          <div className="absolute top-0 right-0 z-[-1] left-0 bottom-0">
            <img src={bgTreeSharing.src} className="w-full h-full" alt="" />
          </div>
          <div className="absolute top-0 h-[3px] w-[28%] left-[50%] translate-x-[-50%] bg-green-primary"></div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 treeShare__header">
              <span className="flex items-center justify-start">
                <img
                  width={100}
                  height={18}
                  className="treeShare__logo"
                  src={logoPana.src}
                  alt=""
                />
              </span>
              <div className="flex items-center justify-center">
                <div className="">
                  <h1 className="text-green-primary font-extrabold text-[0.55rem]">
                    {data[0]?.treeName}
                  </h1>
                </div>
              </div>
              <span className="flex items-center treeShare__certi justify-end">
                <img src={certificate1.src} alt="" />
              </span>
            </div>
            <p className="text-center italic color-text-1e text-[0.4rem] font-medium">
              {data[0]?.yearOld} năm tuổi
            </p>
          </div>

          <div className="flex my-4">
            <div className="flex treeShare__body-des items-center">
              <div className="treeShare__body-des-bg py-1 pl-1 bg-1e">
                <span className="treeShare__body-leaf">
                  <img height={20} width={30} src={treeShareLeaf.src} alt="" />
                </span>
                <p className="text-white-500 treeShare__body-des-text text-[0.25rem]">
                  {data[0]?.matureTreeDescription}
                </p>
              </div>
            </div>
            <div className="flex items-center treeShare__body-image justify-center">
              <div className="treeShare__body-image-div">
                <span>
                  {
                    <img
                      src={
                        !defaultImage
                          ? data && data.length > 0 && data[0]?.imageLinkTreePlantingSite
                            ? data[0]?.imageLinkTreePlantingSite
                            : TreeImage.src
                          : TreeImage.src
                      }
                      alt=""
                    />
                  }
                </span>
              </div>
            </div>

            <div className="flex items-start treeShare__body-title pr-4 flex-col justify-center">
              <span className="treeShare__body-leaf">
                <img height={30} width={40} src={treeShareLeaf2.src} alt="" />
              </span>
              <p className="font-bold text-[0.4rem] color-text-ee">{data[0]?.location}</p>
            </div>
          </div>
          <p className="text-center font-bold text-[0.4rem] text-green-primary italic">
            Được trồng bởi
          </p>
          <h1 className="text-center font-black text-[0.4rem]">
            {name ? name : decodeBase64(`${router?.query?.name}`)}
          </h1>
          <div className="treeShare__bottom">
            <div className="treeShare__bottom-circle"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default TreeShareFacebook;
