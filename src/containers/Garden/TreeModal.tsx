import { Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import treeModal from 'public/images/gardenTreeModal.png';
import { Tree } from './type';
interface Props {
  open: boolean;
  treeDetail: Tree;
  close: () => void;
}
const TreeModal = ({ open, close, treeDetail }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Modal
        className="garden-tree-modal"
        title="Basic Modal"
        open={open}
        onCancel={close}
        footer={false}
      >
        <div className="flex ">
          <div className="flex justify-center items-center relative w-1/3 overflow-hidden rounded-xl aspect-square">
            <Image
              layout="fill"
              src={treeDetail?.imageLinkTreePlantingSite || treeModal}
              alt="Garden Tree Modal"
              objectFit="contain"
              style={{
                filter: "url('#filter-radius')"
              }}
            />
          </div>
          <div className="w-2/3 pl-4">
            <div className="">
              <p className="text-2xl border-b-2 border-white-500 pb-3 font-semibold">
                {treeDetail?.treeName}
              </p>
              <p className="my-3 text-green-28">{treeDetail?.location}</p>
              <div
                className=""
                onClick={() => router.push(`/tree-detail/${treeDetail?.publicCode}`)}
              >
                <button className="bg-green-29 uppercase home__form-btn font-semibold mt-3 py-2 px-4 text-[16px] rounded-full text-center cursor-pointer">
                  ghé thăm cây
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex laptop:items-center mobile:items-start">
            <div className="w-1/4">
              <Image
                src={treeDetail?.imageLinkTreePlantingSite || treeModal}
                alt="Garden Tree Modal"
                width={25}
                height={25}
                layout="responsive"
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-white-500 text-[16px]">{treeDetail?.treeName}</p>
              <p>{treeDetail?.location}</p>
            </div>
          </div>
          <div
            className="flex justify-center"
            onClick={() => router.push(`/tree-detail/${treeDetail?.publicCode}`)}
          >
            <button className="bg-green-29 uppercase home__form-btn font-semibold mt-3 py-2 px-8 text-[16px] rounded-full text-center cursor-pointer">
              ghé thăm cây
            </button>
          </div> */}
        </div>
        <svg
          style={{
            visibility: 'hidden',
          }}
          width="0"
          height="0"
        >
          <defs>
            <filter id="filter-radius">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -50"
                result="mask"
              />
              <feComposite in="SourceGraphic" in2="mask" operator="atop" />
            </filter>
          </defs>
        </svg>
      </Modal>
    </div>
  );
};

export default TreeModal;
