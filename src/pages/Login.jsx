import styled from 'styled-components';

const Login = () => {
  return (
    <Wrapper className='section'>
      <div className='container'>
        <h1>Your Spotify Stats</h1>
        <a href='/.netlify/functions/login'>Log in to Spotify</a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Login;
