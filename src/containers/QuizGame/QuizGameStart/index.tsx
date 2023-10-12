/* eslint-disable @next/next/no-img-element */
import { Button } from 'antd';
import { useRouter } from 'next/router';
import avatarQuiz from 'public/images/quiz/quiz-avatar.png';
import bgAvatar from 'public/images/quiz/quiz-bg-light.png';
import { useEffect, useState } from 'react';
import PopupEndGame from 'src/components/PopupEndGame';
import { useGamePlayMutation } from 'src/services/quiz';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';

function QuizGameStart() {
  const [infoPlayer, setInfoPlayer] = useState<any>();
  const [visibleEndGame, setVisibleEndGame] = useState(false);
  const router = useRouter();
  const [treeCode, setTreeCode] = useState('');

  //API
  const [startGame, { isLoading }] = useGamePlayMutation();

  useEffect(() => {
    if (sessionStorage.getItem('infoPlayer')) {
      setInfoPlayer(JSON.parse(sessionStorage.getItem('infoPlayer')));
    }
  }, []);

  const handleStartGame = () => {
    startGame({ playerId: infoPlayer?.playerId })
      .unwrap()
      .then((res) => {
        console.log('Res: ', res);
        if (res?.data) {
          if (res?.message === 'END_OF_GAME_TODAY') {
            setTreeCode(res?.data?.treeCode);
            setVisibleEndGame(true);
            return;
          }
          const questionInfo = JSON.parse(sessionStorage.getItem('infoPlayer'));
          questionInfo.playerQuestionGroupId = res?.data?.playerQuestionGroupId;
          questionInfo.playerQuestionId = res?.data?.playerQuestionId;
          questionInfo.currentQuestion = 1;
          sessionStorage.setItem('infoPlayer', JSON.stringify(questionInfo));
          router.push({
            query: {
              type: 'questions',
            },
          });
        } else {
          setVisibleEndGame(true);
        }
      })
      .catch((err: any) => {
        ShowNotify(
          'Lỗi',
          `Bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.`,
          'error',
          'Đã hiểu',
          999999999
        );
      });
  };

  return (
    <div className="quiz__start">
      <div className="quiz__start-top">
        <div className="quiz__start-top-avatar">
          <img src={avatarQuiz.src} alt="" />
          <div className="quiz__start-top-avatar-bg">
            <img src={bgAvatar.src} alt="" />
          </div>
        </div>
      </div>
      <h3 className="quiz__start-title">
        Chào mừng bạn: <br className="laptop:hidden block" />
        <span className="quiz__start-title-name">{infoPlayer?.fullName}</span>
        <br /> tham gia thử thách <br /> Sống khỏe - Hè vui
      </h3>
      <div className="quiz__start-btn">
        <Button onClick={handleStartGame}>Vào chơi ngay</Button>
      </div>

      <PopupEndGame
        treeCode={treeCode}
        show={visibleEndGame}
        onClose={() => setVisibleEndGame(!visibleEndGame)}
      />
    </div>
  );
}

export default QuizGameStart;
