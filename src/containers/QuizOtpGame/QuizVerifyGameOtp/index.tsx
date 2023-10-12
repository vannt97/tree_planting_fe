/* eslint-disable @next/next/no-img-element */
import { Button } from 'antd';
import { useState } from 'react';
import PinInput from 'react-pin-input';
import { useRouter } from 'next/router';
import { useLazyVerifyTOTPQuizgameQuery } from 'src/services/auth';
import QuizInfoPopupFailedOtp from 'src/containers/QuizInfoGame/QuizInfoPopupFailedOtp';
import { TOKEN_QUIZ_GAME } from 'src/constant/common';

function QuizVerifyGameOtp() {
  const [visibleModalFailed, setVisibleModalFailed] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  //API
  const [verifyOtp, { isLoading, isFetching }] = useLazyVerifyTOTPQuizgameQuery();

  const handleSubmitOtp = async () => {
    try {
      const response = await verifyOtp({ OTP: otp });
      if (response?.data?.data) {
        sessionStorage.setItem(TOKEN_QUIZ_GAME, response?.data?.data?.accessToken);
        router.push('/quiz/info');
      } else {
        setVisibleModalFailed(!visibleModalFailed);
      }
    } catch (err: any) {
      setVisibleModalFailed(!visibleModalFailed);
    }
  };

  return (
    <>
      <div className="quizVerify__wrapper">
        <div className="quizVerify__logo">
          <div className="quizVerify__logo-content">
            <div className="quizVerify__logo-content-bg"></div>
          </div>
        </div>
        <h3 className="quizVerify__title">
          Chào mừng bạn tham gia thử thách <br />
          <span className="quizVerify__title-large">Sống khỏe - Hè vui</span>
          <br /> cùng Panasonic
        </h3>
        <p className="quizVerify__des">
          Vui lòng nhập mã TOTP từ PG để
          <br className="laptop:hidden block" /> tham gia game nhé!
        </p>
        <PinInput
          length={6}
          initialValue={''}
          type="numeric"
          onChange={(value: any) => {
            setOtp(value);
          }}
          inputMode="number"
          placeholder={'0'}
          onComplete={(value: any, index: number) => {}}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        <div className="quizVerify__btn">
          <Button
            loading={isLoading || isFetching}
            disabled={otp.length < 6}
            onClick={handleSubmitOtp}
          >
            Tham gia chơi game
          </Button>
        </div>
      </div>
      <QuizInfoPopupFailedOtp
        show={visibleModalFailed}
        onClose={() => setVisibleModalFailed(!visibleModalFailed)}
      />
    </>
  );
}

export default QuizVerifyGameOtp;
