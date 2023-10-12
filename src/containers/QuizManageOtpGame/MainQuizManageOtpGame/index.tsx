/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import logoPana from 'public/images/quiz/quiz-logo-pana.png';
import quizAvatar from 'public/images/quiz/quiz-user.svg';
import { useEffect } from 'react';
import { TOKEN_MANAGE_OTP } from 'src/constant/common';
import { useGetOtpforPGQuery } from 'src/services/quizManage';
import Countdown from './Countdown';

interface MainQuizManageOtpGameProps {
  onToken: (value: string) => void;
}

function MainQuizManageOtpGame(props: MainQuizManageOtpGameProps) {
  const { onToken } = props;
  const { data, refetch, error } = useGetOtpforPGQuery({});
  const router = useRouter();

  useEffect(() => {
    if (error) {
      sessionStorage.removeItem(TOKEN_MANAGE_OTP);
      sessionStorage.removeItem('user_name_pg');
      onToken('');
    }
  }, [error]);
  return (
    <div className="quiz__manageOtp">
      <div className="quiz__manageOtp-top">
        <div className="container-custom h-full">
          <div className="quiz__manageOtp-top-content">
            <div className="quiz__manageOtp-top-img">
              <img src={logoPana.src} alt="" />
            </div>
            <p className="quiz__manageOtp-top-des">Mã TOTP</p>
          </div>
        </div>
      </div>
      <div className="quiz__manageOtp-content">
        <div className="container-custom">
          <div className="quiz__manageOtp-content-top">
            <div className="quiz__manageOtp-content-top-img">
              <img src={quizAvatar.src} alt="" />
            </div>
            <h2 className="quiz__manageOtp-content-top-name">
              {sessionStorage.getItem('user_name_pg') ? sessionStorage.getItem('user_name_pg') : ''}
            </h2>
          </div>
          <div className="quiz__manageOtp-content-bottom">
            <h1 className="quiz__manageOtp-content-bottom-otp">
              <span>{data?.data?.otp?.slice(0, 3)}</span> <span>{data?.data?.otp?.slice(-3)}</span>
            </h1>

            <Countdown refetch={refetch} deadline={data?.data?.timeExpires} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainQuizManageOtpGame;
