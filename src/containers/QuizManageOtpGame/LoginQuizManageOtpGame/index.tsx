import { Button, Form, Input } from 'antd';
import { TOKEN_MANAGE_OTP } from 'src/constant/common';
import { useLoginForPgManageOtpMutation } from 'src/services/auth';
import { ShowNotify } from 'src/utils/helpers/ShowNotify';

interface LoginQuizManageOtpGameProps {
  onToken: (token: string) => void;
}
function LoginQuizManageOtpGame(props: LoginQuizManageOtpGameProps) {
  const { onToken } = props;
  const [form] = Form.useForm();
  const [loginPg, { isLoading }] = useLoginForPgManageOtpMutation();

  const handleSubmitForm = async (value: any) => {
    try {
      const response = await loginPg({ password: value.password, userName: value.email }).unwrap();
      if (response?.data) {
        const token = response?.data?.token;
        sessionStorage.setItem(TOKEN_MANAGE_OTP, token);
        sessionStorage.setItem('user_name_pg', value.email);
        onToken(token);
      }
    } catch (err: any) {
      ShowNotify(
        'Đăng nhập thất bại!',
        `Tài khoản hoặc mật khẩu không chính xác.`,
        'error',
        'Đã hiểu',
        999999999
      );
    }
  };

  return (
    <div className="quiz home">
      <div className="quiz__login quizVerify__form">
        <div className="quizVerify__logo quiz__login-logo">
          <div className="quizVerify__logo-content quiz__login-logo-content">
            <div className="quizVerify__logo-content-bg quiz__login-logo-content-bg"></div>
          </div>
        </div>
        <h2 className="quiz__login-title">Đăng Nhập</h2>
        <Form onFinish={handleSubmitForm} form={form} layout="vertical">
          <Form.Item
            rules={[
              { required: true, message: 'Vui lòng nhập email.' },
              {
                pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/),
                message: 'Vui lòng nhập đúng định dạng email.',
              },
            ]}
            label="Email"
            name={'email'}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.' }]}
            label="Mật khẩu"
            name={'password'}
          >
            <Input type="password" />
          </Form.Item>
          <div className="quizVerify__form-btn">
            <Button loading={isLoading} htmlType="submit">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginQuizManageOtpGame;
