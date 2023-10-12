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
        <div>
          <div className="flex laptop:items-center mobile:items-start">
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
              <p className="font-semibold text-green-primary text-[16px]">{treeDetail?.treeName}</p>
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TreeModal;
