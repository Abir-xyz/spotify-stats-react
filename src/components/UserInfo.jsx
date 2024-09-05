import styled from 'styled-components';
import userImg from '../assets/user.jpg';
import { useDataContext } from '../context/UserData';

const UserInfo = () => {
  const { user, playList, following } = useDataContext();
  console.log(following);

  return (
    <Wrapper className='section'>
      <div className='container'>
        {user && (
          <div className='center'>
            <div className='img-wrapper'>
              {user.images.length > 0 && (
                <img src={user.images[1].url} alt='user-img' />
              )}
            </div>
            <div className='info-wrapper'>
              <div>
                <div className='counts'>{user.followers.total}</div>
                <div className='section'>Followers</div>
              </div>
              <div>
                <div className='counts'>100</div>
                <div className='section'>Following</div>
              </div>
              <div>
                <div className='counts'>
                  {playList && <p>{playList.items.length}</p>}
                </div>
                <div className='section'>Playlists</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    cursor: pointer;
    transition: var(--btnTransition);
  }
  img:hover {
    scale: 1.1;
  }
  .img-wrapper {
    text-align: center;
    margin: 2rem 0;
  }
  .info-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 0 1rem;
    }
    .counts {
      color: var(--themeClr);
      font-size: 1.3rem;
      font-weight: 500;
    }
    .section {
      font-size: 1.1rem;
      color: var(--greyTxt);
      font-weight: 400;
    }
  }
`;

export default UserInfo;
