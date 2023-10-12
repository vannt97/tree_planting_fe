import Seo from "src/components/Seo";
import QuizManageOtpGame from "src/containers/QuizManageOtpGame";
import quizBg from "public/images/quiz/quiz-seo.png";

function QuizManageOtp() {
  return (
    <>
      <Seo
        description="Tham gia thử thách Sống khỏe - Hè vui cùng Panasonic"
        thumnail={quizBg.src}
        title="TOTP"
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/quiz/manage-otp`}
      />
      <QuizManageOtpGame />
    </>
  );
}

export default QuizManageOtp;
