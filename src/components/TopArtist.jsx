import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopArtist = () => {
  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>Top Artists Of All time</p>
          <Link to='#' className='more-btn'>
            See More
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 90vw;
    margin: 4rem auto;
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 1.2rem;
    }
  }
`;

export default TopArtist;
