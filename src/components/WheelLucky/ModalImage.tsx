import { Modal } from 'antd';
import React from 'react';
import imageReward from 'public/images/imageReward.png';
import Image from 'next/image';
const ModalImage = ({ open, onClose }) => {
  return (
    <Modal
      closable={true}
      onCancel={onClose}
      open={open}
      footer={false}
      className="p-0 modal-image"
      centered
    >
      <img src={imageReward.src} alt="Reward Image" />
    </Modal>
  );
};

export default ModalImage;
