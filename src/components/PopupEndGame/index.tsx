/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import robotFailedImg from 'public/images/quiz/quiz-bg-failed.png';
import { useState } from 'react';

interface PopupEndGameProps {
  show: boolean;
  description?: string;
  treeCode?: string;
  onClose: () => void;
}

function PopupEndGame(props: PopupEndGameProps) {
  const { show, onClose, description = 'Bạn đã hết lượt chơi ngày hôm nay.', treeCode } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async () => {
    router.push('/');
  };

  return (
    <Modal
      className="quizVerify__popup"
      visible={show}
      centered
      width={'400px'}
      onCancel={onClose}
      footer={null}
      closeIcon={<span></span>}
    >
      <div className="quizVerify__popup-wrapper">
        <div className="quizVerify__popup-img">
          <img src={robotFailedImg.src} alt="" />
        </div>
        <h2 className="quizVerify__popup-des quiz__finish-popup-title">Rất tiếc.</h2>
        <h3 className="quizVerify__popup-des quiz__finish-popup-des">{description}</h3>
        {treeCode ? (
          <>
            <h3 className="quizVerify__popup-des quiz__finish-popup-des">
              Cảm ơn bạn đã tham gia chương trình và góp thành công{' '}
              <span className="quizVerify__popup-des quiz__finish-popup-des-green">1 cây xanh</span>{' '}
              cho rừng Việt Nam xanh khỏe mạnh.
            </h3>
            <h3 className="quizVerify__popup-des quiz__finish-popup-treeCode">
              Mã số: <span>{treeCode ? treeCode : ''}</span>
            </h3>
            <p className="quizVerify__popup-link quiz__finish-popup-link">
              Mời bạn truy cập{' '}
              <Link href={'/'}>
                <a>songkhoegopxanh</a>
              </Link>{' '}
              để <br /> theo dõi cây
            </p>

            <div className="quizVerify__popup-btn">
              <Button onClick={handleSubmitForm}>Theo dõi cây</Button>
            </div>
          </>
        ) : (
          <span></span>
        )}
      </div>
    </Modal>
  );
}

export default PopupEndGame;
