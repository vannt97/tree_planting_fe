import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TOKEN_QUIZ_GAME } from "src/constant/common";
import QuizInfoGame from "src/containers/QuizInfoGame";
import quizBg from "public/images/quiz/quiz-seo.png";
import Seo from "src/components/Seo";

function QuizInfo() {
  const [tokenQuizGame, setTokenQuizGame] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN_QUIZ_GAME)) {
      setTokenQuizGame(sessionStorage.getItem(TOKEN_QUIZ_GAME));
    } else {
      router.push("/quiz");
      setTokenQuizGame(null);
    }
  }, []);

  return (
    <>
      <Seo
        description="Tham gia thử thách Sống khỏe - Hè vui cùng Panasonic"
        thumnail={quizBg.src}
        title="Quiz"
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/quiz/info`}
      />
      <div>{tokenQuizGame ? <QuizInfoGame /> : ""}</div>
    </>
  );
}

export default QuizInfo;
