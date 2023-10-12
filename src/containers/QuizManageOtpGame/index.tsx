/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TOKEN_MANAGE_OTP } from 'src/constant/common';
import LoginQuizManageOtpGame from './LoginQuizManageOtpGame';
import MainQuizManageOtpGame from './MainQuizManageOtpGame';

function QuizManageOtpGame() {
  const [tokenOtp, setTokenOtp] = useState<any>();

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN_MANAGE_OTP)) {
      setTokenOtp(sessionStorage.getItem(TOKEN_MANAGE_OTP));
    } else {
      setTokenOtp(null);
    }
  }, []);

  return (
    <div className="">
      {tokenOtp === null && <LoginQuizManageOtpGame onToken={(token) => setTokenOtp(token)} />}

      {tokenOtp && <MainQuizManageOtpGame onToken={(token) => setTokenOtp(token)} />}
    </div>
  );
}

export default QuizManageOtpGame;
