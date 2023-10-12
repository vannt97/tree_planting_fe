import React, { useState, useEffect } from 'react';

interface Props {
  deadline: string;
  onResendOtp: () => void;
}

const Countdown: React.FC<Props> = ({ deadline, onResendOtp }) => {
  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    if (deadline) {
      let timeLeft = new Date(deadline).getTime() - new Date().getTime();
      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      let seconds = Math.floor((timeLeft / 1000) % 60);

      const timers = {
        days: String(days),
        hours: String(hours),
        minutes: String(minutes),
        seconds: String(seconds),
      };

      if (Number(timers.seconds) <= 0) {
        return {
          days: '0',
          hours: '0',
          minutes: '0',
          seconds: '0',
        };
      }
      return {
        days: String(days),
        hours: String(hours),
        minutes: String(minutes),
        seconds: String(seconds),
      };
    } else {
      return {
        days: String(0),
        hours: String(0),
        minutes: String(0),
        seconds: String(0),
      };
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [deadline]);

  const handleResend = () => {
    if (Number(remainingTime.minutes) <= 0 && Number(remainingTime.seconds) <= 0) {
      onResendOtp();
    }
  };

  return (
    <>
      <div className="quizverify__popup-time">
        <span className="quizverify__popup-time-text">
          Gửi lại mã OTP trong vòng{' '}
          <span className="quizverify__popup-time-number">
            {remainingTime.minutes && remainingTime.minutes.length > 1
              ? remainingTime.minutes.slice(0, 1)
              : '0'}
            {remainingTime.minutes && remainingTime.minutes.length > 1
              ? remainingTime.minutes.slice(1)
              : remainingTime.minutes}
            {':'}
            {remainingTime.seconds && remainingTime.seconds.length > 1
              ? remainingTime.seconds.slice(0, 1)
              : '0'}
            {remainingTime.seconds && remainingTime.seconds.length > 1
              ? remainingTime.seconds.slice(1)
              : remainingTime.seconds}
          </span>
        </span>
      </div>
      <div className="quizVerify__popup-resend">
        <span
          onClick={handleResend}
          className={`${
            Number(remainingTime.minutes) <= 0 && Number(remainingTime.seconds) <= 0
              ? ''
              : 'disabled'
          } `}
        >
          Gửi lại mã
        </span>
      </div>
    </>
  );
};

export default Countdown;
