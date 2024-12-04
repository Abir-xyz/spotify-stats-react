import styled from 'styled-components';

const Notice = () => {
  return (
    <Wrapper className='section'>
      <div className='container'>
        <h1>
          due to{' '}
          <a
            href='https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api'
            target='_0'
          >
            some changes to Spotify API
          </a>{' '}
          playlist stats are not available right now
        </h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    min-height: 100vh;
    max-width: 80vw;
    margin: 0 auto;
    text-align: center;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-weight: 400;
    }
  }

  @media screen and (min-width: 992px) {
    max-width: 40vw;
    margin: 0 auto;
    border: 1px solid #ffffff21;
    padding: 0 16px;
    min-height: 100vh;
  }
`;

export default Notice;
