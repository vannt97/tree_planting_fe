import Seo from "src/components/Seo";
import QuizOtpGame from "src/containers/QuizOtpGame";
import quizBg from "public/images/quiz/quiz-seo.png";

function Quiz() {
  return (
    <>
      <Seo
        description="Tham gia thử thách Sống khỏe - Hè vui cùng Panasonic"
        thumnail={quizBg.src}
        title="Quiz"
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/quiz`}
      />
      <QuizOtpGame />
    </>
  );
}

export default Quiz;
