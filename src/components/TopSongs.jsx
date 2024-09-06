import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDataContext } from '../context/UserData';
import { LuDot } from 'react-icons/lu';
import { BsDot } from 'react-icons/bs';

const TopSongs = () => {
  const { topTrack } = useDataContext();
  const allTracks = topTrack && topTrack.items;
  const tracks = allTracks && allTracks.slice(0, 10);

  console.log(tracks);

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
  }
  .track-artist {
    padding-right: 5px;
  }
  .track-album {
    padding-left: 5px;
  }
  .item {
    display: flex;
    /* align-items: center; */
    margin: 16px 0;
  }
  .name {
    color: var(--darkTxt);
    font-size: 1rem;
  }
  .track-info {
    color: var(--greyTxt);
    font-size: 0.8rem;
  }
  .title{
   margin-top: 3px;
  }
`;

export default TopSongs;
