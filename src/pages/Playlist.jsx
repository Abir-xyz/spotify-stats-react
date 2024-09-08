import styled from 'styled-components';
import { useDataContext } from '../context/UserData';

const Playlist = () => {
  const { playList } = useDataContext();
  console.log(playList);

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>My Playlists</p>
        </div>
        <div className='content-wrapper'>
          {playList &&
            playList.map((item) => {
              return (
                <div className='content' key={item.id}>
                  <div className='img-wrapper'>
                    <img src={item.images[0].url} alt='image' />
                  </div>
                  <div className='info-wrapper'>
                    <p className='title'>{item.name}</p>
                    <p className='length'>{item.tracks.total} Tracks</p>
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
    max-width: 90vw;
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    margin: 3rem 0;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .img-wrapper img {
    width: 150px;
    height: auto;
  }
  .title {
    font-size: 1.1rem;
    color: var(--darkTxt);
  }
  .length {
    font-size: 0.9rem;
    color: var(--greyTxt);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 26px 0;
    text-align: center;
  }
  .content-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .content {
    flex: 0 0 calc(50% - 10px);
  }
`;

export default Playlist;
