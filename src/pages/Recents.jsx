import styled from 'styled-components';
import { useDataContext } from '../context/UserData';

const Recents = () => {
  const { recentTracks } = useDataContext();
  const tracks = recentTracks && recentTracks.items;
  console.log(tracks);

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>Recently Played</p>
        </div>
        <div className='container'>
          {tracks ? (
            <div className='content-wrapper'>
              {tracks &&
                tracks.map((item) => {
                  const artists = item.track.artists;
                  const durationInMin = Math.floor(
                    item.track.duration_ms / 60000
                  );
                  const remainingSec = Math.floor(
                    (item.track.duration_ms % 60000) / 1000
                  );
                  return (
                    <div className='main' key={item.id}>
                      <div className='main-wrap'>
                        <div className='inner-main'>
                          <div className='img-wrapper'>
                            <img
                              src={item.track.album.images[0].url}
                              alt='image'
                            />
                          </div>
                          <div className='info-wrapper'>
                            <p className='track-title'>{item.track.name}</p>
                            <p className='track-info'>
                              <span className='artist-names'>
                                {artists.map((i) => i.name).join(' , ')}
                              </span>
                              <span className='divider'>|</span>
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
                })}
            </div>
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
    min-height: 100vh;
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
    margin-right: 16px;
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
`;

export default Recents;
