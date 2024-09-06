import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TbMicrophone2 } from 'react-icons/tb';
import { PiPlaylistDuotone } from 'react-icons/pi';
import { FaHistory } from 'react-icons/fa';
import { useLoginContext } from '../context/LoginContext';

const Footer = () => {
  const { accessToken } = useLoginContext();

  if (!accessToken) {
    return false;
  }

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='center'>
          <div className='links'>
            <NavLink to='/' className='link'>
              <span className='icon'>
                <i className='fa-regular fa-user'></i>
              </span>
              <span>Home</span>
            </NavLink>
          </div>
          <div className='links'>
            <NavLink to='/top-artists' className='link'>
              <span className='icon'>
                <TbMicrophone2 />
              </span>
              <span>Top Artists</span>
            </NavLink>
          </div>
          <div className='links'>
            <NavLink to='/top-tracks' className='link'>
              <span className='icon'>
                <i className='fa-solid fa-music'></i>
              </span>
              <span>Top Tracks</span>
            </NavLink>
          </div>
          <div className='links'>
            <NavLink to='/playlists' className='link'>
              <span className='icon'>
                <PiPlaylistDuotone />
              </span>
              <span>Playlists</span>
            </NavLink>
          </div>
          <div className='links'>
            <NavLink to='/recent' className='link'>
              <span className='icon'>
                <FaHistory />
              </span>
              <span>Recent</span>
            </NavLink>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  body {
    position: relative;
  }
  .container {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    background: rgba(57, 57, 57, 0.18);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.5px);
    -webkit-backdrop-filter: blur(9.5px);
    border: 1px solid rgba(57, 57, 57, 0.35);
    padding: 5px 0;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 95vw;
    margin: 0 auto;
  }
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .link {
    text-decoration: none;
    color: #ebebeb;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    font-size: 1.2rem;
  }
  .active {
    color: var(--themeClr);
  }
  .active .icon span {
    color: var(--themeClr);
  }
`;

export default Footer;
