import { Modal } from 'antd';

export default function ModalMaintaince({ setShowModal, isShowModal }) {
  return (
    <Modal
      className="home__follow-maintenance relative"
      footer={null}
      onCancel={() => {
        setShowModal(false);
      }}
      width={480}
      centered={true}
      open={isShowModal}
    >
      <div className="text-sl tablet:text-1xl relative z-1 text-center  ">
        <p className="">*Hiện tại hệ thống đang được hoàn thiện.</p>
        <p className="mb-3 whitespace-nowrap">Mời bạn quay lại thăm cây vào ngày 10/11/2023 nhé.</p>
        <p>Chúng tôi xin lỗi về sự bất tiện này.*</p>
      </div>
    </Modal>
  );
}
