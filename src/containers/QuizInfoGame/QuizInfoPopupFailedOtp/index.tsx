/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from 'antd';
import robotFaildImg from 'public/images/quiz/quiz-bg-failed.png';

interface QuizInfoPopupOtpProps {
  show: boolean;
  onClose: () => void;
}

function QuizInfoPopupFailedOtp(props: QuizInfoPopupOtpProps) {
  const { show, onClose } = props;

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
          <img src={robotFaildImg.src} alt="" />
        </div>
        <h3 className="quizVerify__popup-des">
          Mã TOTP Sai <br /> Vui lòng nhập lại mã
        </h3>
        <div className="quizVerify__popup-btn">
          <Button onClick={onClose}>Nhập lại</Button>
        </div>
      </div>
    </Modal>
  );
}

export default QuizInfoPopupFailedOtp;
