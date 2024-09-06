import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDataContext } from '../context/UserData';
import { useState, useRef } from 'react';

const TopSongs = () => {
  const { topTrack } = useDataContext();
  const allTracks = topTrack && topTrack.items;
  const tracks = allTracks && allTracks.slice(0, 10);
  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState({});

  const handlePlayPause = (index) => {
    const audioElement = audioRefs.current[index];
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying((prevState) => ({ ...prevState, [index]: true }));
    } else {
      audioElement.pause();
      setIsPlaying((prevState) => ({ ...prevState, [index]: false }));
    }
  };

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>Top Tracks Of All time</p>
          <Link to='#' className='more-btn'>
            See More
          </Link>
        </div>
        <div className='items-container'>
          {tracks &&
            tracks.map((item) => {
              return (
                <div className='item' key={item.id}>
                  <div className='img-wrapper'>
                    <img src={item.album.images[0].url} alt='track-img' />
                  </div>
                  <div className='track-audio'>
                    {/* Assigning a unique ref to each audio element */}
                    <audio
                      ref={(el) => (audioRefs.current[item.id] = el)}
                      className='audio'
                    >
                      <source src={item.preview_url} />
                    </audio>
                    <button
                      onClick={() => handlePlayPause(item.id)}
                      className='play-pause-btn'
                    >
                      {isPlaying[item.id] ? (
                        <span className='pause-btn'>
                          <i className='fa-solid fa-pause'></i>
                        </span>
                      ) : (
                        <span className='play-btn'>
                          <i className='fa-solid fa-play'></i>
                        </span>
                      )}
                    </button>
                  </div>
                  <div className='title'>
                    <p className='name'>{item.name}</p>
                    <p className='track-info'>
                      <span className='track-artist'>
                        {item.artists[0].name}
                      </span>{' '}
                      ~ {''}
                      <span className='track-album'>{item.album.name}</span>
                    </p>
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
    margin: 0 auto;
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
    border-radius: 2px;
    margin-right: 20px;
    opacity: 0.6;
  }
  .track-artist {
    padding-right: 5px;
  }
  .track-album {
    padding-left: 5px;
  }
  .item {
    display: flex;
    margin: 16px 0;
    position: relative;
  }
  .name {
    color: var(--darkTxt);
    font-size: 1rem;
  }
  .track-info {
    color: var(--greyTxt);
    font-size: 0.8rem;
  }
  .title {
    margin-top: 3px;
  }

  .track-audio {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-pause-btn {
    font-size: 1.6rem;
    background: none;
    border: none;
    outline: none;
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 25%;
    margin-left: 15px;
  }
`;

export default TopSongs;
