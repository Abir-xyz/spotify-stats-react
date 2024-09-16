import styled from 'styled-components';
import { useDataContext } from '../context/UserData';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const Playlist = () => {
  const { playList, setPlaylistId, handleClick, isLoading } = useDataContext();

  const handlePlaylistId = (e) => {
    const Id = e.currentTarget.id;
    setPlaylistId(Id);
    localStorage.setItem('playlistId', Id);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>My Playlists</p>
        </div>
        <div className='content-wrapper'>
          {playList ? (
            playList.map((item) => {
              return (
                <div
                  className='content'
                  key={item.id}
                  onClick={handlePlaylistId}
                  id={item.id}
                >
                  <Link to='/playlist-tracks' className='link'>
                    <div className='img-wrapper'>
                      <img src={item.images[0].url} alt='image' />
                    </div>
                    <div className='info-wrapper'>
                      <p className='title'>{item.name}</p>
                      <p className='length'>{item.tracks.total} Tracks</p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className='load'>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 90vw;
    margin: 0 auto;
    margin-bottom: 5rem !important;
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
    /* width: 150px;
    height: auto; */
    height: 150px;
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
  .load {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 80vh;
    width: 90vw;
  }
  .link {
    text-decoration: none;
  }

  @media screen and (min-width: 992px) {
    .container {
      max-width: 40vw;
      margin: 0 auto;
      border: 1px solid #ffffff21;
      padding: 0 16px;
    }
    .load {
      height: 60vh;
      width: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default Playlist;
