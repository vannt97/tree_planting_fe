import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "src/components/Seo";
import { TOKEN_QUIZ_GAME } from "src/constant/common";
import QuizGame from "src/containers/QuizGame";
import quizBg from "public/images/quiz/quiz-seo.png";

function QuizQuestion() {
  const [tokenQuizGame, setTokenQuizGame] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN_QUIZ_GAME) && sessionStorage.getItem("infoPlayer")) {
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
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/quiz/manage-otp`}
      />
      <div>{tokenQuizGame ? <QuizGame /> : ""}</div>
    </>
  );
}

export default QuizQuestion;
