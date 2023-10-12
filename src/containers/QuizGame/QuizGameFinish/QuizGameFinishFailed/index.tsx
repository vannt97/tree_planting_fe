/* eslint-disable @next/next/no-img-element */
import { Button } from 'antd';
import { useRouter } from 'next/router';
import avatarFailedImg from 'public/images/quiz/quiz-avatar-failed.png';
import bgAvatar from 'public/images/quiz/quiz-bg-light.png';
import { useState } from 'react';
import PopupQuizGameFinishFailed from './PopupQuizGameFinishFailed';
import { TOKEN_QUIZ_GAME } from 'src/constant/common';

interface QuizGameFinishFailedProps {
  gifCode?: string;
  isContinue?: boolean;
  question?: number;
  result?: number;
  infoPlayer: any;
  onCreateTreeCode: () => void;
  onPopupEndGame: (description?: string) => void;
}

function QuizGameFinishFailed(props: QuizGameFinishFailedProps) {
  const { result, question, isContinue, infoPlayer, onCreateTreeCode, onPopupEndGame } = props;
  const router = useRouter();

  const handleYes = () => {
    if (isContinue && sessionStorage.getItem(TOKEN_QUIZ_GAME)) {
      router.push({
        query: {
          type: 'start',
        },
      });
      return;
    }
    onCreateTreeCode();
    onPopupEndGame('Bạn đã hết lượt chơi ngày hôm nay.');
  };

  const handleNo = () => {
    onCreateTreeCode();
  };
  return (
    <div className="quiz__finish">
      <div className="quiz__start-top">
        <div className="quiz__start-top-avatar">
          <img src={avatarFailedImg.src} alt="" />
          <div className="quiz__start-top-avatar-bg">
            <img src={bgAvatar.src} alt="" />
          </div>
        </div>
      </div>
      <div className="quiz__finish-content">
        {' '}
        <p className="quiz__finish-failed-des">
          Bạn đã trả lời đúng{' '}
          <span className="quiz__finish-des-gift">
            {result}/{question}
          </span>{' '}
          câu hỏi.
          <br /> Bạn có muốn chơi lại không?
        </p>
        <div className="quiz__finish-btn">
          <Button onClick={handleYes}>Có</Button>
          <Button onClick={handleNo}>Không</Button>
        </div>
      </div>
    </div>
  );
}

export default QuizGameFinishFailed;
