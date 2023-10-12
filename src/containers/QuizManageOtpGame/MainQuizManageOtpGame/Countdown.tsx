import React, { useState, useEffect } from 'react';

interface Props {
  deadline: string;
  refetch: () => void;
}

const Countdown: React.FC<Props> = ({ deadline, refetch }) => {
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
        refetch();
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

  return (
    <div>
      <div className="quiz__manageOtp-content-bottom-time">
        <div className="quiz__manageOtp-content-bottom-time-number">
          {remainingTime.minutes && remainingTime.minutes.length > 1
            ? remainingTime.minutes.slice(0, 1)
            : '0'}
        </div>
        <div className="quiz__manageOtp-content-bottom-time-number">
          {remainingTime.minutes && remainingTime.minutes.length > 1
            ? remainingTime.minutes.slice(1)
            : remainingTime.minutes}
        </div>
        <div className="quiz__manageOtp-content-bottom-time-dot">:</div>
        <div className="quiz__manageOtp-content-bottom-time-number">
          {remainingTime.seconds && remainingTime.seconds.length > 1
            ? remainingTime.seconds.slice(0, 1)
            : '0'}
        </div>
        <div className="quiz__manageOtp-content-bottom-time-number">
          {remainingTime.seconds && remainingTime.seconds.length > 1
            ? remainingTime.seconds.slice(1)
            : remainingTime.seconds}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
