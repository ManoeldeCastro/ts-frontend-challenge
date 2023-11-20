import { useState } from 'react';
import { loginUser } from '../../services/apiService';
import {
  Input,
  Error,
  ButtonsContainer,
  LoginButton,
  ForgotButton,
  OptionsContainer,
  New,
  Register,
  LoginMessage,
} from './style';
import { handleValidity } from '../utils/ValidationForm';
import { updateInputValue } from '../utils/HandleChange';
import FieldComponent from '../FieldComponent';
import TitleComponent from '../TittleComponent';
import InputContainerComponent from '../InputContainerComponent';
import PasswordIconComponent from '../icons/PasswordIcon';
import UserIconComponent from '../icons/UserIcon';

interface LoginFormProps {
  title: string;
  forgot: string;
  register: string;
  registerCall: string;
  loginCall: string;
  setIsRegisterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPasswordResetVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({
  title,
  forgot,
  register,
  registerCall,
  loginCall,
  setIsRegisterVisible,
  setIsPasswordResetVisible,
}: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');


  const handleLogin = async () => {
    const users = [
      {
        email,
        password,
      },
    ];

    try {
      const results = await loginUser(users);
      const firstResult = results[0];

      if (firstResult?.success) {
        setLoginMessage('Login realizado com sucesso.');
      } else {
        setLoginMessage('Login inválido. Por favor, verifique suas credenciais.');
      }

    } catch (error) {
      console.error('Error during login:', error);

      setLoginMessage('Ocorreu um erro ao tentar fazer login.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <TitleComponent>{title}</TitleComponent>
      <form method="post" onSubmit={handleSubmit}>
        <FieldComponent>
          <InputContainerComponent typeErrorMessage={emailError}>
            <Input
              value={email}
              typeErrorMessage={emailError}
              type={'email'}
              placeholder="E-mail"
              required
              onChange={(e: React.InvalidEvent<HTMLInputElement>) =>
                updateInputValue(e, setEmail)
              }
              onInvalid={(e: React.InvalidEvent<HTMLInputElement>) =>
                handleValidity(e, setEmailError)
              }
            />
            <UserIconComponent color={emailError ? '#F56565' : '#4A5568'}/>
          </InputContainerComponent>
          <Error>{emailError}</Error>
        </FieldComponent>

        <FieldComponent>
          <InputContainerComponent typeErrorMessage={passwordError}>
            <Input
              value={password}
              typeErrorMessage={passwordError}
              type="password"
              placeholder="Senha"
              required
              onChange={(e) =>
                updateInputValue(e, setPassword)
              }
              onInvalid={(e) =>
                handleValidity(e, setPasswordError)
              }
            />
            <PasswordIconComponent color={passwordError ? '#F56565' : '#4A5568'}/>
          </InputContainerComponent>
          <Error>{passwordError}</Error>
          {<LoginMessage>{loginMessage}</LoginMessage>}
        </FieldComponent>
        <ButtonsContainer>
          <ForgotButton type="button" onClick={() => setIsPasswordResetVisible(true)}>{forgot}</ForgotButton>
          <LoginButton type="submit">{loginCall}</LoginButton>
        </ButtonsContainer>
      </form>
      <OptionsContainer onClick={() => setIsRegisterVisible(true)}>
        <New>{register}</New>
        <Register type="button">{registerCall}</Register>
      </OptionsContainer>
    </>
  );
};

export default LoginForm;
