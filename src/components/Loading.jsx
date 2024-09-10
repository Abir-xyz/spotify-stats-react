import Load from '../assets/load.svg';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper className='section'>
      <div className='container'>
        <img src={Load} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img{
    height: 100px;
    width: 100px;
  }
`;

export default Loading;
