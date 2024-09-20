import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDataContext } from '../context/UserData';
import Loading from '../components/Loading';

const TopTracks = () => {
  const { topTrackYear, topTrack, topTrackFourWeek, isLoading } =
    useDataContext();
  const yearly = topTrackYear && topTrackYear.items;

  const [termValue, setTermValue] = useState(yearly);

  const sixMonth = topTrack && topTrack.items;
  const FourWeek = topTrackFourWeek && topTrackFourWeek.items;

  const handleActiveBtn = () => {
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        btns.forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  };

  const handleYearFetch = () => {
    setTermValue(yearly);
  };
  const handleSixMonthFetch = () => {
    setTermValue(sixMonth);
  };
  const handleFourWeekFetch = () => {
    setTermValue(FourWeek);
  };

  useEffect(() => {
    handleActiveBtn();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>Top Tracks</p>
          <div className='btn-wrapper'>
            <button className='btn active' onClick={handleYearFetch}>
              All Time
            </button>
            <button className='btn' onClick={handleSixMonthFetch}>
              Last 6 Months
            </button>
            <button className='btn' onClick={handleFourWeekFetch}>
              Last 4 Weeks
            </button>
          </div>
        </div>
        <div className='content'>
          {/*  */}
          {termValue ? (
            <div className='content-wrapper'>
              {termValue &&
                termValue.map((item) => {
                  const artists = item.album.artists;
                  const durationInMin = Math.floor(item.duration_ms / 60000);
                  const remainingSec = Math.floor(
                    (item.duration_ms % 60000) / 1000
                  );
                  return (
                    <div className='main' key={item.id}>
                      <div className='main-wrap'>
                        <div className='inner-main'>
                          <div className='img-wrapper'>
                            <img src={item.album.images[0].url} alt='image' />
                          </div>
                          <div className='info-wrapper'>
                            <p className='track-title'>{item.name}</p>
                            <p className='track-info'>
                              <span className='artist-names'>
                                {artists.map((i) => i.name).join(' , ')}
                              </span>
                              <span className='divider'>|</span>
                              <span className='album-name'>
                                {item.album.name}
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
            <div className='content-wrapper'>
              {yearly ? (
                yearly.map((item) => {
                  console.log(item);

                  const artists = item.album.artists;
                  const durationInMin = Math.floor(item.duration_ms / 60000);
                  const remainingSec = Math.floor(
                    (item.duration_ms % 60000) / 1000
                  );
                  return (
                    <div className='main' key={item.id}>
                      <div className='main-wrap'>
                        <div className='inner-main'>
                          <div className='img-wrapper'>
                            <img src={item.album.images[2].url} alt='image' />
                          </div>
                          <div className='info-wrapper'>
                            <p className='track-title'>{item.name}</p>
                            <p className='track-info'>
                              <span className='artist-names'>
                                {artists.map((i) => i.name).join(' , ')}
                              </span>
                              <span className='divider'>|</span>
                              <span className='album-name'>
                                {item.album.name}
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
                  <p>Loading...</p>
                </div>
              )}
            </div>
          )}
          {/*  */}
        </div>
      </div>
      ;
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 90vw;
    margin: 0 auto;
    min-height: 100vh;
  }
  .heading {
    text-align: center;
    margin: 3rem 0;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .btn-wrapper {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .btn {
    font-size: 1rem;
    font-weight: 500;
    background: none;
    border: none;
    outline: none;
    color: #cacaca;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: none;
  }
  .active {
    color: var(--darkTxt);
    text-decoration: underline;
  }
  .img-wrapper img {
    height: 70px;
    /* width: 70; */
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

@media screen and (max-width: 600px) {
.track-title {
   
    max-width: 240px;
    
  }
  .track-info {
    
    
    max-width: 240px;
    
  }

    
  }


  @media screen and (min-width: 992px) {
    max-width: 40vw;
    margin: 0 auto;
    border: 1px solid #ffffff21;
    padding: 0 16px;
    .load {
      height: 60vh;
      width: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default TopTracks;
