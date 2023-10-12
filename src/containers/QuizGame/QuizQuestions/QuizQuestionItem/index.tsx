import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAnswerQuestionMutation } from 'src/services/quiz';

interface QuestionItemProps {
  data: any;
  refecthData: () => void;
}

const dislayAnswer = ['A', 'B', 'C', 'D'];
/* eslint-disable @next/next/no-img-element */
function QuizQuestionItem(props: QuestionItemProps) {
  const { data, refecthData } = props;
  //API
  const [postAnswer, { isLoading }] = useAnswerQuestionMutation();

  const [selected, setSelected] = useState<string>();
  const [resultAnswer, setResultAnswer] = useState<string>();
  const [nextQuestion, setNextQuestion] = useState<string>();
  const [infoPlayer, setInfoPlayer] = useState<any>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('infoPlayer')) {
      setInfoPlayer(JSON.parse(sessionStorage.getItem('infoPlayer')));
    }
  }, []);

  const handleSubmitAnswer = () => {
    if (isCompleted) {
      router.push({
        query: { type: 'finish' },
      });
      return;
    }
    if (selected) {
      if (resultAnswer) {
        setSelected('');
        setResultAnswer('');
        const questionInfo = JSON.parse(sessionStorage.getItem('infoPlayer'));
        questionInfo.playerQuestionId = nextQuestion;
        questionInfo.currentQuestion = questionInfo.currentQuestion + 1;
        setInfoPlayer(questionInfo);
        sessionStorage.setItem('infoPlayer', JSON.stringify(questionInfo));
        refecthData();
      } else {
        postAnswer({
          playerAnswerId: selected,
          playerQuestionGroupId: infoPlayer?.playerQuestionGroupId,
          playerQuestionId: data?.id,
        })
          .unwrap()
          .then((res) => {
            setResultAnswer(res?.data?.resultAnswer);
            setNextQuestion(res?.data?.playerQuestionId);
            if (!res?.data?.playerQuestionId) {
              setIsCompleted(true);
            }
          });
      }
    }
  };

  return (
    <div className="quiz__question-item">
      <div className="quiz__question-item-top">
        <h3 className="quiz__question-title">
          Question{' '}
          {`0${
            infoPlayer?.currentQuestion && Number(infoPlayer?.currentQuestion) >= 5
              ? '5'
              : infoPlayer?.currentQuestion
          }`}
          /05
        </h3>
        <h3 className="quiz__question-item-title">{data?.content}?</h3>
        <div className="quiz__question-item-img">
          <img src={data?.linkUrl} alt="" />
        </div>
      </div>
      <div className="quiz__question-item-results-wrapper">
        {data?.questionAnswers?.map((item: any, index: number) => (
          <div
            key={item?.id}
            onClick={() => {
              if (resultAnswer) return;
              setSelected(item?.id);
            }}
            className={`quiz__question-item-results-item ${
              selected === item?.id ? 'selected' : ''
            } ${resultAnswer === item?.id ? 'right' : ''} ${
              selected === item?.id && resultAnswer && resultAnswer !== item?.id ? 'wrong' : ''
            }`}
          >
            <h5 className="quiz__question-item-results-item-number">{dislayAnswer[index]}</h5>
            <div className="quiz__question-item-results-item-content">
              <h5 className="quiz__question-item-results-item-text">{item?.content}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className="quiz__question-item-btn">
        <Button loading={isLoading} disabled={!selected} onClick={handleSubmitAnswer}>
          {resultAnswer
            ? infoPlayer?.currentQuestion === 5
              ? 'Hoàn thành'
              : 'Câu tiếp theo'
            : 'Kiểm tra'}
        </Button>
      </div>
    </div>
  );
}

export default QuizQuestionItem;
