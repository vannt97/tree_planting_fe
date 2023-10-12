/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import mailImg from 'public/images/quiz/quiz-tree.png';
import { useState } from 'react';
import PinInput from 'react-pin-input';
import { useLazyVerifyOtpQuery } from 'src/services/quiz';
import QuizVerifyPopupFailedOtp from '../../QuizInfoPopupFailedOtp';
import Countdown from './Countdown';

interface QuizInfoFormPopupOtpProps {
  show: boolean;
  onClose: () => void;
  onResendOtp: () => void;
  onSetInfoPlayer: () => void;
  infoPlayer: any;
  showResendOtp: boolean;
}
function QuizInfoFormPopupOtp(props: QuizInfoFormPopupOtpProps) {
  const { show, onClose, onResendOtp, onSetInfoPlayer, infoPlayer, showResendOtp } = props;
  const [showPopupFailed, setShowPopupFailed] = useState(false);
  const [otp, setOtp] = useState('');
  const [timerOtp, setTimerOtp] = useState<any>();
  const router = useRouter();
  //API
  const [verifyOtp, { isLoading }] = useLazyVerifyOtpQuery();

  const handleSubmitOtp = () => {
    verifyOtp({ OTP: otp, PhoneNumber: infoPlayer?.phoneNumber })
      .then((res: any) => {
        const content = JSON.parse(res?.data?.data?.content ? res?.data?.data?.content : '{}');
        if (
          content?.errorCode === 'OTP_NOT_VALID' ||
          content?.errorCode === 'INVALID_OTP_NUMBER' ||
          content?.errorCode === 'API_USER_NOT_CORRECT' ||
          res?.data?.message === 'PHONE_NUMBER_NOT_FOUND' ||
          res?.error?.error
        ) {
          setShowPopupFailed(!showPopupFailed);
          return;
        }
        onSetInfoPlayer();
        router.push('/quiz/question?type=start');
      })
      .catch((err) => {
        setShowPopupFailed(!showPopupFailed);
      });
  };

  const handleResendOtp = () => {
    onResendOtp();
    setTimerOtp(moment().add('minutes', 1).toString());
  };

  return (
    <>
      <Modal
        className="quizVerify__popup"
        visible={show}
        centered
        width={'400px'}
        footer={null}
        closeIcon={<span></span>}
      >
        <div className="quizVerify__popup-wrapper">
          <div className="quizVerify__popup-img">
            <img src={mailImg.src} alt="" />
          </div>
          <h3 className="quizVerify__popup-title">Xác thực thông tin</h3>
          <h3 className="quizVerify__popup-des">
            Bạn vui lòng nhập mã OTP đã được gửi đến số điện thoại nhé
          </h3>
          <PinInput
            length={6}
            initialValue=""
            type="numeric"
            onChange={(value: any) => {
              setOtp(value);
            }}
            inputMode="number"
            placeholder={'0'}
            style={{ padding: '10px 7px' }}
            onComplete={(value: any, index: number) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          {showResendOtp && (
            <Countdown
              deadline={timerOtp ? timerOtp : moment().add('minutes', 1).toString()}
              onResendOtp={handleResendOtp}
            />
          )}

          <div className="quizVerify__popup-btn">
            <Button disabled={otp.length < 6} loading={isLoading} onClick={handleSubmitOtp}>
              Chơi game ngay
            </Button>
          </div>
        </div>
      </Modal>
      <QuizVerifyPopupFailedOtp
        show={showPopupFailed}
        onClose={() => setShowPopupFailed(!showPopupFailed)}
      />
    </>
  );
}

export default QuizInfoFormPopupOtp;
