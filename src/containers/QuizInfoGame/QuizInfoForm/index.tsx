import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import checkCircle from 'public/icons/check-circle.svg';
import HomePolicy from 'src/containers/home/HomeFormRegister/HomePolicy';
import { useLazySendOtpQuery, useRegisterPlayerMutation } from 'src/services/quiz';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';
import QuizInfoFormPopupOtp from './QuizInfoFormPopupOtp';
import PopupEndGame from 'src/components/PopupEndGame';
import { TOKEN_QUIZ_GAME } from 'src/constant/common';
import { useRouter } from 'next/router';

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

const formatPhoneNumber = (phoneNumber: string) => {
  let phone = '';
  let phoneRegister = '';
  if (phoneNumber?.trim()?.slice(0, 2) === '84') {
    phone = phoneNumber;
    phoneRegister = `0${phoneNumber?.trim()?.slice(2, phoneNumber?.length)}`;
  } else if (phoneNumber?.slice(0, 3) === '+84') {
    phone = `${phoneNumber?.slice(1, phoneNumber?.length)}`;
    phoneRegister = `0${phoneNumber?.trim()?.slice(3, phoneNumber?.length)}`;
  } else {
    phone = `84${phoneNumber?.slice(1, phoneNumber?.length)}`;
    phoneRegister = phone;
  }
  return { phone, phoneRegister };
};

function QuizInfoForm() {
  const [form] = Form.useForm();
  const [visiblePopupOtp, setVisiblePopupOtp] = useState(false);
  const [visiblePopupEndGame, setVisiblePopupEndGame] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [infoPlayer, setInfoPlayer] = useState<any>();
  const router = useRouter();
  const [treeCode, setTreeCode] = useState();
  const [showResendOtp, setShowResendOtp] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.google.com/recaptcha/api.js?render=6LdbPeciAAAAAG_yXb1Rtj5fDNbnNTHzpNAZ-QRY';
    document.body.appendChild(script);
  }, []);

  //API
  const [registerPlayer, { isLoading }] = useRegisterPlayerMutation();
  const [sendOtp, { isLoading: isLoadingSendOtp, isFetching: isFetchingSendOtp }] =
    useLazySendOtpQuery();

  const handleSubmitForm = (value: any) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute('6LdbPeciAAAAAG_yXb1Rtj5fDNbnNTHzpNAZ-QRY', { action: 'login' })
        .then((token: any) => {
          registerPlayer({
            ...value,
            phoneNumber: `0${formatPhoneNumber(value.phoneNumber).phoneRegister.slice(2)}`,
          })
            .unwrap()
            .then((res) => {
              if (res?.data) {
                if (res?.message === 'END_OF_GAME_TODAY') {
                  setTreeCode(res?.data?.treeCode);
                  setVisiblePopupEndGame(true);
                  return;
                }
                sendOtp({ PhoneNumber: formatPhoneNumber(value.phoneNumber).phoneRegister })
                  .then((resOtp) => {
                    setInfoPlayer({
                      fullName: value.fullName,
                      phoneNumber: formatPhoneNumber(value.phoneNumber).phoneRegister,
                      playerId: res.data.id,
                    });
                    const content = JSON.parse(
                      resOtp?.data?.data?.content ? resOtp?.data?.data?.content : '{}'
                    );
                    if (content?.errorCode) {
                      if (content?.errorCode === 'TOO_MANY_OTP') {
                        setShowResendOtp(false);
                        ShowNotify('Lỗi', `${content?.description}`, 'error', 'Đã hiểu', 999999999);
                        return;
                      }
                      if (content?.errorCode === 'API_USER_NOT_CORRECT') {
                        ShowNotify(
                          'Lỗi',
                          `Vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.`,
                          'error',
                          'Đã hiểu',
                          999999999
                        );
                      }
                      return;
                    }

                    setVisiblePopupOtp(!visiblePopupOtp);
                  })
                  .catch((err) => {});
              } else {
                if (res?.message === 'EXCEPTION_ERRO') {
                  ShowNotify(
                    'Lỗi',
                    `Đăng ký tham gia không thành công, bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.`,
                    'error',
                    'Đã hiểu',
                    999999999
                  );
                } else {
                  setVisiblePopupEndGame(true);
                }
              }
            })
            .catch((err: any) => {
              if (err?.status === 401) {
                sessionStorage.removeItem(TOKEN_QUIZ_GAME);
                router.push('/quiz');
                return;
              }

              ShowNotify(
                'Lỗi',
                `Đăng ký tham gia không thành công, bạn vui lòng liên hệ tổng đài 1800 1593 để được trợ giúp.`,
                'error',
                'Đã hiểu',
                999999999
              );
            });
        });
    });
  };

  const handleResendOtp = () => {
    sendOtp({
      PhoneNumber: formatPhoneNumber(form.getFieldValue('phoneNumber')).phoneRegister,
    }).then((resOtp) => {
      const content = JSON.parse(resOtp?.data?.data?.content ? resOtp?.data?.data?.content : '{}');
      if (content?.errorCode) {
        if (content?.errorCode === 'TOO_MANY_OTP') {
          setShowResendOtp(false);
        }
      }
    });
  };

  return (
    <div className="quizVerify__form">
      <h3 className="quizVerify__form-title">Vui lòng nhập thông tin</h3>
      <Form onFinish={handleSubmitForm} form={form} layout="vertical">
        <Form.Item
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên.' }]}
          name="fullName"
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại.' },
            {
              pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
              message: 'Vui lòng nhập đúng định dạng số điện thoại.',
            },
          ]}
          name="phoneNumber"
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Email"
          rules={[
            {
              pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/),
              message: 'Vui lòng nhập đúng định dạng email.',
            },
          ]}
          name="email"
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <div
            onClick={() => setShowPolicy(!showPolicy)}
            className="flex cursor-pointer items-start"
          >
            <span className="flex justify-center items-center">
              <Image src={checkCircle} width={25} height={25} alt="" />
            </span>
            <p className="color-text-e text-base tablet:text-sl ml-3">
              Bằng việc để lại thông tin, bạn đã đồng ý với&nbsp;
              <span className="color-text-green-29 cursor-pointer quizVerify__form-policy">
                điều khoản
              </span>
              &nbsp; của
              <br className="tablet:block hidden" /> chương trình
            </p>
          </div>
        </Form.Item>
        <div className="quizVerify__form-btn">
          <Button loading={isLoading || isLoadingSendOtp || isFetchingSendOtp} htmlType="submit">
            Tham gia chơi game
          </Button>
        </div>
      </Form>
      <QuizInfoFormPopupOtp
        onResendOtp={handleResendOtp}
        show={visiblePopupOtp}
        showResendOtp={showResendOtp}
        infoPlayer={infoPlayer}
        onSetInfoPlayer={() => {
          sessionStorage.setItem('infoPlayer', JSON.stringify({ ...infoPlayer }));
        }}
        onClose={() => setVisiblePopupOtp(!visiblePopupOtp)}
      />
      <HomePolicy show={showPolicy} onClose={() => setShowPolicy(!showPolicy)} />

      <PopupEndGame
        onClose={() => setVisiblePopupEndGame(!visiblePopupEndGame)}
        show={visiblePopupEndGame}
        treeCode={treeCode}
      />
    </div>
  );
}

export default QuizInfoForm;
