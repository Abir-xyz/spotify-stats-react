import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDataContext } from '../context/UserData';
import artist from '../assets/artist.jpg';

const TopArtist = () => {
  const { topArtist } = useDataContext();
  const items = topArtist && topArtist.items;
  const artistArr = items && items.slice(0, 10);

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>Top Artists Of All time</p>
          <Link to='/top-artists' className='more-btn'>
            See More
          </Link>
        </div>
        <div className='items-container'>
          {artistArr &&
            artistArr.map((item) => {
              return (
                <div className='item' key={item.id}>
                  <div className='img-wrapper'>
                    <img src={item.images[0].url} alt='artist-img' />
                  </div>
                  <div className='title'>
                    <p>{item.name}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 80vw;
    margin: 4rem auto;
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    p {
      font-size: 1.2rem;
    }
  }
  .img-wrapper img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
  }
  .item {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }
`;

export default TopArtist;
