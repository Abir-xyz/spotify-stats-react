import styled from 'styled-components';
import { useDataContext } from '../context/UserData';
import Loading from '../components/Loading';

const PlaylistTracks = () => {
  const { playlistTracks, currentAlbum, isLoading } = useDataContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <img src={``} alt='album-img' />
          <p></p>
        </div>
        <div className='contents'>
          {playlistTracks ? (
            playlistTracks.map((item) => {
              const artists = item.track.album.artists;
              const durationInMin = Math.floor(item.track.duration_ms / 60000);
              const remainingSec = Math.floor(
                (item.track.duration_ms % 60000) / 1000
              );
              return (
                <div className='main' key={item.track.id}>
                  <div className='main-wrap'>
                    <div className='inner-main'>
                      <div className='img-wrapper'>
                        <img src={item.track.album.images[2].url} alt='image' />
                      </div>
                      <div className='info-wrapper'>
                        <p className='track-title'>{item.track.name}</p>
                        <p className='track-info'>
                          <span className='artist-names'>
                            {artists.map((i) => i.name).join(' , ')}
                          </span>
                          <span className='divider'> | </span>
                          <span className='album-name'>
                            {item.track.album.name}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='duration'>
                      <p>
                        {durationInMin}:
                        {remainingSec.toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='load'>
              <Loading />
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
    height: 70px;
    width: 70;
    margin-bottom: 10px;
  }
  .info-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    margin-left: 20px;
    color: var(--greyTxt);
    font-size: 0.8rem;
  }
  .divider {
    margin: 0 8px;
  }
  .track-title {
    font-size: 1rem;
    color: var(--darkTxt);
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    white-space: nowrap;
  }
  .track-info {
    /* margin-right: 16px; */
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    white-space: nowrap;
  }
  .inner-main {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .main-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .load {
    height: 60vh;
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .duration p {
    color: var(--greyTxt);
    font-size: 0.8rem;
  }

  .content {
    margin-bottom: 5rem;
  }

  @media screen and (max-width: 768px) {
    .container {
      max-width: 85vw;
      margin: 0 auto;
    }
  }
`;

export default PlaylistTracks;
