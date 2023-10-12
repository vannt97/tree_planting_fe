import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TOKEN_QUIZ_GAME } from 'src/constant/common';
import { useGetQuestionQuery } from 'src/services/quiz';
import QuizQuestionItem from './QuizQuestionItem';

function QuizQuestions() {
  const { data, refetch, isError, error } = useGetQuestionQuery({
    PlayerQuestionId: JSON.parse(sessionStorage.getItem('infoPlayer') || '{}').playerQuestionId,
  });
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      sessionStorage.removeItem(TOKEN_QUIZ_GAME);
      router.push({
        pathname: '/quiz',
      });
    }
  }, [error]);
  return (
    <article className="quiz__question">
      {data && <QuizQuestionItem refecthData={refetch} data={data} />}
    </article>
  );
}

export default QuizQuestions;
