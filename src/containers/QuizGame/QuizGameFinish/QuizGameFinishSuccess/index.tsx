/* eslint-disable @next/next/no-img-element */
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import bgAvatar from 'public/images/quiz/quiz-bg-light.png';
import smoothieImg from 'public/images/quiz/quiz-smoothie.png';

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: (siteKey: string, options: ReCaptchaExecuteOptions) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: 'invisible';
}
interface QuizGameFinishSuccessProps {
  gifCode: string;
  isContinue: boolean;
  question: number;
  infoPlayer: any;
  result: number;
  treeCode?: string;
}

function QuizGameFinishSuccess(props: QuizGameFinishSuccessProps) {
  const { gifCode, isContinue, question, result, infoPlayer, treeCode } = props;
  const router = useRouter();

  const handleSubmitForm = () => {
    router.push('/');
  };

  return (
    <article className="quiz__finish">
      <div className="quiz__finish-top">
        <div className="quiz__finish-top-avatar">
          <img src={smoothieImg.src} alt="" />
          <div className="quiz__finish-top-avatar-bg">
            <img src={bgAvatar.src} alt="" />
          </div>
        </div>
      </div>
      <div className="quiz__finish-content">
        <h1 className="quiz__finish-title">Chúc mừng bạn đã chiến thắng</h1>
        <p className="quiz__finish-des">
          Bạn nhận được <span className="quiz__finish-des-gift">1 {gifCode}</span> từ{' '}
          <br className="laptop:hidden tablet:block hidden" />
          Panasonic và góp thành công <br className="laptop:block hidden" />
          <span className="quiz__finish-des-code">1 cây xanh</span>
          <br className="laptop:hidden tablet:block hidden" /> cho rừng vì một Việt Nam xanh khỏe
          mạnh
        </p>{' '}
        <p className="quiz__finish-treeCode">Mã số cây: {treeCode ? treeCode : ''}</p>
        <p className="quiz__finish-link">
          Mời bạn truy cập{' '}
          <Link href={'/'}>
            <a>songkhoegopxanh.com</a>
          </Link>{' '}
          để theo dõi cây
        </p>
        <div className="quiz__question-item-btn quiz__finish-success-btn">
          <Button onClick={handleSubmitForm}>Theo dõi cây</Button>
        </div>
      </div>
    </article>
  );
}

export default QuizGameFinishSuccess;
