import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import QuizGameFinish from './QuizGameFinish';
import QuizGameStart from './QuizGameStart';
import QuizQuestions from './QuizQuestions';

function QuizGame() {
  const router = useRouter();
  const [infoPlayer, setInfoPlayer] = useState<any>();

  useEffect(() => {
    if (sessionStorage.getItem('infoPlayer')) {
      setInfoPlayer(JSON.parse(sessionStorage.getItem('infoPlayer')));
    }
  }, []);

  return (
    <section className="quiz">
      {infoPlayer?.playerId && (
        <div className="container-custom w-full">
          {router.query?.type === 'start' && <QuizGameStart />}
          {router.query?.type === 'questions' && <QuizQuestions />}
          {router.query?.type === 'finish' && <QuizGameFinish />}
        </div>
      )}
    </section>
  );
}

export default QuizGame;
