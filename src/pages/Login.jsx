import styled from 'styled-components';

const Login = () => {
  return (
    <Wrapper className='section'>
      <div className='container'>
        <h1>Spotify Stats</h1>
        <a href='/.netlify/functions/login'>Log in to Spotify</a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  h1 {
    font-weight: 400;
    font-size: 1.8rem;
    margin-bottom: 16px;
  }
  a {
    text-decoration: none;
    color: #ebebeb;
    background-color: var(--themeClr);
    padding: 8px 12px;
    border-radius: 10rem;
    transition: var(--btnTransition);
  }
  a:hover {
    background-color: green;
  }
`;

export default Login;
