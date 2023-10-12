import { useGetResultQuery, useLazyCreateTreeCodeQuery } from 'src/services/quiz';
import QuizGameFinishFailed from './QuizGameFinishFailed';
import QuizGameFinishSuccess from './QuizGameFinishSuccess';
import { useEffect, useRef, useState } from 'react';
import TreeShareFacebook from 'src/components/TreeShareComp/TreeShareFacebook';
import CertificateComponentShare from 'src/components/CertificateComponent/CertificateComponentShare';
import moment from 'moment';
import * as htmlToImage from 'html-to-image';
import { usePostLoginMutation } from 'src/services/home';
import { usePostCreateTreeInfoMutation } from 'src/services/greenNews';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';
import Loader from 'src/components/Loader';
import { useRouter } from 'next/router';
import { TOKEN_QUIZ_GAME } from 'src/constant/common';
import PopupEndGame from 'src/components/PopupEndGame';

function QuizGameFinish() {
  const { data, isError } = useGetResultQuery({
    PlayerQuestionGroupId: JSON.parse(sessionStorage.getItem('infoPlayer') || '{}')
      .playerQuestionGroupId,
  });
  const [visiblePopupEndGame, setVisiblePopupEndGame] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [infoPlayer, setInfoPlayer] = useState<any>();
  const [infoTree, setInfoTree] = useState<any>();

  const router = useRouter();

  //API
  const [createTreeCode, { isLoading }] = useLazyCreateTreeCodeQuery();
  const [postCreateTreeInfo] = usePostCreateTreeInfoMutation();
  const [onLogin, { isSuccess }] = usePostLoginMutation();

  useEffect(() => {
    if (sessionStorage.getItem('infoPlayer')) {
      setInfoPlayer(JSON.parse(sessionStorage.getItem('infoPlayer')));
    }
  }, []);

  useEffect(() => {
    if (data?.data?.result && data?.data?.result >= 3 && sessionStorage.getItem(TOKEN_QUIZ_GAME)) {
      handleCreateTreeCode();
    }
  }, [data]);

  const handleCreateTreeCode = () => {
    setLoading(true);
    if (infoTree?.treeCode) {
      setLoading(false);
      if (data?.data?.result && data?.data?.result >= 3) {
        return;
      }
      setVisiblePopupEndGame(true);
      return;
    }
    createTreeCode({ playerQuestionGroupId: infoPlayer?.playerQuestionGroupId })
      .then((res) => {
        if (res?.data) {
          if (res?.data?.data?.treeCode) {
            setLoading(false);
            setInfoTree({ ...res?.data?.data?.treeInfo, treeCode: res?.data?.data?.treeCode });

            sessionStorage.removeItem(TOKEN_QUIZ_GAME);
            sessionStorage.removeItem('infoPlayer');

            if (data?.data?.result && data?.data?.result >= 3) {
              return;
            }

            setVisiblePopupEndGame(true);
          }
        } else {
          setLoading(false);
          ShowNotify(
            'Lỗi',
            `Bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.`,
            'error',
            'Đã hiểu',
            999999999
          );
        }
      })
      .catch((err: any) => {
        setLoading(false);
        ShowNotify(
          'Lỗi',
          `Bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.`,
          'error',
          'Đã hiểu',
          999999999
        );
      });
  };

  const handleShowPopupEndGame = (description?: string) => {
    setDescription(description ? description : '');
  };

  return (
    <>
      {(data?.data?.result || data?.data?.result === 0) && data?.data?.result >= 3 ? (
        <QuizGameFinishSuccess
          gifCode={data?.data?.gifName}
          isContinue={data?.data?.isContinue}
          question={data?.data?.question}
          infoPlayer={infoPlayer}
          result={data?.data?.result}
          treeCode={infoTree?.treeCode || ''}
        />
      ) : (
        ''
      )}

      <Loader loading={loading} />
      {(data?.data?.result || data?.data?.result === 0) && data?.data?.result < 3 ? (
        <QuizGameFinishFailed
          gifCode={data?.data?.gifName}
          isContinue={data?.data?.isContinue}
          question={data?.data?.question}
          infoPlayer={infoPlayer}
          result={data?.data?.result}
          onPopupEndGame={(description) => handleShowPopupEndGame(description)}
          onCreateTreeCode={handleCreateTreeCode}
        />
      ) : (
        ''
      )}

      <PopupEndGame
        show={visiblePopupEndGame}
        onClose={() => setVisiblePopupEndGame(false)}
        description={description}
        treeCode={infoTree?.treeCode || ''}
      />
    </>
  );
}

export default QuizGameFinish;
