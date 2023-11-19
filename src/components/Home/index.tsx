import { useEffect, useState } from 'react';
import { fetchInfo } from '../../services/apiService';
import Banner from '../Banner';
import { Container, HomeContainer, Wrapper } from './style';
import PasswordResetForm from '../PasswordResetForm';
import NewUserForm from '../NewUserForm';
import LoginForm from '../LoginForm';

const Home = () => {
  const [homeInfo, setHomeInfo] = useState({
    logoDesktop: '',
    slogan: '',
    subtitle: '',
    callAction: '',
    logoMobile: '',
    loginTitle: '',
    loginForgot: '',
    loginRegister: '',
    loginRegisterCall: '',
    loginCall: '',
  });

  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState<boolean>(false);


  useEffect(() => {
    const getHomeInfo = async () => {
      const data = await fetchInfo();
      if (data) {
        setHomeInfo({
          logoDesktop: data?.images?.logo,
          slogan: data?.texts?.slogan,
          subtitle: data?.texts?.subtitle,
          callAction: data?.texts?.call_action,
          logoMobile: data?.images?.logo_mobile,
          loginTitle: data?.texts?.section_login?.title,
          loginForgot: data?.texts?.section_login?.forgot,
          loginRegister: data?.texts?.section_login?.register,
          loginRegisterCall: data?.texts?.section_login?.register_call,
          loginCall: data?.texts?.section_login?.login_call,
        });
      }
    };
    getHomeInfo();
  }, []);

  return (
    <HomeContainer>
      <Banner
        subtitle={homeInfo.subtitle}
        slogan={homeInfo.slogan}
        callAction={homeInfo.callAction}
        logoDesktop={homeInfo.logoDesktop}
        logoMobile={homeInfo.logoMobile}
      />
      <Wrapper>
        <Container>
          {isPasswordResetVisible ? (
            <PasswordResetForm setIsPasswordResetVisible={setIsPasswordResetVisible}/>
          ) : isRegisterVisible ? (
            <NewUserForm setIsRegisterVisible={setIsRegisterVisible} />
          ) : (
            <LoginForm
              setIsPasswordResetVisible={setIsPasswordResetVisible}
              setIsRegisterVisible={setIsRegisterVisible}
              title={homeInfo.loginTitle}
              forgot={homeInfo.loginForgot}
              register={homeInfo.loginRegister}
              registerCall={homeInfo.loginRegisterCall}
              loginCall={homeInfo.loginCall}
            />
          )}
        </Container>
      </Wrapper>
    </HomeContainer>
  );
};

export default Home;
