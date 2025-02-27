import React, { useState } from 'react';
import {
  Message,
  ButtonsContainer,
  OptionsContainer,
  Error,
} from './style';
import { handleValidity } from '../utils/ValidationForm';
import FieldComponent from '../FieldComponent';
import TitleComponent from '../TittleComponent';
import InputContainerComponent from '../InputContainerComponent';
import EmailIcon from '../icons/EmailIcon';
import Button from '../Button';
import InputComponent from '../InputComponent';


interface PasswordResetFormProps {
  setIsPasswordResetVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordResetForm = ({
  setIsPasswordResetVisible,
}: PasswordResetFormProps) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState<string>('');

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    const userIndex = users.findIndex(
      (user: { email: string }) => user.email === email,
    );

    if (userIndex !== -1) {
      users[userIndex].password = '123456';

      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Senha alterada para 123456');
    } else {
      setMessage('E-mail não encontrado');
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage('');
    setEmailError('');
  };

  return (
    <>
      <TitleComponent>Redefinir a senha</TitleComponent>
      <form method="post" onSubmit={handleResetPassword}>
        <FieldComponent>
          <InputContainerComponent typeErrorMessage={emailError}>
            <InputComponent
              value={email}
              typeErrorMessage={emailError}
              type={'email'}
              placeholder="E-mail"
              required
              onChange={handleEmailChange}
              onInvalid={(e) => handleValidity(e, setEmailError)}
            />
            <EmailIcon color={emailError ? '#F56565' : '#4A5568'} />
          </InputContainerComponent>
          <Error>{emailError}</Error>
          
        </FieldComponent>
        <ButtonsContainer>
          <Button variant='solid' width='100%' type="submit">Redefinir senha</Button>
        </ButtonsContainer>
        {message && <Message>{message}</Message>}
        <OptionsContainer>
          <Button 
            variant="transparent"
            type="button"
            onClick={() => setIsPasswordResetVisible(false)}
          >
            {'Fazer Login'}
          </Button>
        </OptionsContainer>
      </form>
    </>
  );
};

export default PasswordResetForm;
